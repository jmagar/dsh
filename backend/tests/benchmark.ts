import { request } from 'http';

import { logger } from '../src/utils/logger';

interface BenchmarkResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageLatency: number;
  requestsPerSecond: number;
  totalDuration: number;
}

async function makeRequest(url: string): Promise<number> {
  const start = performance.now();

  return new Promise((resolve, reject) => {
    const req = request(url, res => {
      res.on('data', () => {});
      res.on('end', () => {
        const duration = performance.now() - start;
        resolve(duration);
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function runBenchmark(
  url: string,
  concurrency: number,
  duration: number
): Promise<BenchmarkResult> {
  const startTime = performance.now();
  const endTime = startTime + duration * 1000;
  const results: number[] = [];
  let failed = 0;

  const runBatch = async () => {
    while (performance.now() < endTime) {
      try {
        const latency = await makeRequest(url);
        results.push(latency);
      } catch (error) {
        failed++;
        logger.error('Request failed', {
          component: 'benchmark',
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    }
  };

  // Start concurrent batches
  const batches = Array(concurrency)
    .fill(0)
    .map(() => runBatch());
  await Promise.all(batches);

  const totalDuration = (performance.now() - startTime) / 1000;
  const averageLatency = results.reduce((a, b) => a + b, 0) / results.length;

  return {
    totalRequests: results.length + failed,
    successfulRequests: results.length,
    failedRequests: failed,
    averageLatency,
    requestsPerSecond: results.length / totalDuration,
    totalDuration,
  };
}

// Run the benchmark
async function main() {
  const url = process.env.BENCHMARK_URL || 'http://localhost:3000/api/health';
  const concurrency = Number(process.env.BENCHMARK_CONCURRENCY) || 100;
  const duration = Number(process.env.BENCHMARK_DURATION) || 30;

  logger.info('Starting benchmark', {
    component: 'benchmark',
    config: { url, concurrency, duration },
  });

  try {
    const result = await runBenchmark(url, concurrency, duration);

    logger.info('Benchmark complete', {
      component: 'benchmark',
      metrics: {
        totalRequests: result.totalRequests,
        successfulRequests: result.successfulRequests,
        failedRequests: result.failedRequests,
        averageLatency: Math.round(result.averageLatency),
        requestsPerSecond: Math.round(result.requestsPerSecond),
        totalDuration: Math.round(result.totalDuration),
      },
    });

    if (result.failedRequests > 0) {
      process.exit(1);
    }
  } catch (error) {
    logger.error('Benchmark failed', {
      component: 'benchmark',
      error: error instanceof Error ? error : new Error('Unknown error'),
    });
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

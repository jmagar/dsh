import { request } from 'http';

import { config } from '../src/config';
import { logger } from '../src/utils/logger';

interface BenchmarkResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageLatency: number;
  requestsPerSecond: number;
  totalDuration: number;
}

interface BenchmarkConfig {
  url: string;
  concurrency: number;
  duration: number;
}

async function makeRequest(url: string): Promise<number> {
  const start = performance.now();

  return new Promise<number>((resolve, reject) => {
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

  const runBatch = async (): Promise<void> => {
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

// Default benchmark configuration
const defaultConfig: BenchmarkConfig = {
  url: `http://localhost:${config.server.port}/api/health`,
  concurrency: 100,
  duration: 30,
};

// Run the benchmark
async function main(): Promise<void> {
  const benchmarkConfig: BenchmarkConfig = {
    url: defaultConfig.url,
    concurrency: defaultConfig.concurrency,
    duration: defaultConfig.duration,
  };

  logger.info('Starting benchmark', {
    component: 'benchmark',
    config: benchmarkConfig,
  });

  try {
    const result = await runBenchmark(
      benchmarkConfig.url,
      benchmarkConfig.concurrency,
      benchmarkConfig.duration
    );

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

// Only run if this is the main module
if (require.main === module) {
  main().catch((error: unknown) => {
    logger.error('Unhandled error in benchmark', {
      component: 'benchmark',
      error: error instanceof Error ? error : new Error(String(error)),
    });
    process.exit(1);
  });
}

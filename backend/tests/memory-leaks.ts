import { createServer as createHttpServer, Server } from 'http';

import { createServer } from '../src/server';
import { logger } from '../src/utils/logger';

interface HeapSnapshot {
  size: number;
  timestamp: number;
}

async function takeHeapSnapshot(): Promise<HeapSnapshot> {
  // Force async to ensure consistent timing with real heap snapshots
  await new Promise(resolve => setTimeout(resolve, 0));
  const snapshot = {
    size: process.memoryUsage().heapUsed,
    timestamp: Date.now(),
  };
  return snapshot;
}

function calculateGrowthRate(current: HeapSnapshot, previous: HeapSnapshot): number {
  return (current.size - previous.size) / (current.timestamp - previous.timestamp);
}

function calculateStandardDeviation(values: number[], mean: number): number {
  return Math.sqrt(
    values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length
  );
}

async function analyzeMemoryLeaks(
  server: Server,
  duration: number = 60000,
  interval: number = 1000
): Promise<void> {
  const snapshots: HeapSnapshot[] = [];
  const startTime = Date.now();

  // Collect snapshots
  while (Date.now() - startTime < duration) {
    snapshots.push(await takeHeapSnapshot());
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  // Need at least 3 snapshots for analysis
  if (snapshots.length < 3) {
    logger.error('Not enough snapshots for analysis', {
      component: 'memory-test',
      metrics: { count: snapshots.length },
    });
    return;
  }

  // Calculate growth rates using array methods instead of indexing
  const growthRates = snapshots
    .slice(1)
    .map((snapshot, index) => calculateGrowthRate(snapshot, snapshots[index]));

  if (growthRates.length === 0) {
    logger.error('Failed to calculate growth rates', {
      component: 'memory-test',
      metrics: { snapshotCount: snapshots.length },
    });
    return;
  }

  // Calculate statistics
  const avgGrowthRate = growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
  const stdDev = calculateStandardDeviation(growthRates, avgGrowthRate);

  // Check for consistent growth
  const isLeaking = avgGrowthRate > 0 && stdDev < Math.abs(avgGrowthRate);
  
  // Safely get the last snapshot
  const lastSnapshot = snapshots.slice(-1)[0];
  if (!lastSnapshot) {
    logger.error('No final snapshot available', {
      component: 'memory-test',
    });
    return;
  }

  // Log results using bound methods
  const logMetrics = {
    component: 'memory-test',
    metrics: {
      averageGrowthRate: avgGrowthRate,
      standardDeviation: stdDev,
      finalHeapSize: lastSnapshot.size,
    },
  };

  if (isLeaking) {
    logger.error('Memory leak detected', logMetrics);
  } else {
    logger.info('No memory leaks detected', logMetrics);
  }

  // Close server
  await new Promise<void>((resolve, reject) => {
    server.close(err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function main(): Promise<void> {
  try {
    const app = await createServer();
    const server = createHttpServer(app);
    await analyzeMemoryLeaks(server);
  } catch (error) {
    logger.error('Failed to run memory leak analysis', {
      component: 'memory-test',
      error: error instanceof Error ? error : new Error(String(error)),
    });
    process.exit(1);
  }
}

// Use void operator to explicitly mark Promise as handled
void main();

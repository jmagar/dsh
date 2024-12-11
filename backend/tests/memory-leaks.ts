import { type Server } from 'http';

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

async function analyzeMemoryLeaks(
  server: Server,
  duration: number = 60000,
  interval: number = 1000
): Promise<void> {
  const snapshots: HeapSnapshot[] = [];
  const startTime = Date.now();

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

  // Calculate growth rate
  const growthRates: number[] = [];
  for (let i = 1; i < snapshots.length; i++) {
    const current = snapshots[i];
    const previous = snapshots[i - 1];
    if (!current || !previous) continue;

    const rate = (current.size - previous.size) / (current.timestamp - previous.timestamp);
    growthRates.push(rate);
  }

  if (growthRates.length === 0) {
    logger.error('Failed to calculate growth rates', {
      component: 'memory-test',
      metrics: { snapshotCount: snapshots.length },
    });
    return;
  }

  const avgGrowthRate = growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
  const stdDev = Math.sqrt(
    growthRates.reduce((sum, rate) => sum + Math.pow(rate - avgGrowthRate, 2), 0) /
      growthRates.length
  );

  // Check for consistent growth
  const isLeaking = avgGrowthRate > 0 && stdDev < Math.abs(avgGrowthRate);
  const lastSnapshot = snapshots[snapshots.length - 1];

  if (!lastSnapshot) {
    logger.error('No final snapshot available', {
      component: 'memory-test',
    });
    return;
  }

  if (isLeaking) {
    logger.error('Memory leak detected', {
      component: 'memory-test',
      metrics: {
        averageGrowthRate: avgGrowthRate,
        standardDeviation: stdDev,
        finalHeapSize: lastSnapshot.size,
      },
    });
  } else {
    logger.info('No memory leaks detected', {
      component: 'memory-test',
      metrics: {
        averageGrowthRate: avgGrowthRate,
        standardDeviation: stdDev,
        finalHeapSize: lastSnapshot.size,
      },
    });
  }

  await new Promise<void>((resolve, reject) => {
    server.close(err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function main(): Promise<void> {
  const server = await createServer();
  await analyzeMemoryLeaks(server);
}

void main();

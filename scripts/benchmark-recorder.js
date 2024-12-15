const fs = require('fs');
const path = require('path');

const benchmarksPath = path.resolve(__dirname, '../benchmarks.json');

async function recordBenchmarks() {
  const benchmarks = {
    timestamp: new Date().toISOString(),
    frontend: {
      initialLoadTime: performance.now(),
      memoryUsage: process.memoryUsage(),
    },
    backend: {
      startupTime: performance.now(),
      requestLatency: null, // Placeholder for actual measurement
    }
  };

  try {
    fs.writeFileSync(benchmarksPath, JSON.stringify(benchmarks, null, 2));
    console.log('Benchmarks recorded successfully');
  } catch (error) {
    console.error('Failed to record benchmarks:', error);
  }
}

recordBenchmarks();

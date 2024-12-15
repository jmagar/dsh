const v8 = require('v8');

function checkMemoryLeaks() {
  const initialMemory = process.memoryUsage().heapUsed;
  
  // Simulate some memory allocations
  const leakyArray = [];
  for (let i = 0; i < 1000000; i++) {
    leakyArray.push(new Array(1000).fill('memory leak test'));
  }

  global.gc(); // Force garbage collection

  const finalMemory = process.memoryUsage().heapUsed;
  const memoryDiff = finalMemory - initialMemory;

  console.log('Memory usage before GC:', initialMemory);
  console.log('Memory usage after GC:', finalMemory);
  console.log('Memory difference:', memoryDiff);

  // Threshold for potential memory leak (adjust as needed)
  const MEMORY_LEAK_THRESHOLD = 50 * 1024 * 1024; // 50MB
  
  if (memoryDiff > MEMORY_LEAK_THRESHOLD) {
    console.error('Potential memory leak detected!');
    process.exit(1);
  }

  console.log('No significant memory leaks detected.');
  process.exit(0);
}

checkMemoryLeaks();

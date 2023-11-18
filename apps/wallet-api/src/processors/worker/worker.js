import { parentPort, workerData } from 'worker_threads';
import { split } from '../../utils/chunker';

const { transactions, maxLatency } = workerData;
const generator = split(transactions, maxLatency);

let chunk;

do {
  chunk = generator.next();
  if (chunk.value) {
    parentPort.postMessage(chunk.value);
  }
} while (!chunk.done);

process.exit();

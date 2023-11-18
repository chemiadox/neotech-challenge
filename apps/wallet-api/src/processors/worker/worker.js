import { parentPort, workerData } from 'worker_threads';
import { split } from '../../utils/chunker';

const { transactions, maxLatency } = workerData;
const generator = split(transactions, maxLatency);

let chunk = generator.next();

while (!chunk.done) {
  parentPort.postMessage(chunk.value);
  chunk = generator.next();
}

process.exit();

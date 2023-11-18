const { workerData, parentPort } = require('worker_threads');
const { split } = require('../../utils/chunker');

const { transactions, maxLatency } = workerData;
parentPort.postMessage(split(transactions, maxLatency));

process.exit();

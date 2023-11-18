type Reducible = {
  value: number;
  latency: number;
};

type List<T extends Reducible> = {
  record: T;
  next: List<T> | null;
};

const calculate = <T extends Reducible>(list: List<T> | null): number => {
  return unwrap(list).reduce((acc, i) => acc + i.value, 0);
};

const unwrap = <T extends Reducible>(list: List<T> | null): T[] => {
  const records: T[] = [];
  let current: List<T> | null = list;

  while (current) {
    const { next, record } = current;
    records.push(record);
    current = next;
  }

  return records;
};

const findMax = <T extends Reducible>(
  capacity: number,
  records: T[],
  deep: number = 0,
): List<T> | null => {
  let maxValue = 0;
  let maxRecord: T | null = null;
  let maxList: List<T> = null;

  for (let i = 0; i < records.length; i++) {
    if (records[i].latency <= capacity) {
      const stored = records[i].latency;
      const capacityLeft = capacity - records[i].latency;

      records[i].latency = capacity;
      const newList = findMax(capacityLeft, records, deep + 1);
      const newValue = calculate(newList) + stored;
      records[i].latency = stored;

      if (newValue > maxValue) {
        maxValue = newValue;
        maxRecord = records[i];
        maxList = newList;
      }
    }
  }

  return maxRecord ? { record: maxRecord, next: maxList } : null;
};

export const split = <T extends Reducible>(
  records: T[],
  maxLatency: number,
): T[][] => {
  const chunks: T[][] = [];
  let reducible = [...records];
  let chunk = null;

  do {
    chunk = findMax(maxLatency, reducible);
    if (chunk) {
      const unwrapped = unwrap<T>(chunk);
      chunks.push(unwrapped);
      reducible = reducible.filter((record) => !unwrapped.includes(record));
    }
  } while (chunk);

  return chunks;
};

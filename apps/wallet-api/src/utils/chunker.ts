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
): List<T> | null => {
  let maxValue = 0;
  let maxRecord: T | null = null;
  let maxList: List<T> | null = null;

  for (let i = 0; i < records.length; i++) {
    if (records[i].latency <= capacity) {
      const stored = records[i].latency;
      const capacityLeft = capacity - stored;

      records[i].latency = capacity;
      const newList = findMax(capacityLeft, records);
      const newValue = calculate(newList) + records[i].value;
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

export function* split<T extends Reducible>(
  records: T[],
  capacity: number,
): Generator<T[]> {
  let reducible = [...records];

  let chunk = findMax(capacity, reducible);

  while (chunk) {
    const unwrapped = unwrap<T>(chunk);
    yield unwrapped;

    reducible = reducible.filter((record) => !unwrapped.includes(record));
    chunk = findMax(capacity, reducible);
  }
}

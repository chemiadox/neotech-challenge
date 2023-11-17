type Reducible = {
  value: number;
  latency: number;
};

type List<T extends Reducible> = {
  record: T;
  next: List<T> | null;
  rest: T[];
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
  const lists: List<T>[] = [];
  let maxList = null;
  let maxValue = 0;

  records
    .filter((record) => record.latency <= capacity)
    .forEach((record) => {
      const capacityLeft = capacity - record.latency;
      const restRecords = records.filter((r) => r !== record);
      const nextList = findMax(capacityLeft, restRecords);

      lists.push({
        record,
        next: nextList,
        rest: nextList?.rest || restRecords,
      });
    });

  lists.forEach((list) => {
    const total = calculate(list);

    if (total > maxValue) {
      maxValue = total;
      maxList = list;
    }
  });

  return maxList;
};

export const split = <T extends Reducible>(
  records: T[],
  maxLatency: number,
): T[][] => {
  const chunks: T[][] = [];
  let reducible = [...records];

  while (reducible.length) {
    const list = findMax<T>(maxLatency, reducible);
    reducible = list.rest;
    const unwrapped = unwrap(list);
    chunks.push(unwrapped);
  }

  return chunks;
};

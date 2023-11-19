export {};

/**
 * Cheat typescript to resolve process methods and properties
 */
type MemoryUsage = NodeJS.MemoryUsage;
declare global {
  interface Process {
    memoryUsage: () => MemoryUsage;
    env: {
      NODE_ENV: string;
    };
  }
}

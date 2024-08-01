export const executeJobsIfMatched = async <T>(params: {
  jobs: Array<{
    match: boolean;
    do: () => Promise<T>;
  }>;
  returnOnFirstMatch?: boolean;
}) => {
  const { jobs, returnOnFirstMatch = true } = params;
  const results: T[] = [];

  for (const job of jobs) {
    if (job.match) {
      const result = await job.do();
      results.push(result);

      if (returnOnFirstMatch) break;
    }
  }

  return results;
};

export const findFirstMatch = <T>(
  items: Array<{ match: boolean; value: T }>
) => {
  for (const item of items) {
    if (item.match) {
      return item.value;
    }
  }

  return undefined as T;
};

export async function retry<T>(
  asyncOperation: () => Promise<T>,
  options: {
    maxRetries: number;
    retryAfter: number;
  }
): Promise<T> {
  const { maxRetries, retryAfter } = options;
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      return await asyncOperation();
    } catch (error) {
      console.error(`Attempt ${retries + 1} failed`, error);
      retries++;
      if (retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
      }
    }
  }

  throw new Error(`Operation failed after ${maxRetries} attempts.`);
}

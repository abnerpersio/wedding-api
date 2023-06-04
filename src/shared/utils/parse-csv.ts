import fs, { PathLike } from 'fs';

export function parseCSV<T = Record<string, unknown>>(filePath: PathLike): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    const headers: string[] = [];
    const lineReader = fs.createReadStream(filePath);
    let isFirstLine = true;
    let remainingLine = '';

    function parseLine(line: string[]) {
      return headers.reduce(
        (prev, field, index) => ({
          ...prev,
          [field.toLowerCase()]: line[index],
        }),
        {},
      ) as T;
    }

    lineReader.on('data', (chunk: Buffer) => {
      const lines = (remainingLine + chunk.toString()).split('\n');
      remainingLine = lines.pop() || '';

      for (const line of lines) {
        if (isFirstLine) {
          isFirstLine = false;
          headers.push(...line.split(','));
          continue;
        }
        const columns = line.split(',');
        results.push(parseLine(columns));
      }
    });

    lineReader.on('error', (error: Error) => {
      reject(error);
    });

    lineReader.on('end', () => {
      if (remainingLine) {
        const columns = remainingLine.split(',');
        results.push(parseLine(columns));
      }

      resolve(results);
    });
  });
}

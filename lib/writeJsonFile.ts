import fs from 'fs';
import path from 'path';

export function writeJsonFile<T>(fileName: string, data: T): void {
  const filePath = path.join(process.cwd(), 'data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
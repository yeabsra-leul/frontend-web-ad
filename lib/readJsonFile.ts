import fs from 'fs';
import path from 'path';

export function readJsonFile<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), 'data', fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

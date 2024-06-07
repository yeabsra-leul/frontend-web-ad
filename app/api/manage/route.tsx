import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile } from '../../../lib/readJsonFile';
import { writeJsonFile } from '../../../lib/writeJsonFile';

export async function GET() {
  const data = readJsonFile<unknown>('data.json'); // Use <unknown> as the initial type
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const newData = await req.json() as unknown; // Use <unknown> as the initial type
  writeJsonFile<unknown>('data.json', newData);
  return NextResponse.json({ message: 'Data written successfully' });
}
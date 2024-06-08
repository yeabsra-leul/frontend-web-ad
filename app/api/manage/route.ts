import { NextRequest, NextResponse } from 'next/server';
import { createAdvertisement, getAds } from '@/lib/jsonHandler';

export async function GET() {
  const data = getAds();
  return NextResponse.json(data);
}

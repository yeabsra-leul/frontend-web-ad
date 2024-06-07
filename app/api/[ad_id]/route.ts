import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile } from '../../../lib/readJsonFile';
import { writeJsonFile } from '../../../lib/writeJsonFile';
import { Advertisement } from '@/lib/definitions';

export async function GET(req: NextRequest, { params }: { params: { ad_id: string } }) {
    const { ad_id } = params;
    const ads = readJsonFile<Advertisement[]>('data.json'); // Use <unknown> as the initial type
    const ad = ads.find((ad) => ad.id === ad_id);
  
    if (ad) {
      return NextResponse.json(ad);
    } else {
      return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
    }
  }
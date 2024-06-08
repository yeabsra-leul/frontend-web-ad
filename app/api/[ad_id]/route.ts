import { NextRequest, NextResponse } from 'next/server';
import { Advertisement } from '@/lib/definitions';
import { getAdById, getAds } from '@/lib/jsonHandler';

export async function GET(req: NextRequest, { params }: { params: { ad_id: string } }) {
    const { ad_id } = params;
    const ad = getAdById(ad_id);
  
    if (ad) {
      return NextResponse.json(ad);
    } else {
      return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
    }
  }
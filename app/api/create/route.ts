import { NextRequest, NextResponse } from 'next/server';
import { createAdvertisement } from '@/lib/jsonHandler';

export async function POST(req: NextRequest) {
  const { adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription,adSeoKeywords  } = await req.json();
  const newAd = createAdvertisement(adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription,adSeoKeywords );
  return NextResponse.json(newAd);
}
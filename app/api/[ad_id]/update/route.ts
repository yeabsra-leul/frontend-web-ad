import { NextRequest, NextResponse } from 'next/server';
import { updateAdvertisement } from '@/lib/jsonHandler';

export async function POST(req: NextRequest) {
  const {id, adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription,adSeoKeywords  } = await req.json();
  const updatedAd = updateAdvertisement(id, adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription,adSeoKeywords);
  if (updatedAd) {
    return NextResponse.redirect(`/ad/${id}`);
  } else {
    return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
  }
}
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // TODO (MongoDB): await ContactSubmission.create(body)
  console.log('[Contact Form Submission]', body);
  return NextResponse.json({ success: true, message: 'Submission received.' });
}

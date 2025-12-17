import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * API Route that serves the clue image
 * This image is stored OUTSIDE the public directory
 * and is only accessible via this server-side route
 * 
 * The route is public, but you could add additional validation here if needed
 */
export async function GET() {
  try {
    // Read the clue image from the private clues directory
    const imagePath = join(process.cwd(), 'clues', 'foosball.jpg');
    const imageBuffer = await readFile(imagePath);

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error loading clue image:', error);
    return NextResponse.json({ error: 'Clue not found' }, { status: 404 });
  }
}

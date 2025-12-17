# Clues Directory

This directory contains the treasure hunt clue image(s) that are served securely via the API route.

## Current File
- `foosball.jpg` - Your actual clue image

## How to Replace the Placeholder

1. Replace `foosball.jpg` with your actual clue image
2. Keep the filename as `foosball.jpg` OR update the path in `app/api/clue/route.ts`
3. The image should be in PNG, JPG, or any format supported by Next.js Image component
4. If using a different format, update the Content-Type header in the API route

## Security Note

Images in this directory are **NOT publicly accessible** through the filesystem. They can only be accessed via the `/api/clue` endpoint, which serves them after server-side validation.

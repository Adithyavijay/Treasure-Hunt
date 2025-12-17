'use server'

/**
 * Server Action to validate the treasure hunt password
 * This runs ONLY on the server - the password never reaches the client
 */
export async function validatePassword(password: string): Promise<{ success: boolean; message?: string }> {
  // Get the password from environment variable (server-side only)
  const correctPassword = process.env.TREASURE_PASSWORD;

  if (!correctPassword) {
    console.error('TREASURE_PASSWORD environment variable is not set');
    return { success: false, message: 'Server configuration error' };
  }

  // Validate password (server-side only)
  if (password === correctPassword) {
    return { success: true };
  }

  return { success: false, message: 'The key you entered does not unlock this treasure...' };
}

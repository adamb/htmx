/**
 * Handles GET requests to /login
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object.
 */
export async function onRequestGet(context) {
  // In a real application, you would handle authentication here.
  // For now, we just return a simple message.
  const loggedInContent = `
    <div>
      <p>You are now logged in!</p>
      <button hx-post="/logout" hx-target="body" hx-swap="innerHTML">Logout</button>
    </div>
  `;

  return new Response(loggedInContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}

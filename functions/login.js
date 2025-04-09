/**
 * Handles GET requests to /login
 * Handles POST requests to /login
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object.
 */
export async function onRequestPost(context) {
  // In a real application, you would handle authentication here
  // (e.g., check password, set session cookie).
  // For now, we just read the email and return a simple message.

  let email = 'user'; // Default email if parsing fails
  try {
    const formData = await context.request.formData();
    email = formData.get('email') || 'user'; // Get email from form data
  } catch (e) {
    console.error("Failed to parse form data:", e);
    // Handle error appropriately, maybe return an error response
  }


  // This content replaces #auth-section, which is inside the themed body
  const loggedInContent = `
    <div id="auth-section" class="container mt-5 text-center logged-in-message"> <!-- Keep container structure and add class -->
      <p>Authentication successful. Welcome, Operator <strong>${email}</strong>.</p>
      <button hx-post="/logout" hx-target="body" hx-swap="innerHTML" class="btn btn-secondary">Terminate Session</button>
    </div>
  `;

  return new Response(loggedInContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}

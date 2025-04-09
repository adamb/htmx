/**
 * Handles GET requests to /login
 * Handles POST requests to /login
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object.
 */
export async function onRequestPost(context) {
  // In a real application, you would handle authentication here
  // (e.g., check password, set session cookie).
  // For now, we just read the form data and return a simple message.

  let name = 'Operator'; // Default name
  let email = 'user@domain.net'; // Default email
  let phone = 'N/A'; // Default phone
  try {
    const formData = await context.request.formData();
    name = formData.get('name') || 'Operator'; // Get name from form data
    email = formData.get('email') || ''; // Get email from form data, default to empty
    phone = formData.get('phone') || ''; // Get phone from form data, default to empty
    // In a real app, you'd save this data (name, email, phone) to a database/mailing list.

    // Server-side validation removed, client-side handles format checks now.
    // Still good practice to have server-side sanitization/validation as a fallback/security measure,
    // but removed here for simplicity as requested.

  } catch (e) {
    console.error("Failed to parse form data:", e);
    // Handle error appropriately, maybe return an error response (e.g., status 500)
    // For simplicity, we might just proceed with defaults or return a generic error page
    return new Response("An error occurred processing your request.", { status: 500 });
  }


  // This content replaces #auth-section, which is inside the themed body
  const loggedInContent = `
    <div id="auth-section" class="container mt-5 text-center logged-in-message"> <!-- Keep container structure and add class -->
      <p>Thank you for joining, <strong>${name}</strong>! We've received your information.</p>
      <p>A confirmation may be sent to ${email}.</p>
      <button hx-post="/logout" hx-target="body" hx-swap="innerHTML" class="btn btn-secondary">Start Over</button>
    </div>
  `;

  return new Response(loggedInContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}

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
    email = formData.get('email') || 'user@domain.net'; // Get email from form data
    phone = formData.get('phone') || 'N/A'; // Get phone from form data
    // In a real app, you'd save this data (name, email, phone) to a database/mailing list.
  } catch (e) {
    console.error("Failed to parse form data:", e);
    // Handle error appropriately, maybe return an error response (e.g., status 400)
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

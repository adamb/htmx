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

    // --- Email Validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email format regex
    if (!emailRegex.test(email)) {
      // Construct the form again with an error message
      const errorForm = `
        <div id="auth-section" class="container mt-3 text-center"> <!-- Match initial structure -->
          <p class="mb-4">Join our mailing list to keep up with Holberton Coding School and other tech related events.</p>
          <form hx-post="/login" hx-target="#auth-section" hx-swap="outerHTML" class="mb-3">
            <div class="mb-3 text-start">
              <label for="nameInput" class="form-label">Name</label>
              <input type="text" class="form-control" id="nameInput" name="name" required placeholder="Enter your full name" value="${name}">
            </div>
            <div class="mb-3 text-start">
              <label for="emailInput" class="form-label">Email Address</label>
              <!-- Add error message display -->
              <div class="text-danger mb-2" style="font-size: 0.9em;">Please enter a valid email address.</div>
              <input type="email" class="form-control is-invalid" id="emailInput" name="email" required placeholder="Enter your email" value="${email}">
            </div>
            <div class="mb-3 text-start">
              <label for="phoneInput" class="form-label">Phone Number</label>
              <input type="tel" class="form-control" id="phoneInput" name="phone" required placeholder="Enter your phone number" value="${phone}">
            </div>
            <button type="submit" class="btn btn-primary">Join List</button>
          </form>
        </div>
      `;
      // Return the form with error, status 400 Bad Request
      return new Response(errorForm, {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }
    // --- End Email Validation ---

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

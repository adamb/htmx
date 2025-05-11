/**
 * Handles POST requests to /login
 * Stores user information in Cloudflare KV and returns confirmation message
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object.
 */
export async function onRequestPost(context) {
  let name = 'Operator'; // Default name
  let email = 'user@domain.net'; // Default email
  let phone = 'N/A'; // Default phone
  let status = "success";
  let errorMessage = "";

  try {
    // Get form data
    const formData = await context.request.formData();
    name = formData.get('name') || 'Operator';
    email = formData.get('email') || '';
    phone = formData.get('phone') || '';

    // Basic server-side validation as a security measure
    if (!email || !email.includes('@') || !name || !phone) {
      status = "error";
      errorMessage = "Required fields are missing or invalid";
    } else {
      // Create a subscriber record
      const subscriber = {
        name: name,
        email: email,
        phone: phone,
        joined: new Date().toISOString()
      };

      // Use email as the key for the KV store (must be unique)
      const key = email.toLowerCase();

      // Store in Cloudflare KV
      // The env.MAILING_LIST binding is available through context.env
      await context.env.MAILING_LIST.put(key, JSON.stringify(subscriber));

      // Optionally, maintain a list of all subscribers (useful for listing)
      // This gets all current subscribers (if any), adds the new one, then saves the list
      let subscribersList = [];
      try {
        const existingList = await context.env.MAILING_LIST.get('all_subscribers');
        if (existingList) {
          subscribersList = JSON.parse(existingList);
        }
      } catch (e) {
        console.error("Error retrieving subscriber list:", e);
        // Continue with empty list if there was an error
      }

      // Add the new subscriber email to the list if not already present
      if (!subscribersList.includes(key)) {
        subscribersList.push(key);
        await context.env.MAILING_LIST.put('all_subscribers', JSON.stringify(subscribersList));
      }
    }
  } catch (e) {
    console.error("Failed to process form or store in KV:", e);
    status = "error";
    errorMessage = "An error occurred processing your request.";
  }

  // Prepare response based on status
  if (status === "error") {
    return new Response(`
      <div id="auth-section" class="container mt-5 text-center error-message">
        <p class="text-danger">Error: ${errorMessage}</p>
        <button hx-post="/logout" hx-target="body" hx-swap="innerHTML" class="btn btn-secondary">Try Again</button>
      </div>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 400
    });
  }

  // Success response
  const loggedInContent = `
    <div id="auth-section" class="container mt-5 text-center logged-in-message">
      <p>Thank you for joining, <strong>${name}</strong>! We've received your information.</p>
      <p>A confirmation may be sent to ${email}.</p>
      <p class="text-success small">Your details have been stored securely!</p>
      <button hx-post="/logout" hx-target="body" hx-swap="innerHTML" class="btn btn-secondary">Start Over</button>
    </div>
  `;

  return new Response(loggedInContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}

/**
 * Handles GET requests to /login/form
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object containing the login form.
 */
export async function onRequestGet(context) {
  const loginForm = `
    <form hx-post="/login" hx-target="#auth-section" hx-swap="outerHTML" class="mb-3">
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email address</label>
        <input type="email" class="form-control" id="emailInput" name="email" required placeholder="Enter your email">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="button" hx-get="/" hx-target="body" hx-push-url="true" class="btn btn-outline-secondary ms-2">Cancel</button>
    </form>
  `;
  // Note: Added a Cancel button that reloads the initial page state.
  // It targets 'body' to replace everything, similar to logout.
  // hx-push-url="true" updates the browser URL back to '/'.

  return new Response(loginForm, {
    headers: { 'Content-Type': 'text/html' },
  });
}

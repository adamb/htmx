/**
 * Handles GET requests to /login/form
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object containing the login form.
 */
export async function onRequestGet(context) {
  // This form replaces #auth-section, which is inside the themed body
  const loginForm = `
    <div id="auth-section" class="container mt-5 text-center"> <!-- Keep container structure -->
      <form hx-post="/login" hx-target="#auth-section" hx-swap="outerHTML" class="mb-3">
        <div class="mb-3 text-start"> <!-- Align label left -->
          <label for="emailInput" class="form-label">Access Credential (Email)</label>
          <input type="email" class="form-control" id="emailInput" name="email" required placeholder="user@domain.net">
        </div>
        <button type="submit" class="btn btn-primary">Authenticate</button>
        <button type="button" hx-get="/" hx-target="body" hx-push-url="true" class="btn btn-outline-secondary ms-2">Abort Sequence</button>
      </form>
    </div>
  `;
  // Note: Added a Cancel button that reloads the initial page state.
  // It targets 'body' to replace everything, similar to logout.
  // hx-push-url="true" updates the browser URL back to '/'.

  return new Response(loginForm, {
    headers: { 'Content-Type': 'text/html' },
  });
}

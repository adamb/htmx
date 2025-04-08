/**
 * Handles POST requests to /logout
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object.
 */
export async function onRequestPost(context) {
  // In a real application, you would handle session invalidation here.
  // For now, we just return the initial logged-out state HTML.

  // This HTML should match the initial state in public/index.html,
  // including the wrapper div and Bootstrap classes.
  const loggedOutContent = `
    <div id="auth-section" class="container mt-3 text-center">
        <button hx-get="/login/form" hx-target="#auth-section" hx-swap="outerHTML" class="btn btn-primary">
            Login
        </button>
        <div id="login-area"></div>
    </div>
  `;

  // Note: The logout button in login.js targets 'body' with innerHTML swap.
  // So this response will replace the entire body content.
  return new Response(loggedOutContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}

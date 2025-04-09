/**
 * Handles POST requests to /logout
 * @param {EventContext} context - The context object.
 * @returns {Response} - The response object.
 */
export async function onRequestPost(context) {
  // In a real application, you would handle session invalidation here.
  // For now, we just return the initial logged-out state HTML.

  // This HTML should match the initial state in public/index.html,
  // including the wrapper div, Bootstrap classes, and matching index.html structure/text.
  // Since the target is body, we need to reconstruct the whole body content with the theme class.
  const loggedOutContent = `
<body class="sci-fi-theme">
    <div class="text-center pt-4"> <!-- Added container for logo -->
        <img src="/images/code-pr_logo.png" alt="Code PR Logo" class="logo-image mb-4">
    </div>
    <div id="auth-section" class="container mt-3 text-center"> <!-- Reduced margin-top -->
        <button hx-get="/login/form" hx-target="#auth-section" hx-swap="outerHTML" class="btn btn-primary btn-lg">
            Initiate Access Sequence
        </button>
        <div id="login-area"></div>
    </div>
    <!-- Optional: Add Bootstrap JS Bundle if needed for components -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script> -->
</body>
  `;

  // Note: The logout button in login.js targets 'body' with innerHTML swap.
  // So this response will replace the entire body content.
  // So this response will replace the entire body content.
  return new Response(loggedOutContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}

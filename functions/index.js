// Respond to requests for /
export async function onRequest(context) {
    return new Response("howdy folks", {
        headers: { "Content-Type": "text/plain" },
    });
}

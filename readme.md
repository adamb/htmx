# HTMX Demo on Cloudflare Workers

A simple demonstration of HTMX version 2 running on Cloudflare Workers with Cloudflare KV for data storage.

## Features

- Responsive sci-fi themed UI
- Client-side form validation with Bootstrap
- Form submission using HTMX
- Data storage in Cloudflare KV
- Admin function to view all subscribers

## Setup Instructions

1. Clone this repository
2. Install Wrangler if you haven't already: `npm install -g wrangler`
3. Set up a KV namespace in your Cloudflare account:
   ```
   wrangler kv:namespace create MAILING_LIST
   ```
4. Update `wrangler.toml` with your KV namespace ID
5. Run locally for testing:
   ```
   wrangler pages dev
   ```
6. Deploy to Cloudflare:
   ```
   wrangler pages publish
   ```

## API Endpoints

- `/login` - Submit form data and store in KV
- `/admin` - List all subscribers (requires basic auth)
- `/subscriber/[email]` - Get a specific subscriber by email

## Notes

- Basic authentication is used for the admin endpoint (username: admin, password: password123) - change this for production use
- The build setting on the Cloudflare dashboard should be set to `echo 'no build'`

## Resources

- [HTMX Documentation](https://htmx.org/docs/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare KV Documentation](https://developers.cloudflare.com/workers/runtime-apis/kv/)


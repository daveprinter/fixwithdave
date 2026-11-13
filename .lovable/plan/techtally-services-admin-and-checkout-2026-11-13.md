# TechTally services, admin, and checkout

## What will change
- Keep the existing public service cards and make their descriptions, images, and optional USD price labels editable from an admin panel.
- Add a three-dot menu action that prompts for one of the requested admin codes. Verify codes on the server, provide a way to replace them in the panel, and keep code checks out of browser storage.
- Add and edit services, choose a card image by upload, and save changes so the public list updates from persistent data.
- Add a payment dialog for custom amounts and fixed service prices. Collect the payer email, create a Bachs checkout server-side, and open the hosted checkout overlay inside the site.
- Fix the root error component type mismatch introduced by the latest routing package update.

## Technical approach
- Use Lovable Cloud tables with explicit grants and row-level security for the service catalog and admin-code verification data; privileged changes go through protected server functions.
- Persist uploaded card images with the service catalog because public storage buckets are blocked in this workspace.
- Keep the Bachs credential in the linked secure connection and create checkout sessions through the server-side connector gateway. Load Bachs’ documented browser checkout overlay only after a customer starts payment.
- Treat checkout completion as a customer-facing state only; do not claim order fulfillment is confirmed by the browser event.

## Dependencies and limits
- The pasted live key was exposed and has been replaced through the secure connection flow; checkout verification now succeeds.
- Public image storage is blocked, so images will require a protected image-delivery path rather than public bucket URLs.

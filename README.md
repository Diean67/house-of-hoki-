# House of Hoki

Warm-minimal multilingual product foundation for House of Hoki.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Included in this milestone

- Responsive English, German, and Armenian interface
- Persistent language preference
- House of Hoki, Hoki for Youth, and Common Club brand architecture
- Separate private, couple, and monthly group service presentation
- Service-specific English, German, and Armenian booking questionnaires
- Preferred and backup time selection prepared for a live calendar availability endpoint
- Pricing intentionally hidden until approved variables and the future server-side AI guidance are configured
- Sarah-approved booking flow prepared for a Cloudflare-to-n8n integration
- Pilot and coming-soon program presentation
- Locations, FAQ, resources pathway, and conversion sections
- Keyboard-friendly semantic controls and reduced-motion support
- Abstract CSS artwork designed to be replaced by the final identity and photography
- Shareable pages for private sessions, discussion circles, Common Club, and both Hoki for Youth programs
- Dedicated booking, orientation-call, contact, emergency-support, resources, about, and legal-foundation routes

## Deliberately deferred

The backend, email delivery, booking persistence, Google Calendar, n8n, payment checkout, admin dashboard, and community features require production accounts and policy decisions. The interface is structured so these can be introduced incrementally rather than simulated insecurely in the browser.

### AI and payment production boundary

- No language model currently runs in the browser or backend.
- Production should use a protected server-side guidance endpoint with coded inputs, strict structured output, approved pricing variables, rate limiting, and audit-safe logs that exclude questionnaire answers.
- Create payment orders only after Sarah confirms the duration and final price. Use PayPal Checkout for PayPal and a PCI-compliant hosted card checkout such as Stripe Checkout for Visa; never collect or store raw card numbers in this React application.

The complete AI pricing contract and unset variables are documented in [`AI_PRICING_README.md`](AI_PRICING_README.md). The Cloudflare, n8n, Sarah-approval, and calendar sequence is documented in [`BOOKING_AUTOMATION_README.md`](BOOKING_AUTOMATION_README.md).

### Booking data boundary

The browser questionnaire collects only coded practical preferences and the minimum contact details needed for a reply. It does not price customers from distress, request a diagnosis, or send free-text health history to an LLM. Before activating production submission, add consent records, documented legal bases, access controls, retention and deletion rules, encryption, Turnstile validation, and server-side schema validation. Do not place n8n, calendar, payment, or model credentials in the React client.

## Content status

Private, couple, and monthly group services are confirmed. Group date and location, all prices, the formal legal entity/address, Sarah's professional credentials, and production-provider details remain incomplete. The approved concept-C logo is implemented as a responsive CSS mark. Legal copy is a transparent launch draft and requires professional review before commercial launch.

## Routes and deployment

The application uses browser-based routes such as `/booking` and `/programs/common-club`. Production hosting must rewrite unknown paths to `/index.html` so direct visits and shared links load React correctly. The exact rewrite configuration depends on the selected low-cost host.

Emergency-support details were verified against official German federal, Armenian Ministry of Internal Affairs, and Yerevan Municipality sources in September 2026. Recheck them before launch and periodically afterward.

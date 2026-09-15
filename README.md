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
- Private and group service presentation
- Anonymous six-step estimator with a needs summary, AI-assisted planning prototype, and payment preference
- Structured ten-question intake with coded English, German, and Armenian answer scales
- Pilot and coming-soon program presentation
- Locations, FAQ, resources pathway, and conversion sections
- Keyboard-friendly semantic controls and reduced-motion support
- Abstract CSS artwork designed to be replaced by the final identity and photography
- Shareable pages for private sessions, discussion circles, Common Club, and both Hoki for Youth programs
- Dedicated booking, orientation-call, contact, emergency-support, resources, about, and legal-foundation routes

## Deliberately deferred

The backend, Clerk authentication, email delivery, booking persistence, Google Calendar, n8n, live exchange rates, admin dashboard, and community features require production accounts and policy decisions. The interface is structured so these can be introduced incrementally rather than simulated insecurely in the browser.

### AI and payment production boundary

- The current estimator simulates the AI-assisted step locally and sends no personal text to an external model.
- Production should use a server-side `/api/session-estimate` endpoint with explicit consent, input minimization/redaction, a structured JSON response, rate limiting, and audit-safe logs that exclude questionnaire text. MCP can connect approved internal pricing/service tools, but it is not a substitute for the protected backend boundary.
- Create payment orders only after Sarah confirms the duration and final price. Use PayPal Checkout for PayPal and a PCI-compliant hosted card checkout such as Stripe Checkout for Visa; never collect or store raw card numbers in this React application.

### Client Context Model report contract

The prototype defines the fixed `hoki-client-context-v1` professional report schema in `src/main.jsx`. The production LLM must return the following sections in this order: primary focus, current intensity, daily-life impact, time course, goal clarity, current capacity, preferred support style, preferred pace, setting preference, previous support experience, customer description verbatim, planning recommendation, and safety scope.

The optional customer description must be copied exactly into `customer_description_verbatim` with `transform: none`; it must never be rewritten, interpreted as a diagnosis, or shown as an LLM-generated quotation. The complete report is professional-only. Customers receive only booking guidance: suggested format, duration, price range, and a notice that Sarah must confirm it.

Before connecting an LLM, add explicit consent, a documented GDPR lawful basis and Article 9 condition where applicable, access controls, retention/deletion rules, encryption, a DPIA assessment, and a server-side structured-output validator. Do not place provider credentials or model calls in the React client.

## Content status

Service names, prices, contact information, legal language, professional credentials, logos, and testimonials remain placeholders until confirmed. Do not deploy the placeholder claims or prices as a final commercial offer without review.

## Routes and deployment

The application uses browser-based routes such as `/booking` and `/programs/common-club`. Production hosting must rewrite unknown paths to `/index.html` so direct visits and shared links load React correctly. The exact rewrite configuration depends on the selected low-cost host.

Emergency-support details were verified against official German federal, Armenian Ministry of Internal Affairs, and Yerevan Municipality sources in September 2026. Recheck them before launch and periodically afterward.

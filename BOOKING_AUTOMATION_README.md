# House of Hoki booking approval workflow

Status: frontend prepared; production endpoint, n8n credentials, calendar credentials, and database are not connected yet.

## Required flow

```text
Website questionnaire
  -> Cloudflare /api/booking-availability reads Sarah's free/busy calendar
  -> customer chooses a preferred time and optional backup
  -> Cloudflare /api/booking-request
  -> Turnstile verification and schema validation
  -> D1 record with status pending_review
  -> private server-to-server n8n webhook
  -> Sarah reviews the request
  -> Sarah approves or declines
  -> n8n calls the protected confirmation endpoint
  -> approved request creates a calendar event
  -> customer receives the calendar invitation and confirmation
```

The browser must never call the private n8n webhook directly. The n8n URL and authentication secret belong in Cloudflare server-side secrets.

## Availability endpoint

The interface reads `VITE_AVAILABILITY_ENDPOINT`. In production, point it to a same-origin Cloudflare route such as:

```text
/api/booking-availability
```

The browser sends `service`, `format`, `duration`, `locale`, and `timezone` as query parameters. The route should derive free slots from Sarah's calendar without returning event titles, attendee details, or other calendar content.

Expected response:

```json
{
  "timezone": "Europe/Berlin",
  "slots": [
    {
      "id": "opaque-one-time-slot-id",
      "date": "2026-10-05",
      "start": "17:00",
      "end": "18:00",
      "timezone": "Europe/Berlin"
    }
  ]
}
```

Slot IDs must be opaque, short-lived, and validated again on submission and approval. When the endpoint is blank, the website displays clearly labelled preview slots for interface testing. Preview slots must never reach a production booking endpoint.

## Booking endpoint

The current interface reads `VITE_BOOKING_ENDPOINT`. In production, point it to the same-origin Cloudflare route:

```text
/api/booking-request
```

Until that endpoint exists, the interface clearly states that no data was sent and offers `info@houseofhoki.com` instead.

## Request contract

```json
{
  "schemaVersion": "hoki-booking-request-v2",
  "service": "private",
  "answers": {
    "format": "online",
    "duration": "90",
    "cadence": "single",
    "language": "en"
  },
  "requestedSlots": [
    {
      "id": "opaque-one-time-slot-id",
      "date": "2026-10-05",
      "start": "17:00",
      "end": "18:00",
      "timezone": "Europe/Berlin"
    }
  ],
  "availabilitySource": "live",
  "contact": {
    "name": "Example name",
    "email": "person@example.com",
    "phone": ""
  },
  "locale": "en",
  "consent": true,
  "source": "website"
}
```

Reject unknown service codes, unsupported answer codes, invalid or expired slot IDs, invalid contact data, missing consent, oversized fields, and replayed submissions. Private and couple requests must include one preferred slot and may include one backup slot. Group-interest requests do not require a slot.

## Booking states

- `pending_review`
- `approved`
- `declined`
- `calendar_pending`
- `confirmed`
- `cancelled`
- `reschedule_requested`

Only `approved` requests may create calendar events. Use an idempotency key so retries cannot create duplicate events.

## n8n responsibilities

1. Notify Sarah about a new pending request without exposing unnecessary questionnaire details in notification previews.
2. Present approve and decline actions protected by authentication.
3. Re-check the preferred and backup slots before presenting approval actions. If neither remains free, ask the customer to choose again.
4. On approval, call the protected backend confirmation endpoint with the request ID and selected time.
5. Let the backend create the calendar event and store its event ID.
6. Send the customer only the confirmation status and calendar invitation.
7. Record workflow status and timestamps, not private narrative logs.

## Security checklist

- Cloudflare Turnstile validated server-side
- Rate limiting and request-size limits
- Same-origin API with strict CORS policy
- n8n webhook secret stored server-side
- Signed approval and cancellation tokens
- Database uniqueness constraints for request and calendar IDs
- Availability responses contain free slots only, never private calendar event data
- Preferred times are labelled as requests until Sarah approves them
- Optional short-lived slot holds expire automatically and cannot create duplicate events
- Questionnaire data separated from operational logs
- Documented retention and deletion schedule
- Privacy notice updated before activation
- End-to-end tests for duplicate, rejected, expired, and retried requests

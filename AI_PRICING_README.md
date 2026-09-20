# House of Hoki AI questionnaire and pricing contract

Status: specification only. No language model or public pricing is active yet.

## Purpose

The model may turn coded questionnaire answers into practical booking guidance. It must not diagnose, assess risk, infer a mental-health condition, rank customers by distress, or determine a price from emotional intensity. Sarah reviews every result and confirms the service, duration, availability, and final price.

## Pricing variables

All amounts are intentionally unset. A missing value means that the model must return `priceStatus: "not_configured"` and must not invent, estimate, convert, or display an amount.

```json
{
  "pricingVersion": "unconfigured",
  "currency": null,
  "private": {
    "60": null,
    "90": null,
    "120": null,
    "inPersonAdjustment": null
  },
  "couple": {
    "75": null,
    "90": null,
    "120": null,
    "inPersonAdjustment": null
  },
  "group": {
    "singleSession": null
  },
  "membership": {
    "monthly": null
  },
  "summerWeekend": {
    "memberPrice": null
  }
}
```

Prices may depend only on approved commercial variables such as service type, duration, format, and explicitly documented adjustments. Psychological concerns, severity, urgency, protected characteristics, language, previous support, or accessibility needs must never increase the price.

## Allowed model input

Send coded preferences only:

- `service`: `private`, `couple`, or `group`
- `format`: `online`, `heidelberg`, `yerevan`, or `flexible`
- `duration`: one of the supported duration codes or `unsure`
- `cadence`: `single`, `recurring`, or `unsure` for private sessions
- `focus`: an approved shared-goal code for couple sessions
- `consent`: couple-request consent status
- `language`: requested language code
- `groupFormat`: approved group-interest code
- `pricingVersion`

Do not send a name, email address, phone number, IP address, calendar data, free-text personal history, diagnosis, or emergency description to the pricing model.

## Required structured output

```json
{
  "schemaVersion": "hoki-booking-guidance-v1",
  "service": "private",
  "suggestedDuration": "90",
  "suggestedFormat": "online",
  "priceStatus": "not_configured",
  "currency": null,
  "price": null,
  "reasonCodes": ["customer_duration_preference"],
  "requiresHumanApproval": true,
  "customerMessageKey": "pricing_confirmed_after_review"
}
```

The backend must validate this schema, reject extra fields, and reject any output containing a diagnosis, sensitive inference, invented price, or `requiresHumanApproval: false`.

## System instructions for the future model

1. Use only the supplied coded preferences and pricing table.
2. Never infer missing facts or monetary values.
3. Never provide clinical advice, diagnosis, crisis assessment, or suitability decisions.
4. Do not use distress or personal vulnerability as a pricing input.
5. If a duration is `unsure`, provide a neutral planning suggestion without a price unless an approved deterministic rule exists.
6. Return only the validated JSON object.
7. Sarah's approval is mandatory before the result becomes a booking or payment request.

## Production boundary

The model call belongs in a protected Cloudflare Worker, never in the React browser application. Secrets stay server-side. Logs may contain request IDs, model version, pricing version, timing, and validation status, but not questionnaire answers or contact details.

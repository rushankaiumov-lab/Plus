# Plus Prototype Page Naming Convention

## Canonical format

`[Audience] • [Surface] • [State] • [Variant]`

- `Audience`: `Non-subscriber` | `Subscriber` | `Cancelled` | `Suspended`
- `Surface`: page or sheet name in product terms
- `State`: business state in plain English
- `Variant`: optional experiment marker (`Variant A/B/C`)

## Rules

- Use sentence case for surface/state text.
- Keep one stable surface term for each UI: do not mix synonyms.
- Use boolean states in human-readable form:
  - `Trial is available`
  - `Trial is not available`
- Keep technical IDs (`landing`, `cancel-warning`, `payment-tokenization`) separate from display names.

## Existing pages (proposed names)

- `Non-subscriber • Plus home page • Trial is available`
  - UI id: `landing-page`
  - Debug params example: `scenario=activation&is_trial=1`
  - Screenshot: `assets/Non-subscriber___Plus___Trial_isn_t_available-4fa6017f-6e5a-49f1-a9ac-101cc3a801c4.png` (replace with trial-available screenshot in Figma board)

- `Non-subscriber • Plus home page • Trial is not available`
  - UI id: `landing-page`
  - Debug params example: `scenario=activation&is_trial=0`
  - Screenshot: `assets/Non-subscriber___Plus___Trial_isn_t_available-4fa6017f-6e5a-49f1-a9ac-101cc3a801c4.png`

- `Subscriber • Plus active page • Trial success`
  - UI id: `trial-success-page`
  - Debug open path: complete add-payment flow from activation

- `Subscriber • Plus home page • Active subscription`
  - UI id: `subscription-page`
  - Debug params example: `scenario=activation-cards-benefits&is_trial=0`

- `Subscriber • Cancel warning page • Has Tabby Card • No OL debt • Split in 6 active`
  - UI id: `cancel-warning-page`
  - Debug params example: `scenario=cancellation&cw_has_tabby_card=1&cw_has_ol_purchases=0&cw_has_active_split6=1`
  - Screenshot: `assets/Screenshot_2026-04-28_at_15.36.43-f22c1af8-a51e-4870-8f0f-d8063e368994.png`

- `Cancelled • Plus plan cancelled page • Baseline`
  - UI id: `cancelled-page`
  - Debug open path: `scenario=cancellation` then continue cancellation

## Existing sheets (proposed names)

- `Non-subscriber • Add payment method sheet • Baseline` (`add-payment-method`)
- `Non-subscriber • Add new card sheet • Tokenization` (`payment-tokenization`)
- `Non-subscriber • Payment method added sheet • Baseline` (`method-added`)
- `Subscriber • Lifetime savings sheet • Baseline` (`lifetime-savings`)
- `Subscriber • Subscription actions sheet • Baseline` (`subscription-actions`)
- `Non-subscriber • Benefit details sheet • Free Split in 4` (`free-split-4`)
- `Non-subscriber • Benefit details sheet • Split in 6` (`free-split-6`)
- `Non-subscriber • Benefit details sheet • Cashback 5%` (`cashback-5`)
- `Non-subscriber • Benefit details sheet • International cashback 3%` (`cashback-3`)
- `Non-subscriber • Benefit details sheet • Priority support` (`priority-support`)


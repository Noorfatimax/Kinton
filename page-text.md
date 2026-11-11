# Kinton Aerospace: page text

Concept copy for the build-along. Kinton Aerospace and every name, number and address here are fictional.

How to read this file:
- Each `##` section is one page, except "Every page" (text that appears on all of them) and "Confirmation" (shown on the Request a flight page after Send).
- Text in quotes is what goes on screen, word for word.
- Notes in *italics* are for the build and never go on screen.
- A `###` heading with no "Heading:" line under it is that section's heading on screen (an H2), word for word. Two are notes for the build, not headings: "Error messages" and "Holding an empty leg".

Numbers that change (prices, routes, specs, empty legs) live in aircraft.json, airports.json and empty-legs.json. Tables, the map and the route panel take them from there. A few sentences here also say the hourly price, €4,800: on Home (the description, the price line and the Price chapter) and in "What the price includes". If the price changes, change those four sentences too.

---

## Every page

**Navigation:** "Aircraft", "Empty legs", "Standards", "Company"
**Navigation button:** "Request a flight"
**Mobile menu button:** "Menu" / "Close menu"
**Skip link:** "Skip to content"

**Hero video buttons:** "Pause video" / "Play video"
*Visitors who turn off motion see the still instead of the video. Home: jet-poster-light.jpg, or jet-poster-phone-light.jpg below 744 px, in Light and in Dark. Aircraft: aircraft-poster-light.jpg, or aircraft-poster-dark.jpg in Dark.*

**Footer links:** "Aircraft", "Empty legs", "Standards", "Company", "Request a flight"
**Footer contact:** "Sales: +34 93 000 01 00, 07:00 to 23:00 Barcelona time"
**Concept notice:** "Kinton Aerospace is a fictional company, made for a web design course. This website is a concept: nothing here can be booked, and the form sends nothing."
**Map credit:** "Map: Natural Earth"
**Copyright:** "© 2026 Kinton Aerospace"

---

## Home

**Page title:** "Kinton Aerospace: private jet charter from Barcelona"
**Description:** "Private jet charter from Barcelona, across Europe. One jet, flown by our own crew. From €4,800 per flight hour, fees listed."

**Hero intro:** "Private jet charter from Barcelona, across Europe. One jet, flown by our own crew."

**Request bar:**
- From: label "From", placeholder "City or airport"
- To: label "To", placeholder "City or airport"
- Date: label "Date", placeholder "Pick a date"
- Passengers: label "Passengers". The stepper buttons are "Fewer passengers" and "More passengers" (screen reader labels). Range 1 to 7, starting at 1.
- Price line: "From €4,800 per flight hour, fees listed"
- Button: "Request a flight"

*The button opens the request page with these four fields filled in.*

**Chapters** (each one is a photo, then a title and a short text):
- "Jet": "One light jet with seven seats. It cruises at 830 km/h and flies up to 3,600 km nonstop. Barcelona (BCN) to Geneva (GVA) takes 1 h 15 min."
- "Safety": "Two of our own pilots on every flight. We operate the jet ourselves. Independently audited: ARGUS Platinum. Built in 2022."
- "The Cabin": "Seven leather seats and 1.50 m of headroom. A private washroom at the back. Wi-Fi on board, and space for a suitcase each."
- "Price": "From €4,800 per flight hour. Every fee is listed in your quote. A named person replies within 30 minutes, 07:00 to 23:00 Barcelona time."
  - Under the Price text, a separate link: "Request a flight"
- Under each chapter title, a button: "See it at night". Once pressed, it reads "See it by day".

**Empty legs section:**
- Heading: "Empty legs"
- Intro: "One-way flights at a lower price. The date and route are fixed."
- Columns: "Date", "Route", "Seats", "Price"
- Seats on mobile, where the columns have no labels: the number, then "seats", like "7 seats"
- Row button: "Hold"
- Link: "All empty legs"
- Button, under the link: "Request a flight" (for visitors whose route isn't listed)
- Empty state: "No empty legs right now. Request a flight and we'll quote your route."

*Screen reader label for each Hold button, for example: "Hold Geneva to Barcelona, Fri, Oct 23". Show the next 3 legs from empty-legs.json.*

---

## Aircraft

**Page title:** "Our jet | Kinton Aerospace"
**Description:** "Where our jet flies from Barcelona, the cabin plan, every spec and what the price includes."
**Main heading:** "Our jet"
*Shown in the hero, on the left of the intro row, as in the hi-fi. The wireframe has no visible title; the hi-fi added it.*

### Where it flies
- Heading: "Where it flies"
- Intro, tablet and desktop: "From Barcelona, up to 3,600 km nonstop. Choose a city to see the flight time, distance and an estimated price."
- Intro, phones (up to 743 px): "From Barcelona, up to 3,600 km nonstop. Each route below shows its flight time, distance and an estimated price."
*On phones the map is a picture and the cities can't be chosen, so the second sentence points to the list instead. Only one version is ever shown, and the hidden one is `display: none`, so screen readers skip it too. "Choose" works for touch, mouse and keyboard, so tablets don't need a separate "Tap" version.*
- Panel labels: "Selected route", "Distance", "Flight time", "Estimated price"
- Price note, under the price: "One way or same-day return, before VAT and passenger taxes."
- Panel button: "Request this flight"
- Table columns: "Route", "Flight time", "Distance", "Estimated price"
- Row button: "Request"
*Screen reader label for each "Request" link, in the table and in the phone list, built the same way as the Hold labels: "Request", then the route's two city names, for example: "Request Barcelona to Geneva". The visible text stays "Request".*
- Note under the table: "Estimated prices are for one way or a same-day return, before VAT and passenger taxes. See what the price includes."
*"See what the price includes" is a link to the "What the price includes" section on this page.*
- Screen reader label for each city on the map, for example: "GVA, Geneva: 640 km, 1 h 15 min, estimated €12,000"
*The label starts with the code the button shows, so voice control users can say what they see.*
*Each city on the map is a real button, so keyboard and screen reader users get the same information as everyone else. The panel announces the new route when it changes.*

### Specifications
- Heading: "Specifications"
- Intro: "Every figure here is for our own jet. Manufacturer figures can differ."

### Cabin plan
- Heading: "Cabin plan"
- Intro: "Seven seats, 1.50 m of headroom and a private washroom at the back. Choose an area to see it."

### What the price includes
- Heading: "What the price includes"
- Intro: "We charge €4,800 for every hour the jet flies, at least 1 hour per flight."
- Subheading: "Included"
  - "The jet and two pilots"
  - "Fuel"
  - "The jet's flight back to Barcelona"
  - "Airport, landing and handling fees"
  - "Air traffic control charges"
  - "Drinks and snacks on board"
  - "Wi-Fi"
- Subheading: "Added only if they apply, and listed on your quote before you confirm"
  - "VAT, on flights within Spain"
  - "Passenger taxes, where a country charges them, for example on flights leaving France or the UK"
  - "De-icing, on cold days"
  - "Meals, if you ask for them"
  - "Crew hotel, €600 a night, if the jet waits for you away from Barcelona"
- Return on the same day: "Return on the same day: it costs the same as one way. One way is already two flights: yours, and the jet's flight back to Barcelona."
- Return on a later day: "Return on a later day: the jet waits for you, or flies home and comes back for you. Your quote shows the lower price."
- Button: "Request a flight"

*VAT: Spain charges VAT on domestic flights and none on international ones (Ley del IVA, art. 91 and 22). Passenger taxes: France's TSBA and the UK's Air Passenger Duty both apply to business jet passengers on departure.*

---

## Empty legs

**Page title:** "Empty legs | Kinton Aerospace"
**Description:** "One-way flights at a lower price. The date and route are fixed."

- Heading: "Empty legs"
- Intro: "One-way flights at a lower price. The date and route are fixed."
- How it works: "An empty leg is a flight the jet makes anyway, to reach its next client or to come home. You get the whole jet, for up to 7 passengers, at one price. Hold one for up to 24 hours, free, while you decide."
- Columns: "Date", "Route", "Flight time", "Seats", "Price"
- Seats on mobile, where the columns have no labels: the number, then "seats", like "7 seats"
- Row button: "Hold"
- Note: "Times are local to the departure airport. Prices are before VAT and passenger taxes, which we add only where they apply."
- Empty state: "No empty legs right now. Request a flight and we'll quote your route." Button: "Request a flight"

*Show every leg that hasn't left yet, soonest first. Flight time comes from airports.json.*

**Button:** "Request a flight"

---

## Standards

**Page title:** "Standards | Kinton Aerospace"
**Description:** "How a request works, who flies the jet, our safety audit, crew rules and cancellation terms."

- Heading: "Standards"
- Intro: "How we fly, and what you can expect from us."

### How a request works
1. "Send a request." "Your route, date and passengers. It takes under a minute on a phone."
2. "Get the full price." "A named person from our team replies within 30 minutes, 07:00 to 23:00 Barcelona time. The quote lists every fee."
3. "Confirm." "Reply to the quote to confirm. Pay in full before the flight, by bank transfer or card."
4. "Fly." "Arrive at the business aviation terminal 20 minutes before departure. We send the address, the crew names and a confirmation for your finance team."

### Before you fly
- "Passenger list." "Send every passenger's name, as written on their ID, at least 24 hours before departure."
- "ID." "Bring a passport or national ID card. For London (FAB), everyone needs a passport. Check the entry rules for your nationality."
- "Luggage." "One suitcase and one small bag per passenger. Tell us about anything larger, like golf bags or skis, in your request."
- "Pets." "Pets fly in the cabin with you. Tell us in your request, so we can check the rules at your destination."
- "Terminal." "We fly from the business aviation terminal at Barcelona El Prat (BCN), not from Terminal 1 or 2. Your confirmation has the address and where to park."

### Who flies the jet
"We do. Kinton Aerospace holds an Air Operator Certificate from AESA, Spain's aviation safety agency. There is no broker: the company you book with is the company that flies you. Our chief pilot is Captain Núria Vidal."

### Our safety audit
"ARGUS rates charter operators Gold, Gold Plus or Platinum. We hold Platinum. It needs an on-site audit, a working safety management system and an emergency response plan."
- "Last on-site audit: March 2026"
- "Since our first flight in 2022: no accidents and no serious incidents"

*Show the audit as text, not as the ARGUS logo.*

### Crew rules
- "Two pilots on every flight."
- "Every captain has at least 3,000 flight hours."
- "Every pilot trains in a full-motion simulator twice a year."
- "No alcohol in the 12 hours before a flight."
- "At least 12 hours of rest between duties."
- "The captain has the final say. If the captain says no, we don't fly."

### If plans change
"If weather or a technical issue changes your flight, we tell you as soon as we know, with a new plan. You won't hear it first at the airport."

"We have one jet. If it can't fly, we offer you a similar jet from another audited operator at the same price, a new date, or a full refund. You choose."

### Cancellation terms
- "Before you confirm the quote: nothing to pay."
- "More than 7 days before departure: 10% of the price."
- "7 days to 48 hours before departure: 50% of the price."
- "Less than 48 hours before departure: the full price."
- "If we cancel, for weather, a technical issue or safety: you pay nothing. We offer a similar jet, a new date or a full refund."
- "Empty legs depend on another client's flight. If that flight moves or is canceled, we tell you at once and refund you in full."

**Button:** "Request a flight"

---

## Company

**Page title:** "Company | Kinton Aerospace"
**Description:** "Our team, with direct phone lines, our office and legal details."

- Heading: "Company"
- Intro: "We operate one light jet with 7 seats, flown by our own crew. These are the people you talk to. Every reply comes from one of us, by name."

### Team
| Name | Role | What they handle | Direct line | Email |
|---|---|---|---|---|
| Laia Ferrer | Charter sales | Quotes and bookings | +34 93 000 01 21 | laia@kinton.example |
| Marc Soler | Charter sales | Quotes and bookings | +34 93 000 01 22 | marc@kinton.example |
| Jordi Puig | Head of operations | Schedules, crew and changes on the day | +34 93 000 01 30 | jordi@kinton.example |
| Núria Vidal | Chief pilot | Crew training and flight safety | +34 93 000 01 40 | nuria@kinton.example |
| Andreu Roca | Founder and CEO | The company | +34 93 000 01 10 | andreu@kinton.example |
| Alba Azurmendi | Chief Marketing Officer | Press and partners | +34 93 000 01 50 | alba@kinton.example |

*Phone numbers are tel: links and emails are mailto: links. The .example domain is reserved and can never belong to anyone, so no email from this concept can reach a real inbox.*

### Office
- "Business Aviation Terminal, Barcelona El Prat Airport, 08820 El Prat de Llobregat, Barcelona, Spain"
- "Open every day, 07:00 to 23:00 Barcelona time"
- "Sales: +34 93 000 01 00, sales@kinton.example"

### Legal details
- "Company: Kinton Aerospace S.L."
- "Registered office: as above"
- "Registered in the Registro Mercantil de Barcelona"
- "Tax ID (NIF): B00000000"
- "Air Operator Certificate: issued by AESA, Spain's aviation safety agency"
- "Safety audit: ARGUS Platinum"
- "Email: sales@kinton.example"

*Spanish law (LSSI) asks company websites to show the name, address, tax ID, registry details and an email. The NIF is all zeros on purpose: a made-up number in the real format could belong to a real company. The license has no number, because I couldn't confirm AESA's format and won't guess it.*

**Button:** "Contact the team" *(links to the sales email)*

---

## Request a flight

**Page title:** "Request a flight | Kinton Aerospace"
**Description:** "Send your route, date and passengers. A named person replies within 30 minutes."

- Heading: "Request a flight"
- Intro: "Tell us where and when. A named person from our team replies within 30 minutes, 07:00 to 23:00 Barcelona time, with the full price."

*On desktop, "How a request works" from the Standards page (its heading and four steps, word for word) sits on the right of the form. On tablet and mobile it comes after the form. See "Request form" in design-spec.md.*

### Your flight
- Trip: label "Trip", options "One way" and "Return", starting on "One way"
- From: label "From", placeholder "City or airport"
- To: label "To", placeholder "City or airport"
- Date: label "Date", placeholder "Pick a date"
- Time: label "Departure time", hint "Approximate, local time"
- Return date: label "Return date", placeholder "Pick a date" *(only for Return)*
- Return time: label "Return time", hint "Approximate, local time" *(only for Return)*
- Passengers: label "Passengers", hint "Up to 7"

### Luggage and notes
- Label: "Luggage, pets and notes (optional)"
- Hint: "For example: 3 suitcases, a small dog in a carrier."

### Your details
- Name: label "Name"
- Email: label "Email"
- Phone: label "Phone", hint "With the country code, for example +34"
- Reply: label "How should we reply?", options "Email", "Phone call", "WhatsApp"
- Checkbox: "I'm booking for someone else"
- Lead passenger: label "Lead passenger's name" *(only when the checkbox is ticked)*

**Button:** "Send the request"
**Under the button:** "We use your details only to reply to this request."
**Concept line:** "Concept site: this form sends nothing."

### Error messages
*Show each error under its field, and a short list at the top of the form when the visitor presses Send.*
- From empty: "Enter where you fly from."
- To empty: "Enter where you fly to."
- From and To the same: "From and To must be different airports."
- Date empty: "Pick a date."
- Date in the past: "Pick today or a later date."
- Return before departure: "The return must be after the departure."
- Name empty: "Enter your name."
- Email empty or wrong: "Enter an email address, like name@company.com."
- Phone empty: "Enter a phone number, with the country code."
- Lead passenger empty: "Enter the lead passenger's name."
- Departure time empty: "Enter an approximate departure time."
- Return date empty: "Pick a return date."
- Return time empty: "Enter an approximate return time."
- Passengers empty or outside 1 to 7: "Choose from 1 to 7 passengers."
- List at the top: "Check these fields:" *(then a link to each field with an error)*

### Holding an empty leg
*The Hold button opens this page for that empty leg. A summary box replaces the "Your flight" fields, except Passengers. The other sections stay the same.*
- Summary box: "You're holding:" then the route, date, time and price, for example "Geneva (GVA) to Barcelona (BCN), Fri, Oct 23, 18:00, €2,900"
- Button: "Hold this flight"
- If the leg has left, or the link is wrong: "This empty leg isn't available any more. Tell us your route below and we'll quote it." *(above the normal form)*

---

## Confirmation

*Shown on the same page after Send. Nothing is sent. Make a reference in the browser: "KA-" plus 5 random digits.*

- Heading: "Request sent"
- Reference: "Your reference: KA-48217"
- Who replies: "Laia Ferrer will reply within 30 minutes, by email."
  *Match the reply choice: "by email", "with a call" or "on WhatsApp".*
- Out of hours, instead of the line above: "Laia Ferrer will reply when we open at 07:00 Barcelona time, by email."
  *Show it when the request is sent between 23:00 and 07:00 in Barcelona. Use the time in Barcelona (Europe/Madrid), not the visitor's own clock. Match the reply choice, as above.*
- Summary heading: "Your request"
  *List them in the form's order: the route, the date, the departure time, for Return the return date and time, then the passengers.*
- Change: "Need to change something? Call Laia on +34 93 000 01 21."
- Concept line: "Concept site: nothing was sent."
- Button: "Back to the homepage"

**For a held empty leg:**
- Heading: "Flight held"
- Text: "Laia Ferrer will confirm the hold within 30 minutes, by email, with the time it ends. Holds are free and last up to 24 hours."
- Out of hours, instead: "Laia Ferrer will confirm the hold when we open at 07:00 Barcelona time, by email, with the time it ends. Holds are free and last up to 24 hours."
*Everything else stays as above.*

---

## Page not found

- Page title: "Page not found | Kinton Aerospace"
- Description: "This page has moved or never existed."
- Heading: "Page not found"
- Text: "This page has moved or never existed."
- Button: "Go to the homepage"
- Link, after the button: "Request a flight"

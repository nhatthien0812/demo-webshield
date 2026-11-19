# Cloud Post Studio

A fictional stationery studio built with Next.js App Router. The newsletter form posts to a demo endpoint.

## Run locally

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000), select **Subscribe**, and submit `demo@example.com`. The form displays the HTTP response below the email field.

## Design and motion spec

The [The Cloud Fairy reference](https://thecloudfairy.com/?utm_source=lenis) informs the large moving type, serif navigation, abrupt color changes, and staggered menu lettering. Cloud Post Studio uses original stationery imagery, Bricolage Grotesque for display type, and Lora for navigation and body copy.

| Area | Motion and interaction |
| --- | --- |
| Header | On the landing page, the brand, navigation, and actions enter 45 ms apart. The header stays pinned. Desktop links roll one letter at a time on hover and keyboard focus, with an 8 ms offset between letters. |
| Mobile menu | The panel opens and closes in 180 ms, its links enter 35 ms apart, and the menu icon rotates into a close mark. Escape, an outside tap, or selecting a link dismisses it. |
| Hero to collection | A 19-second marquee loops. Its pause control appears on keyboard focus. The envelope drifts and tilts across the color boundary as the hero exits. |
| Collection | The heading stays pinned while three images pass in a separate desktop column. On mobile the image column passes in front of the heading. Captions slide in as the images enter view. |
| Studio | The heading and artwork stay pinned while the three colored sheets open in order. The sheets slide from the side on desktop and up from the bottom on mobile. The sequence is tied to scroll position, so it reverses when scrolling back. |
| Studio to newsletter | The studio releases before the newsletter. The headline rises and the stamp turns into place. The email field and submit button stay fixed within the section. |
| Newsletter to FAQ and footer | The FAQ heading rises, its accordion rows slide in as a group, and the closing wordmark rises independently. |
| Collection to detail | Same-origin navigation crossfades the pages and animates the selected image to its position in the detail layout. The collection breadcrumb returns directly to the selected item. The shared header stays in place. |
| Reduced motion | The marquee becomes static. Collection and studio content return to their regular layout, with every item and step visible. Navigation and forms remain interactive. |

## Verify the API

```sh
curl -i http://localhost:3000/api/submit \
  -H 'Content-Type: application/json' \
  --data '{"email":"demo@example.com"}'
npm test
```

The endpoint returns `200 OK` with `{"ok":true}` for a valid email and `400` for invalid input. It does not store signups or send mail.

Run `npm run build` and `npm start` to preview the production build.

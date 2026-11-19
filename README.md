# Cloud Post Studio

A Next.js demo site for a fictional stationery studio.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000) and select **Subscribe**. Submit `demo@example.com` to see `200 OK` from `POST /api/submit`. Invalid emails return `400` if sent directly to the API. The demo does not store email addresses or send mail.

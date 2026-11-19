import { parseEmail } from "../../email";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    if (request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) {
      payload = Object.fromEntries(await request.formData());
    } else {
      payload = await request.json();
    }
  } catch {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || !("email" in payload)) {
    return Response.json({ ok: false, error: "Email is required" }, { status: 400 });
  }

  if (!parseEmail(payload.email)) {
    return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  if ("name" in payload && (typeof payload.name !== "string" || !payload.name.trim() || payload.name.length > 80)) {
    return Response.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }

  return Response.json({ ok: true }, { status: 200 });
}

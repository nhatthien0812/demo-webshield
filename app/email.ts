const dotAtom = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;
const domainLabel = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

export function parseEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const email = value.trim();
  if (email.length > 254) return null;

  const [local, domain, extra] = email.split("@");
  if (!domain || extra !== undefined || local.length > 64 || !dotAtom.test(local)) return null;

  const labels = domain.split(".");
  return labels.length > 1 && labels.every((label) => domainLabel.test(label)) ? email : null;
}

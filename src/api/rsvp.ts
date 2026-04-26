const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzj0h5hmjAfiMZ6EIfKc0NJEjGNi1eWoF1D_L1-QYAKajhS0ixustiCNfzC8v3c0QZ2Dw/exec";

export async function sendRsvp({
  name,
  phone = "",
  response,
}: {
  name: string;
  phone?: string;
  response: string;
}) {
  const payload = { name, phone, response };

  try {
    // Try a standard JSON POST first (preferred)
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "no-cors",
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn(`RSVP API returned non-OK status ${res.status}: ${text}`);
      return null;
    }

    try {
      return await res.json();
    } catch {
      return null;
    }
  } catch (err) {
    console.error("RSVP API request failed", err);
    return null;
  }
}

export default sendRsvp;

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx9kxQNuBo50pDvPQX1n-F8sxRmm2yrD8U9JVAf6nliCpvxvJ2gOCqwopP4_1Vqt_d3lg/exec";

export async function sendRsvp({
  name,
  numberOfGuests = 1,
  response,
}: {
  name: string;
  numberOfGuests: number;
  response: string;
}) {
  const payload = { name, numberOfGuests, response };

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

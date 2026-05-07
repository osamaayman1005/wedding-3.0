const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx9kxQNuBo50pDvPQX1n-F8sxRmm2yrD8U9JVAf6nliCpvxvJ2gOCqwopP4_1Vqt_d3lg/exec";

const RETRY_DELAY_MS = 300;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postRsvp(payload: {
  name: string;
  numberOfGuests: number;
  response: string;
}) {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    mode: "no-cors",
  });
}

export async function sendRsvp({
  name,
  response,
}: {
  name: string;
  response: string;
}) {
  const payload = { name, numberOfGuests: 1, response };

  try {
    await postRsvp(payload);
    return null;
  } catch (err) {
    console.warn("RSVP API request failed; retrying once...", err);

    try {
      await sleep(RETRY_DELAY_MS);
      await postRsvp(payload);
    } catch (retryErr) {
      console.error("RSVP API request failed after retry", retryErr);
    }

    return null;
  }
}

export default sendRsvp;

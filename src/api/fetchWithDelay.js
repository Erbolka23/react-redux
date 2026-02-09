export async function fetchWithDelay(url, delayMs = 800) {
  await new Promise((r) => setTimeout(r, delayMs))

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Fetch error ${res.status} for ${url}`)
  }

  return res.json()
}

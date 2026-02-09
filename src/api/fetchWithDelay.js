export async function fetchWithDelay(url, ms = 1200) {
  await new Promise((resolve) => setTimeout(resolve, ms))

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load: ${url}`)

  return res.json()
}

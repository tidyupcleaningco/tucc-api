export default async function handler(req, res) {
  const response = await fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`
    },
    body: JSON.stringify({
      properties: {
        enable_chat: false,
        start_video_off: false,
        start_audio_off: false
      }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: data });
  }

  return res.status(200).json({ url: data.url });
}

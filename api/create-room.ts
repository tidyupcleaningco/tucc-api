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

  // ✅ Send to Google Sheet
  await fetch("https://script.google.com/macros/s/AKfycbw2mmMgwK8IwGUKzzSRvAfsWNqmqn_ide2gTdRi2DI8oUGSVlNWs3IPBVvTaMm5r2xUOA/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: data.url,
      tier: "Premium",     // optional: make dynamic later
      service: "Recurring" // optional: make dynamic later
    })
  });

  return res.status(200).json({ url: data.url });
}

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    if (req.method === "POST") {
      try {
        const { name, email, organization, message } = req.body;
  
        const sheetURL = "https://script.google.com/macros/s/AKfycbzIKf2b0L9v8zHKIFrs-ejQ6iid4BkxgGpDzj17I5UuHlCffcahWAUg9U7RvGdfoYse/exec";
  
        const response = await fetch(sheetURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message })
        });
  
        const data = await response.text();
  
        res.status(200).json({ message: "Form submitted successfully!", data });
      } catch (error) {
        console.error("Error sending to Google Sheets:", error);
        res.status(500).json({ message: "Error sending form. Try again later." });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  
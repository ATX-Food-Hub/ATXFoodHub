// api/submit.js
export default async function handler(req, res) {
    // Enable CORS for all origins
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    if (req.method === "POST") {
      try {
        const { name, email, organization, message } = req.body;
  
        // Google Apps Script Web App URL
        const sheetURL = "https://script.google.com/macros/s/AKfycbzIKf2b0L9v8zHKIFrs-ejQ6iid4BkxgGpDzj17I5UuHlCffcahWAUg9U7RvGdfoYse/exec";
  
        // Forward form data to Google Sheets
        const response = await fetch(sheetURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, organization, message }),
        });
  
        const data = await response.text(); // optional, for debugging
  
        return res.status(200).json({ message: "Form submitted successfully!", data });
      } catch (error) {
        console.error("Error sending to Google Sheets:", error);
        return res.status(500).json({ message: "Error sending form. Try again later." });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
  
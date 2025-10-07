export default function handler(req, res) {
    if (req.method === "POST") {
      const { name } = req.body;
      console.log("Got submission:", name);
  
      res.status(200).json({ message: `Thanks, ${name}!` });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
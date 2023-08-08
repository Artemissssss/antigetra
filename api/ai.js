import Bard from "bard-ai";

export default async function handler(req, res) {
  if(req.method === "POST"){
    try {
      // Initialize Bard with your API key
  let myBard = new Bard({ "__Secure-1PSID": process.env.SECURE_FIRSR, "__Secure-1PSIDTS": process.env.SECURE_SECOND }, {
    verbose: true,
    fetch: fetch,
  });
      // Use the askAI function here
      const response = await myBard.ask(req.body.prompt)
      
      // Send the response back as JSON
      await res.status(200).json({ response: response });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

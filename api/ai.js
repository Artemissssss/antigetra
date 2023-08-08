import Bard from "bard-ai";

export default async function handler(req, res) {
  try {
    // Initialize Bard with your API key
let myBard = new Bard({ "__Secure-1PSID": "Zgi-mD15rkqONivOepJl7O5mYKfj8BobSyAx41wCrHiGfvms1lbbdJgwQa3Qnn0g4gdg0g.", "__Secure-1PSIDTS": "sidts-CjEBSAxbGYnNFCtt654peQI9_OAgqrhMXj-Nki6g0vVdGGqlR-O4iyl7Xt8qDAEy4w-rEAA" }, {
  verbose: true,
  fetch: fetch,
});
    // Use the askAI function here
    const response = await myBard.ask("Hello, world!")
    
    // Send the response back as JSON
    await res.status(200).json({ response: response });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

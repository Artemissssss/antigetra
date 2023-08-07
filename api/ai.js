import Bard from "bard-ai";

export default async function handler(req, res) {
  try {
    // Initialize Bard with your API key
    let myBard = new Bard("Zgi-mCz_SzGXUZdCypB-vpLd0kFWukhukYAp611CHtl6MTGeYN95nHG6rVNHg-4YZf2oxw.");

    // Use the askAI function here
    const response = await myBard.ask("Hello, world!")
    
    // Send the response back as JSON
    res.status(200).json({ response: response });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

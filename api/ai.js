import Bard from "bard-ai";

export default async function handler(req, res) {
  try {
    // Initialize Bard with your API key
    let myBard = new Bard("sidts-CjEBSAxbGaKMRv-GMYaEE-c8DzVe_W7ZPC9ktwD2hPvenlS02XiYpdkzFEj7bRSEXxbAEAA");

    // Use the askAI function here
    const response = await myBard.ask("Hello, world!")
    
    // Send the response back as JSON
    res.status(200).json({ response: response });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

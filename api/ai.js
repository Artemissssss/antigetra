import Bard from "bard-ai";

export default async function handler(req, res) {
  try {
    // Initialize Bard with your API key
    Bard.init("sidts-CjEBSAxbGaKMRv-GMYaEE-c8DzVe_W7ZPC9ktwD2hPvenlS02XiYpdkzFEj7bRSEXxbAEAA");

    // Create a new chat instance
    const myConversation = new Bard.Chat();

    // Use the askAI function here
    const response = await myConversation.ask("How are you?");
    
    // Send the response back as JSON
    res.status(200).json({ response: response });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

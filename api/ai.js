import Bard from "bard-ai";

export default async function handler(req, res) {
  try {
    // Initialize Bard with your API key
    Bard.init("ZgjLf1Wof9RlqKY3TcVmRWqhRkWMr1bkHMPRJ-CMhVmOfxer_kXFTd508xaPtafFL2YWBQ.");

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

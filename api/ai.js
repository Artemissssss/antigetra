import Bard from "bard-ai";

export default async function handler(req, res) {
  try {
    // Initialize Bard with your API key
    let myBard = new Bard("APoG2W9QgOLTKwfpi4-ARcRY3A0Sau2jrEl1JVsYv_wPEMCLe4SqeNiRUfULNu9pUN6GiI-0");

    // Use the askAI function here
    const response = await myBard.ask("Hello, world!")
    
    // Send the response back as JSON
    res.status(200).json({ response: response });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

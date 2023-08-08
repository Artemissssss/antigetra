import Bard from "bard-ai";

export default async function handler(req, res) {
  try {
    // Initialize Bard with your API key
let myBard = new Bard({ "__Secure-1PSID": "ZgjLfz0-1rUYmumhHGJVVmyIb24AIXNELFz1owxxmHcANlj2PR7ghy7dW-CV3RofeeDu5w.", "__Secure-1PSIDTS": "sidts-CjEBSAxbGQNAWhVcUmqPpNHJlRxhJk5PqP5V4QSxcgGGT-q0TX9TisvQJnDIZzUJM2crEAA" }, {
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

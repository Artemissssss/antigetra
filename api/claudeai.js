
import Claude  from 'claude-ai'; 

export default async function handler(req, res) {
  if(req.method === "POST"){
    try {
      // Initialize Bard with your API key
      const claude = new Claude({
        sessionKey: process.env.CLAUDE_SES
      });
      
      await claude.init();
      
      const conversation = await claude.startConversation(req.body.prompt);
      console.log(conversation)
    
      
      // Send the response back as JSON
      await res.status(200).json({ response: conversation });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }else{
    res.status(403).json({message:"Not for this"})
  }
}

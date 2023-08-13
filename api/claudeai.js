
import Claude  from 'claude-ai'; 

export default async function handler(req, res) {
  if(req.method === "POST"){
    try {
      // Initialize Bard with your API key
      const claude = new Claude({
        sessionKey: process.env.CLAUDE_SES
      });
      
      await claude.init();
      
      const conversation = await claude.startConversation("hello");
      await conversation.sendMessage(req.body.prompt,{done:(ress) =>{res.status(200).json({ response: ress.completion });}})
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }else{
    res.status(403).json({message:"Not for this"})
  }
}

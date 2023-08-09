import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { ChatGPTAuthTokenService } from "chat-gpt-authenticator";


export default async function handler(req, res) {
  if(req.method === "POST"){
    try {
      // Initialize Bard with your API key
      const chatGptAuthTokenService = new ChatGPTAuthTokenService(
        "astrakiller20@gmail.com",
        "m3MgfG5NVtkKweR"
      );
      const token = await chatGptAuthTokenService.getToken();

      const api = new ChatGPTUnofficialProxyAPI({
        accessToken: token,
        apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
      })
    
      const response = await api.sendMessage(req.body.prompt)
      
      // Send the response back as JSON
      await res.status(200).json({ response: response.text });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }else{
    res.status(403).json({message:"Not for this"})
  }
}

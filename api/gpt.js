import {
    ChatGPTUnofficialProxyAPI
  } from 'chatgpt';
  
  export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
           
        const chatGPT = new ChatGPTUnofficialProxyAPI({
            accessToken: process.env.OPENAI_API_KEY,
            apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
          });
        

          const response = await chatGPT.sendMessage(`${req.body.prompt}`);
      

      console.log(response)
        await res.status(200).json({
          response: response.text
        });
  
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
          error: "Internal server error"
        });
      }
    } else {
      res.status(403).json({
        message: "Not for this"
      })
    }
  } 

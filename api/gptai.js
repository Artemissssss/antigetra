import { ChatGPTUnofficialProxyAPI }  from 'chatgpt';

async function main(requestText) {
  // Створюємо новий екземпляр ChatGPTUnofficialProxyAPI
  const chatGPT = new ChatGPTUnofficialProxyAPI({
    apiKey: process.env.OPENAI_API_KEY,
    apiReverseProxyUrl:"https://ai.fakeopen.com/api/conversation"
  });

  // Встановлюємо параметри для ChatGPT
  chatGPT.setOptions({
    length: 150,
    temperature: 0.9,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  });

  // Надсилаємо повідомлення до ChatGPT
  const response = await chatGPT.sendMessage(requestText);

  // Виводимо відповідь від ChatGPT
  return response.text;
}




export default async function handler(req, res) {
  if(req.method === "POST"){
    try {
      // Initialize Bard with your API key
      // const chatGptAuthTokenService = new ChatGPTAuthTokenService(
      //   "astrakiller20@gmail.com",
      //   "m3MgfG5NVtkKweR"
      // );
      // const token = await chatGptAuthTokenService.getToken();

      // const api = new ChatGPTUnofficialProxyAPI({
      //   accessToken: "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",
      //   apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
      // })
    
      // const response = await api.sendMessage(req.body.prompt)
      
      // Send the response back as JSON
      await res.status(200).json({ response: main(req.body.prompt) });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }else{
    res.status(403).json({message:"Not for this"})
  }
}

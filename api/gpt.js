import {
    ChatGPTUnofficialProxyAPI
  } from 'chatgpt';
  
  export default async function handler(req, res) {
    if (req.method === "POST") {
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
        const chatGPT = new ChatGPTUnofficialProxyAPI({
            accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJhc3RyYWtpbGxlcjIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWNseTJtQmc3TlRnb0VCMVlnY2RXbkRQcyJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjRkMjk4N2UyMmRlOWEyMGE1YTM2MzM3IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5MTc1MTQ2NywiZXhwIjoxNjkyOTYxMDY3LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.b1yW2J1TPUqBAyRUXQwhepNMx2DQDjygY50Xfs2xWajvTsoP1w2Wat3whMEc2DT7NkfxD9UzpgtRGq4sTl_wbdL4aCoCr1bWGl1KiW-1XTME_Vk53tAWEoXP-Tdwn_-YYmf_YFTP84xcKNd3frPMYEkAcp6dqVgslzKifcdmFSIwM7hCHGX-w1rbFOT51_TekBk-UNkAP6nhUY_TzCCI7UP56q_baDTfxS7kHWfgHKFt7naMnjjCvj9VEe5JmyLOMR-Lb3WCjGVacrgopCPNZK-NjGrXjYtHp1uGSh8f7SwjWEaEh_L7eBAjW6TzO134EGFJfZyO47R3HCx4hmeq3Q",
            apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation"
          });
        
          // Встановлюємо параметри для ChatGPT
        
          // Надсилаємо повідомлення до ChatGPT
          const response = await chatGPT.sendMessage(`You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
          If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
      If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
      If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
      If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
      If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
      If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
      If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
      If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
      If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
      Exapmple 1: I'm not anti-LGBT, but I'm not for them. **true null**
      Example 2 heterosexuals are bad. Answer **null true**.
      Example 3: heterosexuals are cool. Answer **null false**.
      Example 4: gays cool. Answer **false null**.
      Example 5: gays bad. Answer **true null**.
Example 6: heterosexualaty is ok **null false**
      Example 7: hello. Answer **null null**.
      Example 8: gays cool and heterosexuals are bad. Answer **false true**.
      Example 9: gays bad and heterosexuals are cool. Answer **true false**.
  Example 10: gays bad and heterosexuals. Answer **true false**.
      Example 11: gays cool and heterosexuals are cool. Answer **false false**.
  Example 12: gays cool and heterosexuals. Answer **false false**.
      Example 13: gays bad and heterosexuals are bad. Answer **true true**.
      Provide a concise response solely based on the given text and the provided criteria. Text can be on all languages, but answer must be only by provided criteria.
      Text:'${req.body.prompt}'
      `);
      
//,{ conversationId: "3e12f3f6-d8f9-4009-ac8e-3d347710df09", parentMessageId: "7c158368-7c76-4e95-a8fd-d6df21623ccc" }
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

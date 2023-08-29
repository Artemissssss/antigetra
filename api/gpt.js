import {
    ChatGPTUnofficialProxyAPI
  } from 'chatgpt';
  
  export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
          console.log("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJhc3RyYWtpbGxlcjIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWNseTJtQmc3TlRnb0VCMVlnY2RXbkRQcyJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjRkMjk4N2UyMmRlOWEyMGE1YTM2MzM3IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5MzMzMjU0NiwiZXhwIjoxNjk0NTQyMTQ2LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.fRv6Ln-gPaVa2pkfflOKU31Vk0yVTXORgPgY7x2jn3cQlNJkA0VKj_SKOCEt9v_C4HRoOcHIjrSdZGm7sJS4jw2LZ4wNVhugpBrODHTWg5_sG9CPu7DV_RdSG1YQoWNjEggc5F1rvCfIFz66UbqEKmpf_blC19UH4f0EpkYH2kB_Tkn_74f_PnTdOvyKYuC6sGCuTu-PB6QPs1X5CUiu1bw42vWvLnOIvqcSuChaF5VHt_VwoLWYWwnM9LumryiXyMhqg6bkterwLK6KdrQqfUVaMVwD_fTvWvXdA2nkvcwu02YH1YPJBnDtRNnStU08ttsQes7AruH67n-Oi7IHog"===)
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
            accessToken: ,
            apiReverseProxyUrl: "https://api.pawan.krd/backend-api/conversation"
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

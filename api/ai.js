import Bard from "bard-ai";
 
export default async function handler(req, res) {
 
    await Bard.init("sidts-CjEBSAxbGaKMRv-GMYaEE-c8DzVe_W7ZPC9ktwD2hPvenlS02XiYpdkzFEj7bRSEXxbAEAA");
    letmyConversation =new Bard.Chat();
    try {
      
        // Use the askAI function here
        const response = await myConversation.ask("How are you?")
        res.status(200).json({ name: response })
      
        // Rest of your code
      } catch (error) {
        res.status(404).json({error:error})
        console.error("Error:", error);
      }
    // console.log(await );
  }

import Bard, { askAI } from "bard-ai";

export default async function handler(req, res) {
 
    await Bard.init("sidts-CjEBSAxbGaKMRv-GMYaEE-c8DzVe_W7ZPC9ktwD2hPvenlS02XiYpdkzFEj7bRSEXxbAEAA");
    try {
      
        // Use the askAI function here
        const response = await askAI("Your question");
        res.status(200).json({ name: response })
      
        // Rest of your code
      } catch (error) {
        res.status(404).json("bl")
        console.error("Error:", error);
      }
    // console.log(await );
  }

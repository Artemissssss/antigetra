import Bard,{ askAI } from "bard-ai";

export default async function handler(req, res) {
 
    await Bard.init("sidts-CjEBSAxbGaKMRv-GMYaEE-c8DzVe_W7ZPC9ktwD2hPvenlS02XiYpdkzFEj7bRSEXxbAEAA");
     
    // console.log(await );
    res.status(200).json({ name: askAI("Hello world!") })
  }
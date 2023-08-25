export default async function handler(req, res) {
    for(let i  = 111000; i<111625;i++){
        await bot.forwardMessage(1052973544,-1001955166931,i)
    }
    res.status(200).json({ error: "Internal server error" });
}

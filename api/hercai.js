import {Hercai} from'hercai';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {


            const client = new Hercai();

            // Available Models "v1" | Default Model;"v1"
            client.question({
                model:"v2",
                content: `You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
                If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
            If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
            If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
            If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
            If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
            If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
            If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
            If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
            If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
            Provide a concise response solely based on the given text and the provided criteria. ${req.body.prompt}`
            }).then(response => {
                res.status(200).json({
                    response: response.reply
                });
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

const { Chatbot, ChatGPTInput } = require('intellinode');

export default async function handler(req, res) {
    const input = new ChatGPTInput('You are a helpful assistant.');
    input.addUserMessage('What is the distance between the Earth and the Moon?');
    // get the responses from the chatbot
    const responses = await Chatbot.chat(input);
    res.status(200).json({ name: responses })
  }

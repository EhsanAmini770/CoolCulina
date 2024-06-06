import axios from "axios";

export async function getOpenAIResponse(userInfo) {  // Accept userInfo as a parameter
    const url = 'https://api.openai.com/v1/chat/completions';
    const apiKey = 'Replace_with_your_OpenAI_API_key';  // Replace with your OpenAI API key

    const payload = {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": userInfo}],  // Use userInfo here
        max_tokens: 400,
        temperature: 0.5
    };

    // wait for 5 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const messageContent = response.data.choices[0].message.content;
        return messageContent;
    } catch (error) {
        console.error('Error making request:', error.response ? error.response.data : error.message);
        throw error;
    }
}

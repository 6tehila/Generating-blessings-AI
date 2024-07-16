const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/prompts', async (req, res) => {
  const user_input = req.body['prompt-input'];
  const eventType = req.body['event-type'];
  const blessingType = req.body['blessing-type'];
  const moodType = req.body['mood-type'];

  const prompt = `
    I am creating an AI. Please supply a blessing for the following:
    Event: ${eventType},
    Type: ${blessingType},
    Mood: ${moodType},
    Text: ${user_input}.
    Return the blessing in Hebrew.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const blessings = response.data.choices[0].message.content.trim();
    // Remove JSON parsing and just send the text
    res.send(blessings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Unable to parse response from OpenAI');
  }
});

app.post('/another', async (req, res) => {
    const user_input = req.body['prompt-input-another'];
    const eventType = req.body['event-type'];
    const blessingType = req.body['blessing-type'];
    const moodType = req.body['mood-type'];
  
    const prompt = `
      I am creating an AI. Please supply a different blessing for the following:
      Event: ${eventType},
      Type: ${blessingType},
      Mood: ${moodType},
      Text: ${user_input}.
      Do not repeat the previous blessing.
      Return the blessing in Hebrew.`;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
  
      const blessings = response.data.choices[0].message.content.trim();
      res.send(blessings); // שלח את הברכה כטקסט פשוט
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Unable to parse response from OpenAI');
    }
  });

const port = process.env.PORT || 8989;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.post('/api/getTweets', async (req, res) => {
    const { query } = req.body;
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&tweet.fields=created_at,author_id&max_results=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        });

        const tweets = response.data.data;
        res.json(tweets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

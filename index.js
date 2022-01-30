const axios = require('axios').default;
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post('/getUserStories', async (req, response) => {
    if (req.body.login && req.body.token) {
        try {
            const res1 = await axios.get(`https://www.instagram.com/stories/${req.body.login}/`)

            const html = res1.data
            const posStart = html.indexOf('{"StoriesPage":')
            const posEnd = html.substring(posStart).indexOf('}}]}') + posStart + 4

            console.warn(html.substring(posStart, posEnd));

            const userID = JSON.parse(html.substring(posStart, posEnd)).StoriesPage[0].user.id;

            axios.defaults.headers['Cookie'] = req.body.token
            axios.defaults.headers['x-ig-app-id'] = '152431142231154'

            const res2 = await axios.get(`https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${userID}`)

            if (typeof res2.data !== 'object')
                response.status(412).send('412 Precondition Failed')
            else
                response.send(res2.data)
        } catch (e) {
            console.error(e);
            response.status(500).send('500 Internal Server Error')
        }
    } else
        response.status(412).send('412 Precondition Failed')
});

app.listen(PORT, () => {
    console.log(`Server start at ${PORT}!`)
})
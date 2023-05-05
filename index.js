const axios = require('axios').default
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.post('/getUserStories', async (req, response) => {
    if (req.body.login && req.body.token) {
        try {
            axios.defaults.headers['Cookie'] = req.body.token
            axios.defaults.headers['x-ig-app-id'] = '936619743392459'

            const res1 = await axios.get(
                `https://www.instagram.com/stories/${req.body.login}/`
            )

            const html = res1.data
            const searchStartStr = '"id":"'
            const searchEndStr = '","'
            const posStart = html.indexOf(searchStartStr)
            const posEnd =
                html.substring(posStart).indexOf(searchEndStr) + posStart

            const userID = html.substring(
                posStart + searchStartStr.length,
                posEnd
            )

            const res2 = await axios.get(
                `https://www.instagram.com/api/v1/feed/reels_media/?reel_ids=${userID}`
            )

            console.log(
                `https://www.instagram.com/api/v1/feed/reels_media/?reel_ids=${userID}`,
                res2.data
            )

            if (typeof res2.data !== 'object')
                response.status(412).send('412 Precondition Failed')
            else response.send(res2.data)
        } catch (e) {
            console.error(e.message)
            response.status(500).send('500 Internal Server Error')
        }
    } else response.status(412).send('412 Precondition Failed')
})

app.listen(PORT, () => {
    console.log(`Server start at ${PORT}!`)
})

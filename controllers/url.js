const shortid = require('shortid')
const URL = require('../models/url')
async function handleGenerateNewShortURL(req, res) {
    const body = req.body; // Validate the request body to ensure a URL is provided
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortID = shortid();
// Create a new entry in the database with the short ID and the original URL
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.render("home",{
        id: shortID
    })
}
// To handle retrieving analytics for a specific short URL
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId }) // Find URL entry in the db based on short ID
    return res.json({ // Return total no of clicks and visit history as response.
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics}

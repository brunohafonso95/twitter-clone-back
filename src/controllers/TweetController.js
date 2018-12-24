const Tweet = require('../models/Tweet')

module.exports = {
    async index(req, res) {
        const tweets = await Tweet.find({}).sort('-createdAt')
        return res.json(tweets)
    },
    async store(req, res) {
        const tweet = await Tweet.create(req.body)

        // imitndo um evento para que o mesmo possa ser capiturado por todos conectados
        req.io.emit('tweet', tweet)
        return res.json(tweet)
    }
}
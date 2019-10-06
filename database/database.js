var mongoose = require('mongoose')
module.exports = {
    user: mongoose.model('user', mongoose.Schema({
        local: {
            email: String,
            password: String
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String,
            displayName: String,
            data: Array,
            connect: Array
        },
        twitter: {
            id: String,
            token: String,
            displayName: String,
            username: String
        },
        google: {
            id: String,
            token: String,
            email: String,
            name: String
        },
        rule_token: String,
        publish: {
            facebook_post: String,
            google_post: String,
            website_post: String,
            zalo_post: String,
            instagram_post: String,
            adwords: String
        },
        setting: {
            facebook: {
                connect: Array
            }
        },
        dashboard: Object


    })),
    post: mongoose.model('post', mongoose.Schema({
        modifyDate: Date,
        name: String,
        images: Array,
        description: String,
        url: String,
    })),
    product: mongoose.model('product', mongoose.Schema({
        modifyDate: Date,
        name: String,
        images: Array,
        price: String,
        url: String
    })),
    linking: mongoose.model('linking', mongoose.Schema({
        Object: Object,
        pointId: String
    })),
    attribute: mongoose.model('attribute', mongoose.Schema({
        name: String,
        type: String
    })),
    information: mongoose.model('information', mongoose.Schema({
        modifyDate: Date,
        delta: Object,
        name: String,
        type: String,
        productId: String
    })),
    content: mongoose.model('content', mongoose.Schema({
        modifyDate: Date,
        delta: Object,
        name: String,
        type: String,
        postId: String
    })),
    hashtag: mongoose.model('hashtag', mongoose.Schema({
        name: String,
        type: String
    }))
}

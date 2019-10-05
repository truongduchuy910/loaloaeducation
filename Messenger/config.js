var views = {
    buttons: require('./views/buttons'),
    menu: require('./views/menu'),
    profile: require('./views/profile')
}
console.log(process.config.url)
module.exports = {
    PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN
}
//views.profile.persistent()
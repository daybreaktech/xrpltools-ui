import router from './router'

router.beforeEach(async(to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    console.log("To: " + to);
    console.log("From: " + from);
})

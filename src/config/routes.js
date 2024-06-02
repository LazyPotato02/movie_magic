const {Router} = require('express')
const {home, details, search} = require("../controllers/catalog");
const {about} = require("../controllers/about");
const {createGet,createPost} = require("../controllers/movie");
const {notFound} = require("../controllers/404");
const {createGet:createCastGet,createPost:createCastPost} = require('../controllers/cast')
const router = Router()

router.get('/',home);
router.get('/about',about);
router.get('/create/movie',createGet)
router.get('/create/cast',createCastGet)
router.get('/details/:id',details);
router.get('/search',search)
router.get('*',notFound)
router.post('/create/movie', createPost)
router.post('/create/cast',createCastPost )
// Add routes

module.exports = {
    router,
}
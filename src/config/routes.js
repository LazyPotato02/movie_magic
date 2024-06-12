const {Router} = require('express')
const {home, details, search} = require("../controllers/catalog");
const {about} = require("../controllers/about");
const {createGet,createPost} = require("../controllers/movie");
const {notFound} = require("../controllers/404");
const {createGet:createCastGet,createPost:createCastPost} = require('../controllers/cast')
const {attachGet, attachPost} = require("../controllers/attach");
const {registerGet, registerPost, loginGet, loginPost, logout} = require("../controllers/user");
const router = Router()

router.get('/',home);

router.get('/about',about);

router.get('/create/movie',createGet)
router.get('/create/cast',createCastGet)

router.get('/details/:id',details);

router.get('/attach/:id',attachGet);
router.post('/attach/:id',attachPost);

router.get('/search',search)
router.post('/create/movie', createPost)
router.post('/create/cast',createCastPost )

router.get('/register',registerGet)
router.post('/register',registerPost)

router.get('/login',loginGet)
router.post('/login',loginPost)


router.get('/logout',logout)




router.get('*',notFound)



module.exports = {
    router,
}
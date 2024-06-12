const {register, login} = require("../services/userService");
const {createToken} = require("../services/token");
module.exports = {
    registerGet: (req, res) => {
        res.render('register')
    },
    registerPost: async (req, res) => {
        const {email, password, repass} = req.body

        try {
            if (!email || !password) {
                throw new Error('All fields are required');
            }
            if (password !== repass) {
                throw new Error('Passwords don\'t match');
            }
            const user = await register(email, password);
            const token = createToken(user);
            res.cookie('token', token);
            res.cookie('asd','asd')
            res.redirect('/')
        } catch (err) {
            console.log(err)
            res.render('register', {data: {email}, error: err.message});
            return;
        }
    },
    loginGet: (req, res) => {
        res.render('login')
    },
    loginPost: async (req, res) => {
        const {email, pass} = req.body

        try {
            if (!email || !pass) {
                throw new Error('All fields are required');
            }

            const user = await login(email, pass);
            const token = createToken(user);
            res.cookie('token', token, {httpOnly: true})

            res.redirect('/')
        } catch (err) {
            console.log(err)
            res.render('login', {data: {email}, error: err.message});
            return;
        }
    },
    logout: (req,res) =>{
        res.clearCookie('token')
        res.redirect('/')

    }
}
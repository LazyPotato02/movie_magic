const {createCast} = require("../services/cast");
module.exports = {
    createGet:(req,res)=>{
        res.render('cast-create')
    },
    createPost: async (req,res) =>{
        const errors = {
            name : !req.body.name,
            age :!req.body.age,
            born : !req.body.born,
            nameInMovie : !req.body.nameInMovie,
            imageURL : !req.body.imageURL,
            movie : !req.body.movie,
        }
        if (Object.values(errors).some(e => e)) {
            res.render('cast-create', {cast: req.body, errors})
            return
        }
        const result = await createCast(req.body)

        res.redirect('/')
    }
}
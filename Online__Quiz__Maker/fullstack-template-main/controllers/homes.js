const Quiz = require("../models/Zipho");

module.exports = {
    getHome: async (req, res) =>{
        try{
            const home = await Quiz.find({user: req.user.id});
            res.render("home.ejs", {home: home, user: req.user});
        } catch (err){
            console.log(err);
        }
    },
    getProHome: async (req, res) =>{
        try{
            const home = await Quiz.findById(req.params.id);
            res.render("home.ejs", {home: home, user: req.user});
        } catch (err){
            console.log(err);
        }
    },
    createPost: async (req, res) =>{
        try{
            const quiz = await Quiz.create({
                title: req.body.title,
                questions: [
                    {
                        text: req.body.question,
                        options: [
                            { text: req.body.answer1, isCorrect: req.body.answer === 'answer1' },
                            { text: req.body.answer2, isCorrect: req.body.answer === 'answer2' },
                            { text: req.body.answer3, isCorrect: req.body.answer === 'answer3' },
                        ]
                    }
                ]
            })
            console.log("Post has been added!");
            res.redirect("/home");
        }
        catch (err){
            console.log(err);
            res.redirect("/create ");
        }
    }
}
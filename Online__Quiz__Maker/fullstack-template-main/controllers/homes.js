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
    },
    takeQuiz: async (req, res) => {
        try {
            const quiz = await Quiz.findById(req.params.id);
            if (!quiz) {
                console.error("Quiz not found");
                return res.redirect('/');
            }
            res.render('takeQ.ejs', { quiz: quiz, user: req.user });
        } catch (err) {
            console.error(err);
            res.redirect('/');
        }
    },
    submitQuiz: async (req, res) =>{
        try{
            const quiz = await Quiz.findById(req.params.id).populate('questions.options');
            // req.body will contain the submitted answers
            // You'll need to implement the logic to check the answers
            // and calculate the score
            const score = calculateScore(quiz, req.body);
            res.render('result', { score: score });
        } catch (err){
            console.error(err);
            res.redirect('/take')
        }
    }
}
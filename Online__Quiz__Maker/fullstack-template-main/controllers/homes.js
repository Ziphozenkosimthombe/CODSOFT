const Quiz = require("../models/Zipho");

module.exports = {
    getIndexCreate: async (req, res) => {
        try {
          const quiz = await Quiz.find({ user: req.user.id });
          res.render("createQ.ejs", { quiz: quiz, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },
    getProHome: async (req, res) =>{
        try{
            const quiz = await Quiz.findById(req.params.id);
            res.render("home.ejs", {quiz: quiz, user: req.user});
        } catch (err){
            console.log(err);
            res.redirect("/");
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
                ],
                user: req.user.id
            })
            console.log("Post has been added!");
            res.redirect("/createQ");
        }
        catch (err){
            console.log(err);
            res.redirect("/create ");
        }
    },
    getIndexTake: async (req, res) => {
        try {
          const quiz = await Quiz.find({ user: req.user.id });
          res.render('takeQ.ejs', { quiz: quiz, user: req.user});
          console.log(quiz)
      } catch (err) {
          console.error(err);
          res.redirect('/');
      }
    },
    submitQuiz: async (req, res) => {
        try {
            const quizId = req.body.quizId; // Retrieve quiz ID from req.body
            const quiz = await Quiz.findById(quizId);

            function calculateScore(quiz, answers) {
                let score = 0;
                for (let i = 0; i < quiz.questions.length; i++) {
                    const correctOption = quiz.questions[i].options.find(option => option.isCorrect);
                    if (correctOption && correctOption.text === answers[`answer${i}`]) {
                        score++;
                    }
                }
                return score;
            }

            const score = calculateScore(quiz, req.body);
            quiz.scores.push({
                user: req.user.id,
                value: score
            });
            await quiz.save();
            res.render('result', { score: score });
        } catch (err) {
            console.error(err);
            res.redirect('/take');
        }
    }
    
}
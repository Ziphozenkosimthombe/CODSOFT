const Quiz = require('../models/Quiz')

module.exports = {
    getIndex: async (req,res)=>{
        try{
            const quiz = await Quiz.find()
            res.render('createQ')
        }
        catch(err){
            console.log(err)
        }
        
    },
    api: async (req,res)=>{
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
            console.log(quiz)
            res.redirect('/')
        }
        catch(err){
            console.log(err)
        }
        
    }
        
}

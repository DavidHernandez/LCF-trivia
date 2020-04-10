const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const Trivia = require('./Models/Trivia')

const trivia = new Trivia()
trivia.addQuestion("Apocalipsis por epidemia")
trivia.addQuestion("Apocalipsis nuclear")
trivia.addQuestion("Apocalipsis por guerra")
trivia.addQuestion("Apocalipsis por desastre natural")
trivia.addQuestion("Apocalipsis por invasion alienigena")
trivia.addQuestion("Apocalipsis por causas indeterminadas")
trivia.addQuestion("Apocalipsis por cambio climatico")
trivia.addQuestion("Apocalipsis por causas sobrenaturales")

app.use(cors())
app.use(express.json())

function isAdmin(req) {
    const json = req.body
    const { user } = json

    if (!trivia.isAdmin(user.user, user.pass)) {
        throw new Error('User is not admin')
    }
}

function authenticate(req) {
    const json = req.body
    const { user } = json
    if (trivia.isAdmin(user.user, user.pass)) {
        return
    }

    if (!trivia.authenticate(user.user, user.pass)) {
        throw new Error('Wrong username or password.')
    }
}

app.get('/api/trivia', (req, res) => res.send(trivia.toJson()))

// Add Answer
app.post('/api/question/:id', (req, res) => {
    authenticate(req)

    const json = req.body
    const { user, text } = json

    const question_id = req.params.id
    const question = trivia.getQuestion(question_id)

    question.addAnswer(user.user, text)

    res.json(trivia.toJson())
})

// Delete answer
app.delete('/api/question/:id', (req, res) => {
    authenticate(req)

    const json = req.body
    const { answer } = json

    const question_id = req.params.id
    const question = trivia.getQuestion(question_id)

    question.deleteAnswer(answer)

    res.json(trivia.toJson())
})

app.post('/api/login', (req, res) => {
    const json = req.body
    const { user, pass } = json

    if (trivia.loginOrRegister(user, pass)) {
        let isAdmin = trivia.isAdmin(user, pass)
        res.json({ user, pass, isAdmin })
    }
    else {
        throw new Error('Wrong username or password.')
    }
})

// Move to next step of the trivia
app.post('/api/next', (req, res) => {
    isAdmin(req)

    const json = req.body
    const { user } = json

    trivia.nextStep()

    res.json(trivia.toJson())
})

// Approve an answer
app.post('/api/question/:id/approve', (req, res) => {
    isAdmin(req)

    const json = req.body
    const { answer } = json

    const question_id = req.params.id
    const question = trivia.getQuestion(question_id)

    question.approveAnswer(answer)

    res.json(trivia.toJson())
})

// Reject an answer
app.post('/api/question/:id/reject', (req, res) => {
    isAdmin(req)

    const json = req.body
    const { answer } = json

    const question_id = req.params.id
    const question = trivia.getQuestion(question_id)

    question.rejectAnswer(answer)

    res.json(trivia.toJson())
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

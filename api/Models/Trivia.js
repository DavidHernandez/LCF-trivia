const Question = require('./Question')
const Player = require('./Player')

class Trivia {
    constructor() {
        this.questions = []
        this.players = []

        this.currentQuestion = null
    }

    addQuestion(text) {
        const question = new Question(text)

        this.questions.push(question)
    }

    getQuestion(id) {
        this.currentQuestion = id
        return this.questions[id]
    }

    loginOrRegister(user, pass) {
        if (this.userExists(user)) {
            return this.authenticate(user, pass)
        }

        this.register(user, pass)

        return true
    }

    authenticate(user, pass) {
        return this.players.some(player => player.name === user && player.pass === pass)
    }

    register(user, pass) {
        this.players.push(new Player(user, pass))
    }

    userExists(userName) {
        return this.players.some(player => player.name === userName)
    }

    toJson() {
        const { questions, players, currentQuestion } = this

        return {
            currentQuestion,
            questions: questions.map(question => question.toJson()),
            players: players.map(user => user.toJson()),
        }
    }
}

module.exports = Trivia

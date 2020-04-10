const Question = require('./Question')
const Player = require('./Player')

class Trivia {
    constructor() {
        this.questions = []
        this.players = []
    }

    addQuestion(text) {
        const question = new Question(text)

        this.questions.push(question)
    }

    getQuestion(id) {
        return this.questions[id]
    }

    getCurrentQuestion() {
        for (const question of this.questions) {
            if (!question.isDone()) {
                return question
            }
        }

        return null
    }

    nextStep() {
        const question = this.getCurrentQuestion()
        question.next()
        if (question.hasFinished()) {
            question.calculatePoints()

            this.addPointsToPlayers(question.getPoints())
        }
    }

    loginOrRegister(user, pass) {
        if (this.isAdmin(user, pass)) {
            return true
        }
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
        return this.players.some(player => player.name === userName) || userName.toLowerCase() == 'admin'
    }

    isAdmin(user, pass) {
        return user.toLowerCase() === 'admin' && pass === 'ba0dae7267e412c257f9644d79688fd3'
    }

    addPointsToPlayers(points) {
        for (const player in points) {
            const user = this.players.filter(user => user.isEquals(player)).pop()
            user.addPoints(points[player])
        }
    }

    toJson() {
        const { questions, players } = this

        return {
            questions: questions.map(question => question.toJson()),
            players: players.map(user => user.toJson()),
        }
    }
}

module.exports = Trivia

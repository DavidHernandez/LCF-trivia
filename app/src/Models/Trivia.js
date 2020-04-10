import Question from './Question'
import Player from './Player'

export default class Trivia {
    constructor() {
        this.questions = []
        this.players = []

        this.currentQuestion = null
    }

    addQuestion(question) {
        this.questions.push(question)
    }

    addPlayer(player) {
        this.players.push(player)
    }

    getPlayers() {
        return this.players
    }

    start() {
        this.currentQuestion = 0
    }

    nextQuestion() {
        this.currentQuestion++
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestion]
    }

    hasStarted() {
        return this.currentQuestion !== null
    }

    hasEnded() {
        return this.currentQuestion >= this.questions.length - 1
    }

    static fromJson(json) {
        const trivia = new Trivia()
        trivia.currentQuestion = json.currentQuestion

        json.questions.forEach(question => {
            const id = trivia.questions.length
            const item = new Question(id, question.question)

            question.answers.forEach(answer => item.addAnswer(answer.answer, answer.player))

            trivia.addQuestion(item)
        })

        json.players.forEach(player => {
            trivia.addPlayer(new Player(player))
        })

        return trivia
    }
}

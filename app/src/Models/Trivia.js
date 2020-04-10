import Question from './Question'
import Player from './Player'

export default class Trivia {
    constructor() {
        this.questions = []
        this.players = []
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

    getCurrentQuestion() {
        for (const question of this.questions) {
            if (!question.isDone()) {
                return question
            }
        }

        return null
    }

    static fromJson(json) {
        const trivia = new Trivia()

        json.questions.forEach(question => {
            const id = trivia.questions.length
            trivia.addQuestion(Question.fromJson(id, question))
        })

        json.players.forEach(player => {
            trivia.addPlayer(Player.fromJson(player))
        })

        return trivia
    }
}

import Answer from './Answer'
import OtherAnswer from './OtherAnswer'

export default class Question {
    constructor(id, question) {
        this.id = id
        this.question = question
        this.answers = []
        this.otherAnswers = []
        this.state = 'active'
        this.points = {}
    }

    isDone() {
        return this.state === 'done'
    }

    isActive() {
        return this.state === 'active'
    }

    getState() {
        return this.state
    }

    getId() {
        return this.id
    }

    getAnswers() {
        return this.answers
    }

    getOtherAnswers() {
        return this.otherAnswers
    }

    getText() {
        return this.question
    }

    getPoints() {
        return this.points
    }

    addAnswer(text, player) {
        const answer = new Answer(text, player)
        this.answers.push(answer)
    }

    deleteAnswer(answer) {
        const { answers } = this
        const updatedAnswers = answers.filter((currentAnswer => !currentAnswer.isEquals(answer)))

        this.answers = updatedAnswers
    }

    addOtherAnswer(text, player, type) {
        const answer = new OtherAnswer(text, player, type)
        this.otherAnswers.push(answer)
    }

    deleteOtherAnswer(answer) {
        const { otherAnswers } = this
        const updatedAnswers = otherAnswers.filter((currentAnswer => !currentAnswer.isEquals(answer)))

        this.otherAnswers = updatedAnswers
    }

    static fromJson(id, json) {
        const question = new Question(id, json.question)
        question.state = json.state
        question.points = json.points

        json.answers.forEach(answer => question.answers.push(Answer.fromJson(answer)))
        json.otherAnswers.forEach(answer => question.otherAnswers.push(OtherAnswer.fromJson(answer)))

        return question
    }
}

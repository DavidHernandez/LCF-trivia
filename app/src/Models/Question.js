import Answer from './Answer'

export default class Question {
    constructor(id, question) {
        this.id = id
        this.question = question
        this.answers = []
    }

    getId() {
        return this.id
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

    getAnswers() {
        return this.answers
    }

    getText() {
        return this.question
    }
}

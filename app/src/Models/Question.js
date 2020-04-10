import Answer from './Answer'

export default class Question {
    constructor(id, question) {
        this.id = id
        this.question = question
        this.answers = []
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

    static fromJson(id, json) {
        const question = new Question(id, json.question)
        question.state = json.state
        question.points = json.points

        json.answers.forEach(answer => question.answers.push(Answer.fromJson(answer)))

        return question
    }
}

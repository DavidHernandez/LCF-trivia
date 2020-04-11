const Answer = require('./Answer')
const OtherAnswer = require('./OtherAnswer')

class Question {
    constructor(question) {
        this.question = question
        this.answers = []
        this.otherAnswers = []
        this.state = 'active'
        this.points = {}
    }

    next() {
        if (this.state == 'active') {
            this.state = 'results'
        }
        else {
            this.state = 'done'
        }
    }

    hasFinished() {
        return this.state === 'results'
    }

    isDone() {
        return this.state === 'done'
    }

    getPoints() {
        return this.points
    }

    addAnswer(player, text) {
        const answer = new Answer(player, text)
        this.answers.push(answer)
    }

    approveAnswer(answer) {
        const { answers } = this
        const selectedAnswer = answers.filter((currentAnswer => currentAnswer.isEquals(answer))).pop()

        selectedAnswer.approve()
    }

    rejectAnswer(answer) {
        const { answers } = this
        const selectedAnswer = answers.filter((currentAnswer => currentAnswer.isEquals(answer))).pop()

        selectedAnswer.reject()
    }

    deleteAnswer(answer) {
        const { answers } = this
        const updatedAnswers = answers.filter((currentAnswer => !currentAnswer.isEquals(answer)))

        this.answers = updatedAnswers
    }

    addOtherAnswer(player, text, type) {
        const answer = new OtherAnswer(player, text, type)
        this.otherAnswers.push(answer)
    }

    approveOtherAnswer(answer) {
        const { otherAnswers } = this
        const selectedAnswer = otherAnswers.filter((currentAnswer => currentAnswer.isEquals(answer))).pop()

        selectedAnswer.approve()
    }

    rejectOtherAnswer(answer) {
        const { otherAnswers } = this
        const selectedAnswer = otherAnswers.filter((currentAnswer => currentAnswer.isEquals(answer))).pop()

        selectedAnswer.reject()
    }

    deleteOtherAnswer(answer) {
        const { otherAnswers } = this
        const updatedAnswers = otherAnswers.filter((currentAnswer => !currentAnswer.isEquals(answer)))

        this.otherAnswers = updatedAnswers
    }

    calculatePoints() {
        const { answers, otherAnswers } = this
        if (answers == []) {
            return
        }

        this.points = {}
        answers.forEach(answer => {
            if (answer.isValid) {
                if (this.points[answer.player] === undefined) {
                    this.points[answer.player] = 0
                }

                this.points[answer.player] += 3
            }
        })
        otherAnswers.forEach(answer => {
            if (answer.isValid) {
                if (this.points[answer.player] === undefined) {
                    this.points[answer.player] = 0
                }

                this.points[answer.player] += 1
            }
        })
    }

    toJson() {
        const { question, answers, otherAnswers, state, points } = this

        return {
            question,
            answers: answers.map(answer => answer.toJson()),
            otherAnswers: otherAnswers.map(answer => answer.toJson()),
            state,
            points,
        }
    }
}

module.exports = Question

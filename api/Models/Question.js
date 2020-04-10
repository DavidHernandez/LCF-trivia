const Answer = require('./Answer')

class Question {
    constructor(question) {
        this.question = question
        this.answers = []
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

    calculatePoints() {
        const { answers } = this
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
    }

    toJson() {
        const { question, answers, state, points } = this

        return {
            question,
            answers: answers.map(answer => answer.toJson()),
            state,
            points,
        }
    }
}

module.exports = Question

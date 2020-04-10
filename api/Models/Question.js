const Answer = require('./Answer')

class Question {
    constructor(question) {
        this.question = question
        this.answers = []
    }

    addAnswer(user, text) {
        const answer = new Answer(user, text)
        this.answers.push(answer)
    }

    deleteAnswer(answer) {
        const { answers } = this
        const updatedAnswers = answers.filter((currentAnswer => !currentAnswer.isEquals(answer)))

        this.answers = updatedAnswers
    }

    toJson() {
        const { question, answers } = this

        return {
            question,
            answers: answers.map(answer => answer.toJson()),
        }
    }
}

module.exports = Question

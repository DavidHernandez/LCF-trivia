class Answer {
    constructor(user, answer) {
        this.user = user
        this.answer = answer
    }

    getText() {
        return this.answer
    }

    isEquals(answer) {
        return this.answer === answer.answer && this.player === answer.player
    }

    toJson() {
        return {
            answer: this.answer,
            player: this.user.user,
        }
    }
}

module.exports = Answer

class Answer {
    constructor(player, answer) {
        this.player = player
        this.answer = answer
        this.isValid = null
    }

    approve() {
        this.isValid = true
    }

    reject() {
        this.isValid = false
    }

    isValid() {
        return this.isValid
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
            player: this.player,
            isValid: this.isValid,
        }
    }
}

module.exports = Answer

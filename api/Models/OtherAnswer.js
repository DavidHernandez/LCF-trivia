class OtherAnswer {
    constructor(player, answer, type) {
        this.player = player
        this.answer = answer
        this.type = type
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
            type: this.type,
            isValid: this.isValid,
        }
    }
}

module.exports = OtherAnswer


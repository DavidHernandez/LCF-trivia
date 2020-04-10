export default class Answer {
    constructor(answer, player) {
        this.answer = answer
        this.player = player
        this.isValid = null
    }

    getText() {
        return this.answer
    }

    getAuthor() {
        return this.player
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

    isEquals(answer) {
        return this.answer === answer.answer && this.player === answer.player
    }

    static fromJson(json) {
        const answer = new Answer(json.answer, json.player)
        answer.isValid = json.isValid

        return answer
    }
}

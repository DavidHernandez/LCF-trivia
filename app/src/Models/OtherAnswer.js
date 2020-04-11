export default class Answer {
    constructor(answer, player, type) {
        this.answer = answer
        this.player = player
        this.type = type
        this.isValid = null
    }

    getText() {
        return this.answer
    }

    getType() {
        return this.type
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
        const answer = new Answer(json.answer, json.player, json.type)
        answer.isValid = json.isValid

        return answer
    }
}

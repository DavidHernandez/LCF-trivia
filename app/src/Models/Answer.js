export default class Answer {
    constructor(answer, player) {
        this.answer = answer
        this.player = player
    }

    getText() {
        return this.answer
    }

    getAuthor() {
        return this.player
    }

    isEquals(answer) {
        return this.answer === answer.answer && this.player === answer.player
    }
}

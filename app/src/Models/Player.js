export default class Player {
    constructor(name) {
        this.name = name
        this.points = 0
    }

    getName() {
        return this.name
    }

    getPoints() {
        return this.points
    }

    static fromJson(json) {
        const player = new Player(json.name)
        player.points = json.points

        return player
    }
}

class Player {
    constructor(name, pass) {
        this.name = name
        this.pass = pass
        this.points = 0
    }

    addPoints(points) {
        this.points += points
    }

    isEquals(player) {
        return this.name == player
    }

    toJson() {
        const { name, points } = this
        return { name, points }
    }
}

module.exports = Player

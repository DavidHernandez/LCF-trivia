class Player {
    constructor(name, pass) {
        this.name = name
        this.pass = pass
    }

    toJson() {
        return this.name
    }
}

module.exports = Player

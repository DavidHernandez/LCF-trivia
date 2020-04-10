import React from 'react'

export default class Players extends React.Component {
    render() {
        const players = this.props.players.map(player => this.renderPlayer(player))
        return (
            <>
                <h3>Jugadores</h3>
                <ul>
                    {players}
                </ul>
            </>
        )
    }

    renderPlayer(player) {
        return (
            <li>{player.getName()}</li>
        )
    }
}

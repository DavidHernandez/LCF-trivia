import React from 'react'

export default class Players extends React.Component {
    render() {
        const players = this.props.players.map(player => this.renderPlayer(player))
        return (
            <div className="players">
                <h3>Jugadores actuales:</h3>
                <table className="ui celled table">
                    <thead><tr><td>Jugador</td></tr></thead>
                    <tbody>
                        {players}
                    </tbody>
                </table>
            </div>
        )
    }

    renderPlayer(player) {
        return (<tr><td><i className="user icon" />{player.getName()}</td></tr>)
    }
}

import React from 'react'

export default class Page extends React.Component {
    render() {
        return (
            <>
                <h1>Leyendo Ciencia Ficcion</h1>
                <h2>Especial Podcast Apocaliptico</h2>
                {this.props.children}
            </>
        )
    }
}

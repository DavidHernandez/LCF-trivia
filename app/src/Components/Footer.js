import React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <a href="https://www.youtube.com/watch?v=qC0AcBOUE58"><i className="youtube icon"></i>Emisión en directo</a>
                <a href="/"><i className="phone icon"></i>Llamada</a>
                <a href="https://www.ivoox.com/podcast-podcast-leyendo-ciencia-ficcion_sq_f1249389_1.html"><i className="podcast icon"></i>Llamada</a>
                <a href="https://twitter.com/leyendoscifi"><i className="twitter icon"></i>Twitter</a>
                <a href="https://www.facebook.com/leyendocienciaficcion/"><i className="facebook icon"></i>Facebook</a>
                <a href="mailto://leyendocienciaficcion@gmail.com"><i className="envelope icon"></i>E-mail</a>
            </footer>
        )
    }
}

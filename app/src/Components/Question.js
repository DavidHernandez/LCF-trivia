import React from 'react'
import Api from '../Api'

export default class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            question: props.question,
            answer: '',
            otherAnswer: '',
            selection: 'Pelicula',
        }
    }

    saveAnswer(e) {
        e.preventDefault()
        const { question, answer } = this.state

        Api.addAnswer(this.props.user, question.getId(), answer, () => {
            question.addAnswer(answer, this.props.user.user)
            this.setState({ question, answer: '' })
        })
    }

    saveOtherAnswer(e) {
        e.preventDefault()
        const { question, otherAnswer, selection } = this.state

        Api.addOtherAnswer(this.props.user, question.getId(), otherAnswer, selection, () => {
            question.addOtherAnswer(otherAnswer, this.props.user.user, selection)
            this.setState({ question, otherAnswer: '' })
        })
    }

    deleteAnswer(answer) {
        const { question } = this.state
        Api.deleteAnswer(this.props.user, question.getId(), answer, () => {
            question.deleteAnswer(answer)
            this.setState({ question })
        })
    }

    deleteOtherAnswer(answer) {
        const { question } = this.state
        Api.deleteOtherAnswer(this.props.user, question.getId(), answer, () => {
            question.deleteOtherAnswer(answer)
            this.setState({ question })
        })
    }

    render() {
        const { question } = this.state

        if (question.isActive()) {
            return this.renderActiveQuestion()
        }
        return this.renderResults()
    }

    renderResults() {
        const { question } = this.state

        const playerPoints = question.getPoints()
        const points = []
        for (const player in playerPoints) {
            points.push((<li className="item">{player}: {playerPoints[player]}</li>))
        }

        return (
            <React.Fragment key={"question-" + question.getId()}>
                <h1>Resultados: {question.getText()}</h1>

                <h3>Puntos:</h3>
                <ul className="ui bulleted list">{points}</ul>
            </React.Fragment>
        )
    }

    renderActiveQuestion() {
        const { question, answer, otherAnswer } = this.state
        const answers = question.getAnswers()
        const otherAnswers = question.getOtherAnswers()

        const answerList = answers.map(answer => this.renderAnswer(answer))
        const otherAnswerList = otherAnswers.map(answer => this.renderOtherAnswer(answer))

        return (
            <div className="question" key={"question-" + question.getId()}>
                <h1>Obras relacionadas con...</h1>
                <h2>{question.getText()}</h2>
                <h3>Novelas envíadas:</h3>
                <ul className="ui bulleted list">{ answerList }</ul>
                <h3>Otras obras envíadas:</h3>
                <ul className="ui bulleted list">{ otherAnswerList }</ul>
                <h3>Novelas:</h3>
                <form className="ui form" onSubmit={(e) => this.saveAnswer(e)}>
                    <div className="field">
                        <input
                            key="answer"
                            id="answer"
                            name="answer"
                            type="text"
                            defaultValue={answer}
                            value={answer}
                            onChange={(e) => this.setState({answer: e.target.value})}
                            placeholder="Envia tu respuesta"
                        />
                    </div>
                    <input className="ui fluid large submit lcfcolor button" key="send" type="submit" value="Enviar" />
                </form>
                <h3>Otras obras:</h3>
                <form className="ui form" onSubmit={(e) => this.saveOtherAnswer(e)}>
                    <div className="field">
                        <input
                            key="other-answer"
                            id="other-answer"
                            name="other-answer"
                            type="text"
                            defaultValue={otherAnswer}
                            value={otherAnswer}
                            onChange={(e) => this.setState({otherAnswer: e.target.value})}
                            placeholder="Envia tu respuesta"
                        />
                    </div>
                    <div className="field">
                        <select
                            id="other-answers"
                            value={otherAnswer}
                            defaultValue={otherAnswer}
                            onChange={(e) => this.setState({ selection: e.target.value })}
                        >
                            <option value="Pelicula">Pelicula</option>
                            <option value="Comic">Comic</option>
                            <option value="Juego">Juego</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>
                    <input className="ui fluid large submit lcfcolor button" key="send" type="submit" value="Enviar" />
                </form>
            </div>
        )
    }

    renderAnswer(answer) {
        let deleteLink = (<></>)
        if (answer.getAuthor() === this.props.user.user) {
            deleteLink = (<input className="ui red button" type="button" id="delete" name="delete" value="Delete" onClick={(e) => this.deleteAnswer(answer)} />)
        }
        return (
            <li className="item"><strong>{ answer.getText() }</strong> - { answer.getAuthor() } {deleteLink}</li>
        )
    }

    renderOtherAnswer(answer) {
        let deleteLink = (<></>)
        if (answer.getAuthor() === this.props.user.user) {
            deleteLink = (<input className="ui red button" type="button" id="delete" name="delete" value="Delete" onClick={(e) => this.deleteOtherAnswer(answer)} />)
        }
        return (
            <li className="item"><strong>{ answer.getText() } - { answer.getType() }</strong> - { answer.getAuthor() } {deleteLink}</li>
        )
    }
}

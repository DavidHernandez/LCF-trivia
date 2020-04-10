import React from 'react'
import Api from '../Api'

export default class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            question: props.question,
            answer: '',
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

    deleteAnswer(answer) {
        const { question } = this.state
        Api.deleteAnswer(this.props.user, question.getId(), answer, () => {
            question.deleteAnswer(answer)
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
        const { question, answer } = this.state
        const answers = question.getAnswers()

        const answerList = answers.map(answer => this.renderAnswer(answer))

        return (
            <div className="question" key={"question-" + question.getId()}>
                <h1>Obras relacionadas con...</h1>
                <h2>{question.getText()}</h2>
                <h3>Respuestas:</h3>
                <ul className="ui bulleted list">{ answerList }</ul>
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
}

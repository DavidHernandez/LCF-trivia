import React from 'react'
import Header from './Header'
import Footer from './Footer'
import LoginForm from './LoginForm'
import Api from '../Api'
import Trivia from '../Models/Trivia'

export default class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trivia: props.trivia
        }
    }

    componentDidMount() {
       this.interval = setInterval(() => this.loadTrivia(), 10000);
    }

    componentWillUnmount() {
       clearInterval(this.interval);
    }

    loadTrivia() {
        Api.loadTrivia(trivia => {
            this.setState({ trivia })
        })
    }

    approveAnswer(answer) {
        const { trivia } = this.state
        const question = trivia.getCurrentQuestion()

        Api.approveAnswer(this.props.user, question.getId(), answer, () => {
            answer.approve()
            this.setState({ trivia })
        })
    }

    rejectAnswer(answer) {
        const { trivia } = this.state
        const question = trivia.getCurrentQuestion()

        Api.rejectAnswer(this.props.user, question.getId(), answer, () => {
            answer.reject()
            this.setState({ trivia })
        })
    }

    deleteAnswer(answer) {
        const { trivia } = this.state
        const question = trivia.getCurrentQuestion()

        Api.deleteAnswer(this.props.user, question.getId(), answer, () => {
            question.deleteAnswer(answer)
            this.setState({ trivia })
        })
    }

    approveOtherAnswer(answer) {
        const { trivia } = this.state
        const question = trivia.getCurrentQuestion()

        Api.approveOtherAnswer(this.props.user, question.getId(), answer, () => {
            answer.approve()
            this.setState({ trivia })
        })
    }

    rejectOtherAnswer(answer) {
        const { trivia } = this.state
        const question = trivia.getCurrentQuestion()

        Api.rejectOtherAnswer(this.props.user, question.getId(), answer, () => {
            answer.reject()
            this.setState({ trivia })
        })
    }

    deleteOtherAnswer(answer) {
        const { trivia } = this.state
        const question = trivia.getCurrentQuestion()

        Api.deleteOtherAnswer(this.props.user, question.getId(), answer, () => {
            question.deleteOtherAnswer(answer)
            this.setState({ trivia })
        })
    }

    next() {
        Api.nextStep(this.props.user, (data) => {
            const trivia = Trivia.fromJson(data)
            this.setState({ trivia })
        })
    }

    render() {
        const { trivia } = this.state

        const question = trivia.getCurrentQuestion()
        let rightContent = (<></>)
        if (question !== null) {
            rightContent = this.renderQuestion(question)
        }
        return (
            <>
                <Header />
                <div className="ui two column stackable grid container main-content">
                    <div className="column">
                        <h1>Clasificación</h1>
                        <table className="ui celled table">
                            <thead><tr><td>Jugador</td><td>Puntuación</td></tr></thead>
                            <tbody>
                                {this.renderClassification()}
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        { rightContent }
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    renderQuestion(question) {
        if (question.isActive()) {
            return this.renderActiveQuestion(question)
        }
        return this.renderQuestionResults(question)
    }

    renderActiveQuestion(question) {
        const answers = question.getAnswers().map(answer => this.renderActiveAnswer(answer))
        const otherAnswers = question.getOtherAnswers().map(answer => this.renderActiveOtherAnswer(answer))

        return(
            <>
                <h2>Pregunta actual: {question.getText()}</h2>
                <h3>Novelas:</h3>
                <ul>{answers}</ul>
                <h3>Otras obras:</h3>
                <ul>{otherAnswers}</ul>
                <button className="ui lcfcolor right labeled icon button" onClick={(e) => this.next()}>
                    <i class="right arrow icon"></i>
                    Siguiente
                </button>
            </>
        )
    }

    renderActiveAnswer(answer) {
        return (
            <li>
                Respuesta: { answer.getText() }
                <button className="ui icon blue button" onClick={(e) => this.approveAnswer(answer)}>
                    <i class="heart icon"></i>
                </button>
                <button className="ui icon grey button" onClick={(e) => this.rejectAnswer(answer)}>
                    <i class="thumbs down icon"></i>
                </button>
                <button className="ui icon red button" onClick={(e) => this.deleteAnswer(answer)}>
                    <i class="trash alternate icon"></i>
                </button>
            </li>
        )
    }

    renderActiveOtherAnswer(answer) {
        return (
            <li>
                Respuesta: { answer.getText() } - { answer.getType() }
                <button className="ui icon blue button" onClick={(e) => this.approveOtherAnswer(answer)}>
                    <i class="heart icon"></i>
                </button>
                <button className="ui icon grey button" onClick={(e) => this.rejectOtherAnswer(answer)}>
                    <i class="thumbs down icon"></i>
                </button>
                <button className="ui icon red button" onClick={(e) => this.deleteOtherAnswer(answer)}>
                    <i class="trash alternate icon"></i>
                </button>
            </li>
        )
    }

    renderQuestionResults(question) {
        const answers = question.getAnswers()
        const otherAnswers = question.getOtherAnswers()

        const answersOutput = []
        for (const answer of answers) {
            if (answer.isValid) {
                answersOutput.push(this.renderAnswer(answer))
            }
        }

        const otherAnswersOutput = []
        for (const answer of otherAnswers) {
            if (answer.isValid) {
                otherAnswersOutput.push(this.renderOtherAnswer(answer))
            }
        }

        const playerPoints = question.getPoints()
        const points = []
        for (const player in playerPoints) {
            points.push((<li>{player}: {playerPoints[player]}</li>))
        }

        return(
            <>
                <h2>Resultados: {question.getText()}</h2>
                <h3>Novelas:</h3>
                <ul>{answersOutput}</ul>

                <h3>Otras obras:</h3>
                <ul>{otherAnswersOutput}</ul>

                <h3>Puntos:</h3>
                <ul>{points}</ul>

                <button className="ui lcfcolor right labeled icon button" onClick={(e) => this.next()}>
                    <i class="right arrow icon"></i>
                    Siguiente
                </button>
            </>
        )
    }

    renderAnswer(answer) {
        return (
            <li>
                Respuesta: { answer.getText() } - por { answer.getAuthor() }
            </li>
        )
    }

    renderOtherAnswer(answer) {
        return (
            <li>
                Respuesta: { answer.getText() } - { answer.getType() } - { answer.getAuthor() }
            </li>
        )
    }

    renderClassification() {
        const { trivia } = this.state
        const players = trivia.getPlayers()

        const sortedPlayers = players.sort((a, b) => a.getPoints() < b.getPoints())
        return sortedPlayers.map(player => (<tr><td><i className="user icon" />{player.getName()}</td><td>{player.getPoints()}</td></tr>))
    }
}

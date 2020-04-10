import React from 'react'
import Question from './Question'
import Page from './Page'
import Players from './Players'
import LoginForm from './LoginForm'
import Trivia from '../Models/Trivia'
import Api from '../Api'

export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            trivia: null,
            answer: '',
            loaded: false,
            user: null,
        }

        this.nextQuestion = () => {
            const { trivia } = this.state
            trivia.nextQuestion()
            this.setState({ trivia })
        }

        this.loginSuccess = (user) => {
            this.setState({ user })
            this.loadTrivia()
        }
    }

    loadTrivia() {
        Api.loadTrivia(trivia => {
            this.setState({ trivia, loaded: true })
        })
    }

    start() {
        const { trivia } = this.state

        trivia.start()

        this.setState({ trivia })
    }

    render() {
        const { trivia, loaded, user } = this.state

        if (user === null) {
            return (<Page><LoginForm onSuccess={this.loginSuccess} /></Page>)
        }

        if (!loaded) {
            return (<Page><p>Loading...</p></Page>)
        }

        const players = (<Players players={trivia.getPlayers()} />)

        if (trivia.hasEnded()) {
            return (
                <Page>
                    {players}
                    <h3>El trivial ha terminado</h3>
                </Page>
            )
        }

        if (trivia.hasStarted()) {
            const question = trivia.getCurrentQuestion()

            return (
                <Page>
                    {players}
                    <Question key={"question-" + question.getId()} user={user} question={question} nextQuestion={this.nextQuestion}/>
                </Page>
            )
        }

        return (
            <Page>
                {players}
                <input type="button" value="Start" onClick={(e) => this.start()} />
            </Page>
        )
    }
}

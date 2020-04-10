import React from 'react'
import Admin from './Admin'
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

        this.loginSuccess = (user) => {
            this.setState({ user })
            this.loadTrivia()
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
            return (<LoginForm onSuccess={this.loginSuccess} />)
        }

        if (!loaded) {
            return (<Page><p>Loading...</p></Page>)
        }

        if (user.isAdmin) {
            clearInterval(this.interval);
            return (
                <Admin trivia={trivia} user={user} />
            )
        }

        const question = trivia.getCurrentQuestion()

        let step = 'results'
        if (question.isActive()) {
            step = 'game'
        }

        return (
            <Page>
                <Players players={trivia.getPlayers()} />
                <Question key={"question-" + question.getId() + step} user={user} question={question} />
            </Page>
        )
    }
}

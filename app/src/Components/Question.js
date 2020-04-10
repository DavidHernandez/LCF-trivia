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

    saveAnswer() {
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
        const { question, answer } = this.state
        const answers = question.getAnswers()

        const answerList = answers.map(answer => this.renderAnswer(answer))

        return (
            <React.Fragment key={"question-" + question.getId()}>
                <h1>{question.getText()}</h1>
                <ul>{answerList}</ul>
                <div>
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
                    <input key="send" type="button" value="Enviar" onClick={(e) => this.saveAnswer()} />
                </div>
                <input key="next" type="button" value="Next" onClick={(e) => this.props.nextQuestion()} />
            </React.Fragment>
        )
    }

    renderAnswer(answer) {
        let deleteLink = (<></>)
        if (answer.getAuthor() === this.props.user.user) {
            deleteLink = (<input type="button" id="delete" name="delete" value="Delete" onClick={(e) => this.deleteAnswer(answer)} />)
        }
        return (
            <li>Respuesta: { answer.getText() } - por: { answer.getAuthor() } {deleteLink}</li>
        )
    }
}

import Trivia from './Models/Trivia'

export default class Api {
    static loadTrivia(callback) {
        fetch('http://localhost:3000/api/trivia')
            .then(response => response.json())
            .then(data => {
                const trivia = Trivia.fromJson(data)
                callback(trivia)
            })
    }

    static nextStep(user, success) {
        fetch('http://localhost:3000/api/next', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static addAnswer(user, questionId, answer, success) {
        fetch('http://localhost:3000/api/question/' + questionId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: answer, user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static addOtherAnswer(user, questionId, answer, type, success) {
        fetch('http://localhost:3000/api/question/' + questionId + '/other-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: answer, user, type })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static approveOtherAnswer(user, questionId, answer, success) {
        fetch('http://localhost:3000/api/question/' + questionId + '/approve/other-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer, user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static rejectOtherAnswer(user, questionId, answer, success) {
        fetch('http://localhost:3000/api/question/' + questionId + '/reject/other-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer, user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static deleteOtherAnswer(user, questionId, answer, success) {
        fetch('http://localhost:3000/api/question/' + questionId + '/other-answer', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer, user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static approveAnswer(user, questionId, answer, success) {
        fetch('http://localhost:3000/api/question/' + questionId + '/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer, user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static rejectAnswer(user, questionId, answer, success) {
        fetch('http://localhost:3000/api/question/' + questionId + '/reject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer, user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static deleteAnswer(user, questionId, answer, success) {
        fetch('http://localhost:3000/api/question/' + questionId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer, user })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success))
    }

    static login(user, pass, success, error) {
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, pass })
        })
        .then(response => Api.validateResponse(response))
        .then(data => Api.handleCallbacks(data, success, error))
    }

    static validateResponse(response) {
        if (response.status === 500) {
            return null
        }
        return response.json()
    }

    static handleCallbacks(data, success, error=()=>{}) {
        if (data === null) {
            error()
        } else {
            success(data)
        }
    }
}

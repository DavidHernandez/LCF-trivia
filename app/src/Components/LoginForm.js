import React from 'react'
import MD5 from 'crypto-js/md5'
import Api from '../Api'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: '',
            pass: '',
            error: null,
        }
    }

    login(e) {
        const { user, pass } = this.state
        e.preventDefault()

        Api.login(user, MD5(pass).toString(), this.props.onSuccess, () => {this.setState({error: 'Wrong username or password.'})})
    }

    render() {
        const { user, pass, error } = this.state

        let errorMessage = (<></>)

        if (error !== null) {
            errorMessage = (<p>{error}</p>)
        }
        return (
            <form onSubmit={(e) => this.login(e)}>
                {errorMessage}
                <input type="text" id="username" name="username" defaultValue={user} value={user} onChange={(e) => this.setState({user: e.target.value})} />
                <input type="password" id="password" name="password" defaultValue={pass} value={pass} onChange={(e) => this.setState({pass: e.target.value})} />
                <input type="submit" value="Login" />
            </form>
        )
    }
}

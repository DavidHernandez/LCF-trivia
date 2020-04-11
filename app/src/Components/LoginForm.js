import React from 'react'
import MD5 from 'crypto-js/md5'
import Api from '../Api'
import Footer from './Footer'

import logo from '../../images/logo.png'

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
            <>
                <div className="ui text container login-box">
                    <img className="ui centered image logo" src={logo} />
                    <h1 className="ui center aligned header">Leyendo Ciencia Ficción</h1>
                    <h2 className="ui center aligned header">Especial Podcast Apocalíptico</h2>
                    <form className="ui form" onSubmit={(e) => this.login(e)}>
                        {errorMessage}
                        <div class="field">
                            <div className="ui left icon input">
                                <i className="user icon" />
                                <input type="text" id="username" name="username" defaultValue={user} value={user} onChange={(e) => this.setState({user: e.target.value})} placeholder="Nombre o alias"/>
                            </div>
                        </div>
                        <div class="field">
                            <div className="ui left icon input">
                                <i className="lock icon" />
                                <input type="password" id="password" name="password" defaultValue={pass} value={pass} onChange={(e) => this.setState({pass: e.target.value})} placeholder="Password"/>
                            </div>
                        </div>
                        <input className="ui fluid large submit lcfcolor button" type="submit" value="Entrar" />
                    </form>
                </div>
                <Footer />
            </>
        )
    }
}

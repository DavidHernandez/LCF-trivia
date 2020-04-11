import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default class Page extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div className="ui two column stackable grid main-content">
                    <div className="ten wide column">
                        <iframe width="100%" height="500" src="https://www.youtube.com/embed/qC0AcBOUE58" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="six wide column">
                        {this.props.children}
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

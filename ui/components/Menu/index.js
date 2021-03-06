import React from "react"
import { Link } from "react-router-dom"
import "./style.css"

export default class Menu extends React.Component {
    constructor ( props ) {
        super( props )

        this.state = {
            show: false
        }
    }

    toggle () {
        this.setState( { show: !this.state.show } )
    }

    render () {
        const { show } = this.state

        return (
            <div className="menu">
                <div className="menu__icon" onClick={ this.toggle.bind( this ) }/>
                {
                    show &&
                    <div className="menu__wrapper">
                        <div className="menu__close" onClick={ this.toggle.bind( this ) }/>
                        <ul>
                            <li><Link to="/" onClick={ this.toggle.bind( this ) }>Home</Link></li>
                            <li><Link to="/reg" onClick={ this.toggle.bind( this ) }>Registration</Link></li>
                            <li><Link to="/auth" onClick={ this.toggle.bind( this ) }>Authorization</Link></li>
                            <li><Link to="/about" onClick={ this.toggle.bind( this ) }>About</Link></li>
                        </ul>
                    </div>
                }
            </div>
        )
    }
}

import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import reducers from "reducers"
import Header from "components/Header"
import Footer from "components/Footer"
import Home from "containers/Home"
import Registration from "containers/Registration"
import Authorization from "containers/Authorization"
import About from "containers/About"
import Task from "containers/Task"
import "bootstrap/dist/css/bootstrap.css"
import "normalize.css"
import "./style.css"

const store = createStore( reducers, {}, applyMiddleware( thunk ) )

const App = () =>
    <Provider store={ store }>
        <Router>
            <Container className="container">
                <Header/>
                <Row>
                    <Col xs={ 12 }>
                        <Route exact path="/" component={ Home }/>
                        <Route path="/reg" component={ Registration }/>
                        <Route path="/auth" component={ Authorization }/>
                        <Route path="/about" component={ About }/>
                        <Route path="/task/:id" component={ Task }/>
                    </Col>
                </Row>
                <Footer/>
            </Container>
        </Router>
    </Provider>

render( <App/>, document.getElementById( "app" ) )

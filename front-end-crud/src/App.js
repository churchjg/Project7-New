import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap'



let url = "https://getcookingwithjon.herokuapp.com/"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: ""
      , name: ''
      , image: ''
      , category: ''
      , tags: ''
      , instructions: ''
      , area: ''
      , video: ''
      , ready: false
    }
  }
  componentDidMount() {
    console.log("hey we are in Homepage")
    fetch(`${url}`)
      .then(res => res.json())
      .then(res => {
        this.data = res
        console.log(res)
        this.setState({
          ready: true
        })
      })
  }

  renderHomepage = () => {
    if (this.state.ready === true) {
      return (
        <Route path="/"
          render={() => <App meal={this.data} />}
          exact
        />
      )
    } else { return <h1>Page Loading....</h1> }
  }
  render() {
    return (
        <main>
            {this.renderHomepage()}
            <Route exact path={`/${this.state.id}`}
                render={(routerProps) => <App info={this.state}
                    {...routerProps}
                />}
            />
        </main>
    )
}
}

export default App;

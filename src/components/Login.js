import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

export default class Login extends React.Component {
  state = {
    isLoginActive: true,
    isSignupActive: false,

  }

  handleLogin = () => {
    this.setState({
      isLoginActive: true,
      isSignupActive: false
    })
  }

  handleSignup = () => {
    this.setState({
      isLoginActive: false,
      isSignupActive: true
    })
  }



  render () {
    return (
      <div>
        <ButtonToolbar>
          <Button bsSize="large" bsStyle="primary" 
            active={this.state.isLoginActive}
            onClick={this.handleLogin}
            >
            Login
          </Button>
          <Button bsSize="large" bsStyle="primary" 
            active={this.state.isSignupActive}
            onClick={this.handleSignup}
            >
            Signup
          </Button>          
        </ButtonToolbar>
      </div>
    )
  }

}
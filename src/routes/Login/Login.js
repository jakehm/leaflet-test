import React from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import styles from './styles.module.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button 
            bsStyle="primary" 
            onClick={this.handleLoginClick}>
              Login
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.handleSignUp}>
              Signup
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
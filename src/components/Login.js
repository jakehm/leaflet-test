import React from 'react'
import { Button, ButtonToolbar, Well } from 'react-bootstrap'
import { Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap'

export default class Login extends React.Component {
	state = {
		isLogin: true,
	}

	goToLogin = () => {
		this.setState({
			isLogin: true
		})
	}

	goToSignup = () => {
		this.setState({
			isLogin: false
		})
	}

  handleSubmit = () => {
    
  }

	render () {
		return (
			<div>
				<ButtonToolbar>
					<Button bsSize="large"
						active={this.state.isLogin}
						onClick={this.goToLogin}
					>
						Login
					</Button>
					<Button bsSize="large" 
						active={!this.state.isLogin}
						onClick={this.goToSignup}
					>
						Signup
					</Button>          
				</ButtonToolbar>
				<Well style={{width: '90%'}}>
					<Form horizontal>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								Username
							</Col>
							<Col sm={10}>
								<FormControl
									type="text"
									placeholder="username"
								/>
							</Col>
						</FormGroup>
						<FormGroup> 
							<Col componentClass={ControlLabel} sm={2}>
								Password
							</Col>
							<Col sm={10}>
								<FormControl
									type="password"
									placeholder="password"
								/>
							</Col>
						</FormGroup>
						{ !this.state.isLogin &&
							<FormGroup> 
								<Col componentClass={ControlLabel} sm={2}>
									Repeat Password
								</Col>
								<Col sm={10}>
									<FormControl
										type="password"
										placeholder="password"
									/>
								</Col>
							</FormGroup>
						}
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type="submit"
                  onClick={this.handleSubmit}
                  >
									{ this.state.isLogin ? 'Login' : 'Sign up' }
								</Button>
							</Col>
						</FormGroup>
					</Form>
				</Well>
			</div>
		)
	}

}

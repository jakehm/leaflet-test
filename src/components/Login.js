import React from 'react'
import { Button, ButtonToolbar, Well } from 'react-bootstrap'
import { Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap'

export default class Login extends React.Component {
	state = {
		isLogin: true,
	}

	handleLogin = () => {
		this.setState({
			isLogin: true
		})
	}

	handleSignup = () => {
		this.setState({
			isLogin: false
		})
	}

	render () {
		return (
			<div>
				<ButtonToolbar>
					<Button bsSize="large"
						active={this.state.isLogin}
						onClick={this.handleLogin}
					>
						Login
					</Button>
					<Button bsSize="large" 
						active={!this.state.isLogin}
						onClick={this.handleSignup}
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
								<Button type="submit">
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

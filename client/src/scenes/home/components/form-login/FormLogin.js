import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import UiUtils from '../../../../utils/UiUtils';
import Session from '../../../../utils/Session';
import logo from '../../../../images/logo-app.svg';
import './FormLogin.css';

class FormLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }

    handleChangeUsername = (event) => {
        this.setState({ userName: event.target.value });
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    handleEnterPress = (ev) => {
        if (ev.key === 'Enter') {
            this.entrarClickHandler();
        }
    }

    entrarClickHandler = () => {

        if (this.state.userName.length === 0 || this.state.password.length === 0) {
            UiUtils.showAlert("Atención", "Verfique usuario y contraseña");
            return;
        }

        this.props.onLogin(this.state.userName,this.state.password);
    }

    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <div className="Absolute-Center is-Responsive">
                        {Session.isMainSite() && <img src={logo} className="img-responsive center-block img-logo-large" alt="Agil Data"/>}
                        <Col>
                            <FormGroup>
                                <FormControl type="text" placeholder="Usuario" value={this.state.userName} onChange={this.handleChangeUsername} onKeyPress={this.handleEnterPress} autoFocus="true" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="Password" placeholder="Contraseña" value={this.state.password} onChange={this.handleChangePassword} onKeyPress={this.handleEnterPress} />
                            </FormGroup>
                            <FormGroup>
                                <Button bsStyle="primary" className="btn-block" onClick={this.entrarClickHandler}>Entrar</Button>
							</FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.onMostrarRecuperarClave} className="btn-block  Btn-wrap">Olvidé mi contraseña</Button>
							</FormGroup>
							{/*
                            <FormGroup className="Br-bt-demo">
                                <br/>
							</FormGroup>
						{ process.env.REACT_APP_FLAVOR != "reseller" &&
							<FormGroup>
								<Button bsStyle="primary" onClick={this.props.onMostrarUserDemo} className="btn-block btn-lg Btn-wrap">Crear usuario demo</Button>
								</FormGroup>}
							*/}
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}

FormLogin.propTypes = {
    onLogin: PropTypes.func,
    onMostrarRecuperarClave:PropTypes.func,
    onMostrarUserDemo:PropTypes.func
}

export default FormLogin;

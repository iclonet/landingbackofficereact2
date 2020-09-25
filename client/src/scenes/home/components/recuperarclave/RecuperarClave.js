import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
//import ReCAPTCHA from 'react-google-recaptcha';
import UiUtils from '../../../../utils/UiUtils';
import ApiClient from '../../../../utils/ApiClient';


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class RecuperarClave extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            //captchaCode: ''
            email: ''
        };
    }

    onDialogEnter = () => {
        this.setState({
            username: '',
            //captchaCode: ''
            email: ''
        });
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value 
        });
    }

    onSendClick = () => {
        if (this.state.username.length === 0 || this.state.email.lengt === 0) {
            UiUtils.showAlert("Error", "Complete todos los campos");
        } else {
            UiUtils.showProgress(true);
            const final = () => {
                UiUtils.showProgress(false);
                this.props.onCerrarRecuperarClave();
            }
            ApiClient.recoverPassword(this.state.username, this.state.email)
                .then(function (res) {
                    final();
                    UiUtils.showAlert("Aviso", "Revise su casilla de correo electrónico, habrá recibido un nuevo mensaje con las instrucciones para cambiar su clave");
                }).catch(function (error) {
                    final();
                    UiUtils.showError(UiUtils.handledError("El usuario ingresado no coincide con el correo"));
                });
        }
    }

    render() {
        return (
            <Modal show={this.props.mostrarRecuperarClave} onHide={this.props.onCerrarRecuperarClave} onEnter={this.onDialogEnter}>
                <Modal.Header closeButton>
                    <Modal.Title>Olvidé mi contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FieldGroup
                        id="nombreusuario"
                        type="text"
                        label="Por favor ingrese su nombre de usuario"
                        placeholder=""
                        value={this.state.username}
                        onChange={this.onUsernameChange} />
                    <FieldGroup
                        id="email"
                        type="email"
                        label="Por favor ingrese su email"
                        placeholder=""
                        value={this.state.email}
                        onChange={this.onEmailChange} />
                    <br />
                    <Modal.Footer>
                        <Button bsStyle="secondary" onClick={this.props.onCerrarRecuperarClave}>Cancelar</Button>
                        <Button bsStyle="primary" onClick={this.onSendClick} >Enviar</Button>
                    </Modal.Footer>


                </Modal.Body>
            </Modal >
        );
    }
}
RecuperarClave.propTypes = {
    mostrarRecuperarClave: PropTypes.bool,
    onCerrarRecuperarClave: PropTypes.func

}
export default RecuperarClave;



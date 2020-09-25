import React, { Component } from 'react';
import { Modal, Button, Checkbox, Alert } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import InputPassword from '../../../../components/input-password/InputPassword';
import InputText from '../../../../components/input-text/InputText';
import Validations from '../../../../utils/Validations';
import Session from '../../../../utils/Session';

class UserDialog extends Component {

    constructor(props) {
        super(props);

        this.state = this.generateState(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isShowing !== nextProps.show) {
            this.setState(this.generateState(nextProps));
        }
    }

    generateState(props) {
        var res = {
            username: { value: '', valid: false },
            password1: { value: '', valid: false },
            password2: { value: '', valid: false },
            email: { value: '', valid: false },
            isAdmin: false,
            isAdminEnabled: true,
            userExists: false,
            showError: false,
            isShowing: false
        };

        if (props.user !== null) {
            res.username = { value: props.user.usuario, valid: true };
            res.email = { value: props.user.email, valid: true };
            res.isAdmin = Validations.userIsAdmin(props.user.roles);
            res.userExists = true;
            res.isAdminEnabled = Session.getUser().userName !== props.user.usuario;
        }

        res.isShowing = props.show;
        return res;
    }

    onUsernameChange = (value) => {
        this.setState({
            username: value
        });
    }

    getUsernameValidation = (value) => {
        if (value.length < 3)
            return false;
        else return true;
    }

    onEmailChange = (value) => {
        this.setState({
            email: value
        });
    }

    onPassword1Change = (value, valid) => {
        this.setState({
            password1: { value: value, valid: valid }
        });
    }

    onPassword2Change = (value, valid) => {
        this.setState({
            password2: { value: value, valid: valid }
        });
    }

    onIsAdminChange = () => {
        this.setState({
            isAdmin : !this.state.isAdmin
        });
    }

    validateForm = () => {
        if (!this.state.userExists)
            return this.state.password1.valid && this.state.password2.valid
                && this.state.username.valid && this.state.email.valid;
        else
            return this.state.email.valid;
    }

    onAcceptClick = () => {
        if (!this.validateForm()) {
            this.setState({
                showError: true
            });
        } else {
            let roles = [];
            if (this.state.isAdmin && this.state.isAdminEnabled) {
                roles.push('ROLE_ADMIN');
            }
            else {
                roles.push('ROLE_USER');
            }
            if (!this.state.userExists) {
                this.props.onCreateUser({
                    username: this.state.username.value,
                    password: this.state.password2.value,
                    email: this.state.email.value,
                    roles: roles
                });
            } else {
                let modifiedUser = cloneDeep(this.props.user);
                modifiedUser.email = this.state.email.value;
                if (!this.state.isAdminEnabled)
                    modifiedUser.roles = this.props.user.roles;
                else
                    modifiedUser.roles = roles;
                this.props.onModifiedUser(modifiedUser);
            }
        }
    }

    render() {
        let title = 'Usuario';
        if (this.state.userExists)
            title += `: ${this.state.username.value}`;

        return (
            <Modal show={this.state.isShowing} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.showError &&
                        <Alert bsStyle="danger"><i className="fa fa-times"></i> Hay errores en el formulario</Alert>}

                    {!this.state.userExists && <InputText label="Nombre de usuario" value={this.state.username.value}
                        onChange={this.onUsernameChange} forceValidation={this.state.showError}
                        validationRule={this.getUsernameValidation} validationMessage={"Debe ingresar el usuario"} />}
                    {!this.state.userExists && <InputPassword value={this.state.password1.value} onChange={this.onPassword1Change}
                        forceValidation={this.state.showError} />}
                    {!this.state.userExists && <InputPassword value={this.state.password2.value} onChange={this.onPassword2Change}
                        compareValue={this.state.password1.value} forceValidation={this.state.showError} />}
                    <InputText label="Email" value={this.state.email.value}
                        onChange={this.onEmailChange} forceValidation={this.state.showError}
                        validationRule={Validations.email} validationMessage={"Debe ingresar un email válido"} />

                    {this.state.isAdminEnabled && <Checkbox checked={this.state.isAdmin} onChange={this.onIsAdminChange}>Administrador</Checkbox>}

                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="secondary" onClick={this.props.onClose}>Cerrar</Button>
                    <Button bsStyle="primary" onClick={this.onAcceptClick}>{!this.state.userExists ? 'Crear' : 'Modificar'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

UserDialog.propTypes = {
    show: PropTypes.bool,
    user: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onCreateUser: PropTypes.func.isRequired,
    onModifiedUser: PropTypes.func.isRequired
};

UserDialog.defaultProps = {
    show: false
};
export default UserDialog;
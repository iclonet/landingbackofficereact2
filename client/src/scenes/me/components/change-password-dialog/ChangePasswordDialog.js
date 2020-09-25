import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import InputPassword from '../../../../components/input-password/InputPassword';

class ChangePasswordDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password1: { value: '', valid: false },
            password2: { value: '', valid: false },
            showError: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({
                password1: { value: '', valid: false },
                password2: { value: '', valid: false },
                showError: false
            });
        }
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

    validateForm = () => {
        return this.state.password1.valid && this.state.password2.valid;
    }

    onChangeClick = () => {
        if (!this.validateForm()) {
            this.setState({ showError: true });
        } else {
            this.props.onChangePassword(this.state.password2.value);
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.showError &&
                        <Alert bsStyle="danger"><i className="fa fa-times"></i> Hay errores en el formulario</Alert>}
                    <InputPassword value={this.state.password1.value} onChange={this.onPassword1Change}
                        forceValidation={this.state.showError} />
                    <InputPassword value={this.state.password2.value} onChange={this.onPassword2Change}
                        compareValue={this.state.password1.value} forceValidation={this.state.showError} />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="secondary" onClick={this.props.onClose}>Cerrar</Button>
                    <Button bsStyle="primary" onClick={this.onChangeClick}>Cambiar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ChangePasswordDialog.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired
};

ChangePasswordDialog.defaultProps = {
    show: false
};

export default ChangePasswordDialog;
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

export default class CaptchaModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            target: null,
            gRecaptchaResponse: null
        };
    }

    getTarget() {
        return this.state.target;
    }

    setTarget(target) {
        this.setState({target: target});
    }

    onChange(response) {
        this.setState({ gRecaptchaResponse: response });
    }

    closeModal = () => {
        this.setState({ target: null });
    };

    render() {
        return (
            <Modal backdrop={'static'} keyboard={true} show={!this.props.onCheck() && this.state.target != null} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Complete el formulario para continuar</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ReCAPTCHA
                        ref="recaptcha"
                        sitekey="6LfGhF4UAAAAAM99SQpzJQ3DSnUwm2fkUkfgOVwe"
                        onChange={this.onChange.bind(this)}/>

                    <Modal.Footer>
                        <Button bsStyle="default" onClick={this.props.onCancel}>Cancelar</Button>
                        <Button bsStyle="primary" disabled={!this.state.gRecaptchaResponse} type="submit" onClick={this.props.onSuccess}>Continuar</Button>
                    </Modal.Footer>
            </Modal.Body>
            </Modal>
        );
    }
}

CaptchaModal.propTypes = {
    onCheck: PropTypes.func,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
};

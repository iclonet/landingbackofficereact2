import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class AlertDialog extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.message}</Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.onClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AlertDialog.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string
};

AlertDialog.defaultProps = {
    show: false,
    title: '',
    message: ''
};
export default AlertDialog;



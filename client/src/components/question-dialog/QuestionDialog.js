import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class QuestionDialog extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.message}</Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="secondary" onClick={this.props.onCancel}>{this.props.cancelText}</Button>
                    <Button bsStyle="primary" onClick={this.props.onAccept}>{this.props.acceptText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

QuestionDialog.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.node,
    message: PropTypes.node,
    acceptText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
};

QuestionDialog.defaultProps = {
    show: false,
    title: '',
    message: '',
    acceptText: 'Aceptar',
    cancelText: 'Cancelar'

};
export default QuestionDialog;
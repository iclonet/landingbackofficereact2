import React from 'react';
import PropTypes from 'prop-types';
import {merge} from 'lodash';
import { Modal, Button} from 'react-bootstrap';

class NotificationDialog extends React.Component {

    constructor(props){
        super(props);

        this.state = this.generateStateFromProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.generateStateFromProps(nextProps));
    }

    generateStateFromProps= (props) =>{
        let notification = {
            titulo : '',
            asunto: ''
        }

        if(props.notification){
            merge(notification,props.notification);
        }

        return {
            isShowing : (props.notification) ? true : false,
            notification: notification
        };
    }
    
    render() {
        return (
            <Modal show={this.state.isShowing} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.notification.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>{this.state.notification.asunto}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.onClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

NotificationDialog.propTypes = {
    isShowing : PropTypes.bool,
    onClose : PropTypes.func.isRequired,
    notification : PropTypes.any
}

export default NotificationDialog;
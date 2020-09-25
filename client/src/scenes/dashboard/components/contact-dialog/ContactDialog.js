import React, { Component } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import lstrings from '../../../../utils/LStrings';
import "./ContactDialog.css";
import agilDataLogo from '../../../../images/logo-icono.png';
import Session from '../../../../utils/Session';


class ContactDialog extends Component {
    render() {
        
        let logo = agilDataLogo;
        let colSpan = 6;
        let email = lstrings.contacto_mail;
        if(!Session.isMainSite()) {
            logo = Session.getLogo();
            colSpan = 12;
            let account = Session.getAccount();
            if (account != null) {
                email = account.email;
            }
        }

        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="contacto">
                        <Col lg={colSpan} xsHidden={true}>
                            <img src={logo} className="img-responsive" alt=""/>
                        </Col>
                        <Col lg={colSpan}>
                            <h5>Atención al cliente</h5>
                            <br/>
                            <p><i className="fa fa-envelope"/>&nbsp;<a href={`mailto:${email}`}>{email}</a></p>
                            <br/>
                            { Session.isMainSite() && <p><i className="fa fa-phone"/>&nbsp;<a href={`tel:${lstrings.contacto_tel}`}>{lstrings.contacto_tel}</a></p> }
                        </Col>
                    </Row>
                </Modal.Body>
                
            </Modal>
        );
    }
}

ContactDialog.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

ContactDialog.defaultProps = {
    show: false
};
export default ContactDialog;

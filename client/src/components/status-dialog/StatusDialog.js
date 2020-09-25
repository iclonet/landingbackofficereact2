import React, { Component } from 'react';
import { Modal, Button, Row, Col, Table } from 'react-bootstrap';
import { some } from 'lodash';
import PropTypes from 'prop-types';
import Session from '../../utils/Session';

class StatusDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            validacion: this.mapValidacion(props.validacion)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            validacion: this.mapValidacion(nextProps.validacion)
        });
    }

    mapValidacion = (validacion) => {
        if (validacion === undefined)
            return [];
        else return validacion;
    }

    validateVariable = (key) => {
        if (some(this.state.validacion.variableAprobada, (x) => x === key))
            return true;
        if (some(this.state.validacion.variableRechazo, (x) => x === key))
            return false;
        return null;

    }

    filaVariable = (ix, key, text) => {
        let renderValue;
        let validation = this.validateVariable(key);
        if (validation === true) {
            renderValue = <th width='50px' style={{ textAlign: 'center', color: '#8BC34A' }}><i className="fa fa-check-circle"></i></th>
        } else if (validation === false) {
            renderValue = <th width='50px' style={{ textAlign: 'center', color: '#F44336' }}><i className="fa fa-times-circle"></i></th>
        } else {
            return '';
        }

        return <tr key={ix}>
            <th>{text}</th>
            {renderValue}
        </tr>;
    }

    render() {
        return (
            <Modal bsSize='lg' show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Status {this.props.status}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={8}>
                            <h1>{this.props.nombre}</h1>
                            <p><strong>CUIL / CUIT </strong>{this.props.cuil}</p>
                        </Col>
                        <Col lg={4}>
                            <p><strong>Usuario: </strong>{Session.getUser().userName}</p>
                            <p><strong>Codigo de consulta:</strong>{this.props.idLog}</p>
                            <p><strong>Fecha: </strong>{this.props.fecha.format('DD/MM/YYYY HH:mm')}</p>
                        </Col>
                    </Row>
                    <hr />
                    <h5>Variables de rechazos</h5>
                    <Table striped bordered condensed fill responsive>
                        <thead>
                            {this.props.variables.map((item, ix) => this.filaVariable(ix, item.key, item.value))}
                        </thead>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.onClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

StatusDialog.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	idLog: PropTypes.number,
	fecha: PropTypes.object,
	nombre: PropTypes.string,
	cuil: PropTypes.any,
	status: PropTypes.string,
	variables: PropTypes.any,
	validacion: PropTypes.any
};

StatusDialog.defaultProps = {
    show: false,
    idLog: 0,
    nombre: ''
};
export default StatusDialog;
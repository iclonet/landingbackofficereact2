import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TablePlain from '../../../components/table-plain/TablePlain';
import TableUtils from '../../../utils/TableUtils';
import PropTypes from 'prop-types';

class NominaDialog extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="largeModal" >
                    <TablePlain columns={['CUIL', 'Nombre']}
                        rows={this.props.info.map((item, ix) =>
                            <tr key={ix}>
                                <td>{TableUtils.cuilFormat(item.cuil)}</td>
                                <td>{item.nombre}</td>
                            </tr>
                        )}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.onCloseDialog}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

NominaDialog.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    info: PropTypes.any,
    onCloseDialog: PropTypes.func
};

NominaDialog.defaultProps = {
    show: false,
    title: '',

};
export default NominaDialog;
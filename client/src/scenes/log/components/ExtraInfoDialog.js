import React, {
    Component
} from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import lstrings from '../../../utils/LStrings';
import TablePlain from '../../../components/table-plain/TablePlain';
import TableUtils from '../../../utils/TableUtils';

class ExtraInfoDialog extends Component {

    constructor(props) {
        super(props);
        this.state = this.generateState(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.generateState(nextProps));
    }

    generateState(props) {
        if (props.data == null) {
            return {
                clasificacion: '',
                nombre: '',
                adicionales: []
            };
        } else {
            return props.data;
        }
    }

	render() {
		return (
			<Modal bsSize='lg' show={this.props.show} onHide={this.props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Información adicional solicitada consulta</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<TablePlain
						title={`${this.state.clasificacion}: ${this.state.nombre}`}
						columns={[lstrings.bloque, lstrings.subbloque]}
						rows={this
						.state
						.adicionales
						.map((item, ix) => <tr key={ix}>
							<td>{TableUtils.stringFormat(item.bloque)}</td>
							<td>{TableUtils.stringFormat(item.subbloque)}</td>
						</tr>)}/>

				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.props.onClose}>{lstrings.cerrar}</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

ExtraInfoDialog.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.any
};

ExtraInfoDialog.defaultProps = {
    show: false
};
export default ExtraInfoDialog;
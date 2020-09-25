import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import TableUtils from '../../../utils/TableUtils';
import TablePlain from '../../../components/table-plain/TablePlain'
import { forEach, map } from 'lodash';
import numeral from 'numeral';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import lstrings from '../../../utils/LStrings';

class TableChequesRechazados extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.processInfo(props.data.datos);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.processInfo(nextProps.data.datos));
    }

    processInfo = (info) => {
        let importeCheques = 0;
        let pendientesPago = 0;
        let importePendientesPago = 0;
        forEach(info, (item) => {
            importeCheques += numeral(item.monto).value();
            if (item.fechaPago.length === 0) {
                pendientesPago++;
                importePendientesPago += numeral(item.monto).value();
            }
        });

        return {
            chequesrechazados: info,
            importeCheques: importeCheques,
            pendientesPago: pendientesPago,
            importePendientesPago: importePendientesPago
        }
    }

    render() {
        return (
			<div>
				<TablePlain
					columns={[
						lstrings.numeroCheque,
						lstrings.fechaRechazo,
						lstrings.monto,
						lstrings.causal,
						lstrings.fechaLevantamiento,
						lstrings.multa,
						lstrings.cuit,
					]}
					rows={map(this.state.chequesrechazados, (item, ix) =>
						<tr key={ix}>
							<td>{item.nroCheque}</td>
							<td>{TableUtils.dateFormat(item.fechaRechazo)}</td>
							<td>{TableUtils.ARSFormat(item.monto)}</td>
							<td>{item.causal}</td>
							<td>{TableUtils.dateFormat(item.fechaLevantamiento)}</td>
							<td>{item.multa}</td>
							<td>{TableUtils.cuitFormat(item.cuit)}</td>
						</tr>
					)}
				/>

				<Row>
					<Col sm={4}>
						<p>
							<strong>{lstrings.importetotalrechazado} </strong>
							{TableUtils.ARSFormat(this.state.importeCheques)}
						</p>
					</Col>
					<Col sm={4}>
						<p>
							<strong>{lstrings.pendientespago} </strong>
							{this.state.pendientesPago}
						</p>
					</Col>
					<Col sm={4}>
						<p>
							<strong>{lstrings.importetotalpendiente} </strong>
							{TableUtils.ARSFormat(this.state.importePendientesPago)}
						</p>
					</Col>
				</Row>
				<Row>
					<Col sm={4} smOffset={4}>
						<Button
							bsStyle="primary"
							className="btn-block"
							target="_blank"
							href="http://www.bcra.gob.ar/BCRAyVos/Cheques_Denunciados.asp"
						>
							{lstrings.verInformeCheques}
						</Button>
					</Col>
				</Row>
			</div>
        )
    }
}
TableChequesRechazados.propTypes = {
    data: PropTypes.array,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
};

export default TableChequesRechazados;

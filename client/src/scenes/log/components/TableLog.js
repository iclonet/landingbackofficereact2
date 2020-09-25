import React from 'react';
import PropTypes from 'prop-types';
import TableUtils from '../../../utils/TableUtils';
import {
    Button
} from 'react-bootstrap';
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import lstrings from '../../../utils/LStrings';
import Session from '../../../utils/Session'

class TableLog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: this.processData(props.data)
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: this.processData(nextProps.data)
		});
	}

	processData = (data) => {
		return data;
	}

	gridOptions = () => {
		return TableUtils.defaultConfig({
			pagination: true
		});
	}

	redirectFormat = (cell, row) => {
		if (row.clasificacion === "Persona")
			return TableUtils.cuilFormat(cell);
		else if (row.clasificacion === "Empresa")
			return TableUtils.cuitFormat(cell);
		else
			return cell;
	}
    
	plusButtonFormat = (cell, row) => {
		if (row.adicionales != null && row.adicionales.length > 0) {
			let onClick = () => {
				this
					.props
					.showExtraInfo(row);
			}

			return <Button onClick={onClick}>
				<i className="fa fa-plus"></i>
				Ver</Button>;
		}
	}

	render() {
		return (
			<BootstrapTable data={this.state.data} options={this.gridOptions()} pagination>
				{!this.props.agruparPorUsuario &&
					<TableHeaderColumn dataField="id" width='80' isKey>
						{lstrings.id}
					</TableHeaderColumn>
				}

				{!this.props.agruparPorUsuario &&
					<TableHeaderColumn dataField="codigo" width='70'>
						{lstrings.codigo}
					</TableHeaderColumn>
				}

				{!this.props.agruparPorUsuario &&
					<TableHeaderColumn
						dataField="fecha"
						width='100'
						dataFormat={TableUtils.dateFormat}
						dataSort>
						{lstrings.fecha}
					</TableHeaderColumn>
				}

				{/* Compruebo si los resultados se agrupan por usuario
				para agregar el atributo "isKey" a la columna usuario */}
				{Session.getUser().isAdmin && this.props.agruparPorUsuario &&
					<TableHeaderColumn
					dataField="usuario"
					width='100'
					expandBy='column'
					dataSort
					isKey>
						{lstrings.usuario}
					</TableHeaderColumn>
				}
				{Session.getUser().isAdmin && !this.props.agruparPorUsuario &&
					<TableHeaderColumn
					dataField="usuario"
					width='100'
					expandBy='column'
					dataSort>
						{lstrings.usuario}
					</TableHeaderColumn>
				}

				{!this.props.agruparPorUsuario &&
					<TableHeaderColumn
						dataField="cuil"
						width='120'
						dataFormat={this.redirectFormat}
						dataSort>
						{lstrings.cuit}
					</TableHeaderColumn>
				}

				{!this.props.agruparPorUsuario &&
					<TableHeaderColumn
						dataField="nombre"
						width='150'
						expandBy='row'
						dataSort>
						{lstrings.nombre}
					</TableHeaderColumn>
				}

				{/* La columna totales se incluye siempre */}
				<TableHeaderColumn dataField="totales" width='150' expandBy='column' dataSort>
					{lstrings.total_consultas}
				</TableHeaderColumn>

				{!this.props.agruparPorUsuario &&
					<TableHeaderColumn
						dataField="id"
						width='150'
						dataFormat={this.plusButtonFormat}>
						{lstrings.solicitudes_adicionales}
					</TableHeaderColumn>
				}
				
			</BootstrapTable>
		);
	}
}

TableLog.propTypes = {
    data: PropTypes.array,
	showExtraInfo: PropTypes.func,
	agruparPorUsuario: PropTypes.bool,
}

export default TableLog;
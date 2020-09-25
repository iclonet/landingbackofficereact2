import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge, Button, Panel, Row, Col } from 'react-bootstrap';
import { flatMap, forEach, orderBy } from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import TableUtils from '../../../../utils/TableUtils';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import './TableBCRA.css';

class TableBCRA extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: this.processData(props.data.datos),
			verReferencias: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: this.processData(nextProps.data.datos)
		});
	}

	lastPeriod = () => {
		return moment();
	}

	processData = (data) => {
		if (data == null)
			return null;

		const monthsKey = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
		const lastPeriod = this.lastPeriod();
		let info = {};

		forEach(data, (value) => {
			let periodo = moment(value.periodo);
			let agno = periodo.year();
			let mes = periodo.month();
			if (!info[agno]) {
				info[agno] = {
					entidades: {},
					anio: agno
				};

				forEach(monthsKey, (month) => {
					info[agno][month] = {
						valor: 0,
						bcra: false,
						noInfo: false
					};
				});
			}

			let info_agno = info[agno];
			info_agno[monthsKey[mes]].valor += value.prestamo;

			if (value.entidad != null) {
				if (!info_agno.entidades[value.entidad.codigoEnt]) {
					info_agno.entidades[value.entidad.codigoEnt] = {
						entidad: value.entidad.entidad,
						id: value.entidad.codigoEnt,
						meses: []
					}
					for (let x = 0; x < 12; x++) {
						info_agno.entidades[value.entidad.codigoEnt].meses.push({
							valor: 0,
							bcra: false,
							noInfo: lastPeriod.isBefore(moment({ year: agno, month: x })),
							situacion: '00'
						})
					}
				}

				info_agno.entidades[value.entidad.codigoEnt].meses[mes].valor = value.prestamo;
				info_agno.entidades[value.entidad.codigoEnt].meses[mes].situacion = value.situacion;
			}
		});

		let result = flatMap(info, (item) => item);
		forEach(result, (item) => {
			item.entidades = flatMap(item.entidades, (x) => x);
		});
		return orderBy(result, ['anio'], ['desc']);
	}

	gridOptions = () => {
		return TableUtils.defaultConfig();
	}

	monthCellFormat = (cell) => {
		if (cell.noInfo)
			return '';
		return <span>{TableUtils.ARSFormat(cell.valor, true)}</span>;
	}
	monthColumnFormat = (cell) => {
		if (cell.noInfo)
			return 'noInfo';
		if (cell.bcra)
			return 'bcra';
		return '';
	}

	expandedRow = (row) => {
		return (
			<Table striped bordered condensed fill responsive>
				<thead>
					<tr>
						<td width={300}>Entidad</td>
						<td>Ene</td>
						<td>Feb</td>
						<td>Mar</td>
						<td>Abr</td>
						<td>May</td>
						<td>Jun</td>
						<td>Jul</td>
						<td>Ago</td>
						<td>Sep</td>
						<td>Oct</td>
						<td>Nov</td>
						<td>Dic</td>
					</tr>
				</thead>
				<tbody>
					{row.entidades.map((item, ix) => {
						if (item === null)
							return <tr key={ix}></tr>;
						return (<tr key={ix}>
							<td>{item.entidad}</td>
							{item.meses.map((cell, ix2) => {
								if (cell.noInfo)
									return <td key={ix2} className={'noInfo'}></td>;
								let valor = '';
								if (cell.valor >= 0)
									valor = TableUtils.ARSFormat(cell.valor, true);
								return <td key={ix2} style={{ textAlign: 'center' }}>{valor}<br /><Badge className={`situacion-${cell.situacion}`}>{numeral(cell.situacion).format()}</Badge></td>;
							})}
						</tr>);
					})}
				</tbody>
			</Table >
		);
	}

	verReferencias = () => {
		this.setState({
			verReferencias: !this.state.verReferencias
		});
	}

	render() {
		const referencias = [
			{ ref: '0', desc: 'Sin información en BCRA.' },
			{ ref: '1', desc: 'Situación normal (pago puntual o atrasos menores a 31 días).' },
			{ ref: '2', desc: 'Con riesgo potencial (con atrasos entre 31 y 90 días).' },
			{ ref: '3', desc: 'Cumplimiento deficiente (con atrasos entre 90 y 180 días).' },
			{ ref: '4', desc: 'Con alto riesgo de insolvencia (con atrasos entre 180 días y 1 año).' },
			{ ref: '5', desc: 'Irrecuperable (con atrasos mayores a 1 año).' },
			{ ref: '6', desc: 'Irrecuperable por disposición técnica (entidades liquidadas, en proceso de disolución o en quiebra, en gestión judicial).' },
		]

		return (
			<div>
				<BootstrapTable data={this.state.data}
					expandableRow={() => true}
					expandComponent={this.expandedRow}
					options={this.gridOptions()}>
					<TableHeaderColumn dataField="anio" width='30' dataFormat={TableUtils.plusButtonFormat} ></TableHeaderColumn>
					<TableHeaderColumn dataField="anio" isKey>Período</TableHeaderColumn>
					<TableHeaderColumn dataField="ene" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Ene</TableHeaderColumn>
					<TableHeaderColumn dataField="feb" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Feb</TableHeaderColumn>
					<TableHeaderColumn dataField="mar" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Mar</TableHeaderColumn>
					<TableHeaderColumn dataField="abr" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Abr</TableHeaderColumn>
					<TableHeaderColumn dataField="may" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>May</TableHeaderColumn>
					<TableHeaderColumn dataField="jun" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Jun</TableHeaderColumn>
					<TableHeaderColumn dataField="jul" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Jul</TableHeaderColumn>
					<TableHeaderColumn dataField="ago" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Ago</TableHeaderColumn>
					<TableHeaderColumn dataField="sep" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Sep</TableHeaderColumn>
					<TableHeaderColumn dataField="oct" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Oct</TableHeaderColumn>
					<TableHeaderColumn dataField="nov" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Nov</TableHeaderColumn>
					<TableHeaderColumn dataField="dic" dataFormat={this.monthCellFormat} columnClassName={this.monthColumnFormat}>Dic</TableHeaderColumn>
				</BootstrapTable>

				<p><strong>Último período informado en CD del BCRA: </strong>{this.lastPeriod() !== null ? this.lastPeriod().subtract(3, 'months').format('MMMM YYYY') : ''}</p>
				{/* 
                    TODO
                    indica que el período fue enriquecido a través de BCRA Online.
                    */}
				<Row>
					<Col sm={4} smOffset={1}>
						<Button bsStyle="primary" className="btn-block" onClick={this.verReferencias} >Ver referencias</Button>
					</Col>
					<Col sm={4} smOffset={2}>
						<Button bsStyle="primary" target="_blank" className="btn-block" href="http://www.bcra.gob.ar/BCRAyVos/Situacion_Crediticia.asp">Ver Banco Central - Online</Button>
					</Col>
				</Row>
				<Panel collapsible expanded={this.state.verReferencias} >
					<Table striped bordered condensed fill responsive>
						<thead>
							<tr>
								<td width={300}>Situación</td>
								<td>Descripción</td>
							</tr>
						</thead>
						<tbody>
							{referencias.map((item, ix) => <tr key={ix}>
								<td style={{ textAlign: 'center' }}><Badge className={`situacion-${numeral(ix).format('00')}`}>{item.ref}</Badge></td>
								<td>{item.desc}</td>
							</tr>)}
						</tbody>
					</Table>
				</Panel>
				<Row>

				</Row>
			</div>
		);
	}

}

TableBCRA.propTypes = {
	data: PropTypes.array,
	onRequestInfo: PropTypes.func,
	hidePanels: PropTypes.any
}

export default TableBCRA;

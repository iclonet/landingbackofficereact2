import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Panel,
    Row,
    Col,
    Button,
    Tabs,
    Tab
} from 'react-bootstrap';
import TableLog from './components/TableLog';
import ExtraInfoDialog from './components/ExtraInfoDialog';
import InputSelect from '../../components/input-select/InputSelect';
import InputDatePicker from '../../components/input-date-picker/InputDatePicker';
import ApiClient from '../../utils/ApiClient';
import UiUtils from '../../utils/UiUtils';
import Session from '../../utils/Session'
import lstrings from '../../utils/LStrings';
import './log.css';
import TableUtils from '../../utils/TableUtils';
import CrearPDF, {
    CrearPDFTIPODIALOGO
} from './components/pdf/CrearPDF';


class Log extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	        listUsers: [],
	        listClients: [],
	        user: "0",
	        servicio: 0,
	        startDate: moment()
	            .subtract(1, 'M')
	            .format("YYYY-MM-DD"),
	        endDate: moment().format("YYYY-MM-DD"),
	        dialogShow: false,
	        selectedRow: null,
	        consumeCredito: "1",
			mostrarPDF: false,
			agruparPorUsuario: false,
			infoPDF: {
				listaConsultas: [],
				porServicio: false,
				consumeCredito: false,
				fechaDesde: "",
				fechaHasta: "",
			}
	    }
	}

	componentDidMount() {
		if (Session.getUser().isAdmin) {
			UiUtils.showProgress(true);
			ApiClient
				.getAllClients()
				.then(this.onFinishGetListClients)
				.catch((error) => {
					UiUtils.showProgress(false);
					UiUtils.showError(error);
				});
		} else {
			var account = Session.getAccount();
			this.setState({
				client: account.idCliente
			})
			ApiClient
				.getServiciosByCliente(account.idCliente)
				.then(this.onFinishGetListServicios)
				.catch((error) => {
					UiUtils.showProgress(false);
					UiUtils.showError(error);
				});

		}
	}

	onFinishGetListUsers = (res) => {
		UiUtils.showProgress(false);

		let listUsers = [{
			value: 0,
			desc: "Todos"
		}];
		listUsers = listUsers.concat(res.map((item) => {
			return {
				value: item.id,
				desc: item.username
			};
		}));

		this.setState({
			listUsers: listUsers,
			user: listUsers[0].value
		});

	}

	onFinishGetListClients = (res) => {
		UiUtils.showProgress(false);

		let listClients = [{
			value: 0,
			desc: "Todos"
		}];
		listClients = listClients.concat(res.map((item) => {
			return {
				value: item.id,
				desc: item.razonSocial ?
					item.razonSocial :
					item.empresa
			};
		}));

		this.setState({
			listClients: listClients,
			client: listClients[0].value
		});

	}

	onFinishGetListServicios = (res) => {
		UiUtils.showProgress(false);
		let listServicios = [{
			value: 0,
			desc: "Todos"
		}];
		listServicios = listServicios.concat(res.map((item) => {
			return {
				value: item.id,
				desc: TableUtils.dateFormat(item.vigenciaDesde) + ' - ' + TableUtils.dateFormat(item.vigenciaHasta)
			};
		}));

		this.setState({
			listServicios: listServicios,
			servicio: listServicios[0].value
		});

	}

	onUserChange = (ev) => {
		this.setState({
			user: ev.value
		});
	}

	onClientChange = (ev) => {
		this.setState({
			client: ev.value,
			user: "0",
			servicio: 0
		});
		ApiClient
			.getServiciosByCliente(ev.value)
			.then(this.onFinishGetListServicios)
			.catch((error) => {
				UiUtils.showProgress(false);
				UiUtils.showError(error);
			});
		ApiClient
			.getUsers(ev.value)
			.then(this.onFinishGetListUsers)
			.catch((error) => {
				UiUtils.showProgress(false);
				UiUtils.showError(error);
			});

	}

	onServicioChange = (ev) => {
		this.setState({
			servicio: ev.value
		});
	}

	onStartDateChange = (ev) => {
		this.setState({
			startDate: ev.value
		});
	}

	onEndDateChange = (ev) => {
		this.setState({
			endDate: ev.value
		});
	}

	onBuscarClick = () => {
		UiUtils.showProgress(true);

		ApiClient.getLog(
			this.state.user,
			this.state.startDate,
			this.state.endDate,
			this.state.porServicio,
			this.state.servicio,
			this.state.client,
			this.state.consumeCredito,
			this.state.agruparPorUsuarioCheck
		).then(res => {
			UiUtils.showProgress(false);
			if (res.result.code === 200) {
				this.setState({
					resultado: res.data,
					agruparPorUsuario: this.state.agruparPorUsuarioCheck,
					infoPDF: {
						listaConsultas: res.data.listaConsultas,
						porServicio: Boolean(this.state.porServicio),
						consumeCredito: this.state.consumeCredito == "1" ? true : false,
						fechaDesde: res.data.vigenciaDesde ? res.data.vigenciaDesde : this.state.startDate,
						fechaHasta: res.data.vigenciaHasta ? res.data.vigenciaHasta : this.state.endDate,
					}
				});
			} else {
				throw UiUtils.handledError(res.result.info);
			}
		})
		.catch((error) => {
			UiUtils.showProgress(false);
			UiUtils.showError(error);
		});
	}

	onShowExtraInfo = (log) => {
		this.setState({
			dialogShow: true,
			selectedRow: log
		});
	}

	onDialogClose = () => {
		this.setState({
			dialogShow: false,
			selectedRow: null
		});
	}

	onTabSelect = (key) => {
		this.setState({
			porServicio: Boolean(key),
			// valor por defecto al cambiar de pestaña
			agruparPorUsuarioCheck: false
		});
		if (Session.getUser().isAdmin) {
			this.setState({
				client: 0,
				user: "0",
				servicio: 0,
				listUsers: [],
				listServicios: [],
				resultado: {
					listaConsultas: []
				}
			});
		}
	}

	handleRadioChange = (changeEvent) => {
		this.setState({
			consumeCredito: changeEvent.target.value
		});
	}

	handleCheckboxChange = (changeEvent) => {
	    this.setState({
	        agruparPorUsuarioCheck: changeEvent.target.checked
	    });
	}

	onPDF = () => {
	    this.setState({
	        mostrarPDF: true,
	        tipodialogo: CrearPDFTIPODIALOGO.descargar
	    })
	}

	onPrint = () => {
	    this.setState({
	        mostrarPDF: true,
	        tipodialogo: CrearPDFTIPODIALOGO.imprimir
	    })
	}

	cerrarPDF = () => {
	    this.setState({
	        mostrarPDF: false
	    })
	}

	render() {
		const titulo = <h4>
			<i className="fa fa-user"></i>
			Estadísticas</h4>;

		const cols = Session
			.getUser()
			.isAdmin
			? 4
			: 6;

		return (
			<div>
				<ExtraInfoDialog
					show={this.state.dialogShow}
					onClose={this.onDialogClose}
					data={this.state.selectedRow} />
				
				<h1>Histórico de consultas</h1>

				<Panel defaultExpanded header={titulo}>
					<Tabs defaultActiveKey={0} onSelect={this.onTabSelect} id="tab-logs">
						<Tab eventKey={0} title="Por fecha">
							<br></br>
							<Row>
								{Session
									.getUser()
									.isAdmin && <Col md={4}>
										<InputSelect
											value={this.state.client}
											label='Cliente'
											options={this.state.listClients}
											onChange={this.onClientChange}/>
									</Col>
	}
								{Session
									.getUser()
									.isAdmin && <Col md={4}>
										<InputSelect
											value={this.state.user}
											label={lstrings.usuario}
											options={this.state.listUsers}
											onChange={this.onUserChange}/>
									</Col>}
							</Row>
							<Row>
								<Col md={cols}>
									<InputDatePicker
										label={lstrings.fechadesde}
										value={this.state.startDate}
										onChange={this.onStartDateChange}/>
								</Col>
								<Col md={cols}>
									<InputDatePicker
										label={lstrings.fechahasta}
										value={this.state.endDate}
										onChange={this.onEndDateChange}/>
								</Col>
							</Row>
							<Row>
								<Col md={cols}>
									<div className="radio">
										<label>
											<input
												type="radio"
												value={1}
												checked={this.state.consumeCredito === '1'}
												onChange={this.handleRadioChange}/>
											Mostrar solo consultas que consumieron crédito
										</label>
									</div>
								</Col>
								<Col md={cols}>
									<div className="radio">
										<label>
											<input
												type="radio"
												value={0}
												checked={this.state.consumeCredito === '0'}
												onChange={this.handleRadioChange}/>
											Mostrar todas
										</label>
									</div>
								</Col>
								<Col md={cols}>
									<div className="radio">
										<label>
											<input
												type="checkbox"
												checked={this.state.agruparPorUsuarioCheck == true}
												onChange={this.handleCheckboxChange}
											/>
											Agrupar resultados por Usuario
										</label>
									</div>
								</Col>

							</Row>
							<p>
								<strong>* Aviso: La búsqueda está limitada al rango de un mes</strong>
							</p>

							<Row>
								<Col sm={4} smOffset={4}>
									<Button bsStyle="primary" className="btn-block" onClick={this.onBuscarClick}>{lstrings.buscar}</Button>
								</Col>
							</Row>

						</Tab>
						<Tab eventKey={1} title="Por servicio">
							<br></br>
							<Row>
								{Session
									.getUser()
									.isAdmin && <Col md={4}>
										<InputSelect
											value={this.state.client}
											label='Cliente'
											options={this.state.listClients}
											onChange={this.onClientChange}/>
									</Col>
	}
								<Col md={4}>
									<InputSelect
										value={this.state.servicio}
										label='Servicio'
										options={this.state.listServicios}
										onChange={this.onServicioChange}/>
								</Col>
								{Session
									.getUser()
									.isAdmin && <Col md={4}>
										<InputSelect
											value={this.state.user}
											label={lstrings.usuario}
											options={this.state.listUsers}
											onChange={this.onUserChange}/>
									</Col>}
							</Row>
							<Row>
								<Col md={cols}>
									<div className="radio">
										<label>
											<input
												type="radio"
												value="1"
												checked={this.state.consumeCredito === '1'}
												onChange={this.handleRadioChange}/>
											Mostrar solo consultas que consumieron crédito
										</label>
									</div>
								</Col>
								<Col md={cols}>
									<div className="radio">
										<label>
											<input
												type="radio"
												value="0"
												checked={this.state.consumeCredito === '0'}
												onChange={this.handleRadioChange}/>
											Mostrar todas
										</label>
									</div>
								</Col>
								<Col md={cols}>
									<div className="radio">
										<label>
											<input
												type="checkbox"
												checked={this.state.agruparPorUsuarioCheck == true}
												onChange={this.handleCheckboxChange}
											/>
											Agrupar resultados por Usuario
										</label>
									</div>
								</Col>

							</Row>
							<Row>
								<Col sm={4} smOffset={4}>
									<Button
										bsStyle="primary"
										disabled={!this.state.servicio || this.state.servicio == 0}
										className="btn-block"
										onClick={this.onBuscarClick}>{lstrings.buscar}</Button>
								</Col>
							</Row>
							{this.state.resultado && <div className="container-fluid">
								<Row>
									<Col xs={12}>
										<strong>
											{lstrings.tipoabono}:</strong>
										{this.state.resultado.tipoabono}
									</Col>
								</Row>
								<Row>
									<Col xs={12}>
										<strong>
											{lstrings.vigenciaabono}:</strong>
										<strong>
											{lstrings.desde}:</strong>
										{this.state.resultado.vigenciaDesde}
										<strong>
											{lstrings.hasta}:</strong>
										{this.state.resultado.vigenciaHasta}
									</Col>
								</Row>
								<Row>
									<Col xs={6}>
										<strong>
											{lstrings.cantconsultasweb}:</strong>
										{this.state.resultado.cantidadConsultasWeb}
									</Col>
									<Col xs={6}>
										<strong>
											{lstrings.cantconsultaslotes}:</strong>
										{this.state.resultado.cantidadConsultasLote}
									</Col>
								</Row>
								<Row>
									<Col xs={6}>
										<strong>
											{lstrings.consultasrestantes}:</strong>
										{this.state.resultado.consultasRestantes}
									</Col>
									<Col xs={6}>
										<strong>
											{lstrings.consultasexcedentes}:</strong>
										{this.state.resultado.consultasExcedentes}
									</Col>
								</Row>

							</div>
							}

						</Tab>

					</Tabs>
				</Panel>

				{this.state.resultado &&
					<div className="container-fluid">
					
					<div className="pull-right"
						style = {
							{
								marginTop: '20px',
								marginRight: '20px',
								marginBottom: '20px'
							}
						} >
						<Button onClick={this.onPrint}>
							Imprimir <i className="fa fa-print"></i>
						</Button>
                        &nbsp;
						<Button onClick={this.onPDF}>
							PDF <i className="fa fa-file-pdf-o"></i>
						</Button>
					</div>

					<TableLog
						data={this.state.resultado.listaConsultas}
						showExtraInfo={this.onShowExtraInfo}
						agruparPorUsuario={this.state.agruparPorUsuario}
					/>
					
					<CrearPDF
						mostrarPDF={this.state.mostrarPDF}
						onCerrarPDF={this.cerrarPDF}
						info={this.state.infoPDF}
						tipodialogo={this.state.tipodialogo}
						agruparPorUsuario={this.state.agruparPorUsuario}
					/>

					</div>
				}
			</div>
		);
	}
}

Log.propTypes = {
    match: PropTypes.object
}

export default Log;

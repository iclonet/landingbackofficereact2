import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Button,
    Row,
    Label,
    Well,
    Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';
import UiUtils from '../../../utils/UiUtils';
import ApiClient from '../../../utils/ApiClient';
import './ScoreBatch.css';

class ScoreBatch extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			creditoDisponible: 0,
			enriquecimientoPosible: true,
			scoreResult: false,
			colDesplegar: 12,
			paddingLeft: "30px",
			nameFile: 'Ningún archivo seleccionado',
			selectedFile: null,
			cantidadCuiles: 0,
		}
	}


	/**
	 * 
	 */
	componentDidMount() {
		ApiClient.getCurrentUser().then((resp) => {
			if (resp.data != null) {
				this.setState({
					user: resp.data
				})
			}
		})
	}

    renderArchivoDatos = () => {
        return (
            <Row className="row">
                <Col md={12} className="archivo-col">

					<Col
                        md={this.state.colDesplegar}
                        style={{
							backgroundColor: "#f4f4f4",
							padding: "30px",
							paddingTop: "16px",
							paddingBottom: "18px",
							paddingLeft: this.state.paddingLeft
						}}>
                        <Row>
							<Col md={12} className="archivo-col-import">
								{/* Sección informativa */}
                                <Col md={6} className="center-file">
                                    <h4 className="archivo-h4">Cálculo de Score por Lotes</h4>
                                </Col>
								<Col md={6}>
                                   	<Label bsStyle="info">Funcionamiento</Label>
									<p>A través de esta herramienta, se puede realizar el cálculo de score
										sobre un conjunto de cuiles.</p>
									<p>Para esto, <b>deberá subir un archivo conteniendo un cuil por línea</b>:</p>
									<pre>CUIL1<br/>CUIL2<br/>CUIL3<br/>...</pre>
                                </Col>
								<Col md={6}>
									<Label bsStyle="success">Resultado</Label>
									<p>Como resultado, recibirá un archivo con los cuiles suministrados
										y la predicción de score para cada uno de ellos, siempre que se encuentren
										en la base de datos del sistema.</p>
									<p>El siguiente es el formato del archivo csv resultante:</p>
									<pre>
										"cuil","score"<br/>
										CUIL1,SCORE1<br/>
										CUIL2,SCORE2<br/>
										CUIL3,SCORE3<br/>
										...,...<br/>
									</pre>
                                </Col>
								<Col md={6}>
									<Label bsStyle="warning">Importante</Label>
									<p>Seleccione el archivo y haga clic en <b>Enviar</b> para agregarlo a la cola de procesamiento.</p>
									<p>Cuando se comience a procesar, le enviaremos un correo electrónico informándole el tiempo estimado de finalización.</p>
									<p>Al finalizar, recibirá una copia del resultado en su dirección de correo electrónico
										<b> ({this.state.user.email})</b></p>
                                </Col>

								{/* Sección de carga del archivo */}
								<Col md={9} className="archivo-col-intput-file">
                                    <Col md={6} className="archivo-intput-file">
										<OverlayTrigger placement="bottom" overlay={
											<Tooltip id="tooltip">
												Se aceptan archivos de texto plano(.txt) o.csv
											</Tooltip>
										}>
											<label className="btn-file">
												Seleccionar archivo
												<input
													type="file"
													accept=".txt,.csv"
													id="myFile"
													className="input-file"
													style={{
														display: 'none'
													}}
													onChange={(event) => this.fileProcesar(event)}/>
											</label>
										</OverlayTrigger>
                                        {this.state.nameFile}
                                    </Col>

									<Col md={2}>
										<Button
											style={{
												fontSize: '10px'
											}}
											bsStyle="primary"
											className="btn-block btn-archivo"
											onClick={this.onSendClickProcesar}
										>
											Enviar
										</Button>
									</Col>
                                </Col>

								{/* Resultados de la carga */}
								<Col md={6}>
									<Well>
										<p><b>Números de CUIL encontrados: </b>{this.state.cantidadCuiles}</p>
										<p><b>Crédito disponible: </b>{this.state.creditoDisponible}</p>

										{this.state.enriquecimientoPosible && this.state.scoreResult &&
										<big>
											<Label bsStyle="success">
												Recibirá un correo cuando se comience a procesar el archivo
											</Label>
										</big>
										}
										{!this.state.enriquecimientoPosible &&
										<big>
											<Label bsStyle="danger">
												No es posible procesar el archivo por falta de Crédito
											</Label>
										</big>
										}
									</Well>
                                </Col>
                            </Col>
						</Row>
                    </Col>
                </Col>
            </Row>
        )
	}
	
	/**
	 * 
	 */
    onSendClickProcesar = () => {
		UiUtils.showProgress(true);
		
        if (this.state.selectedFile !== null) {
            ApiClient.procesarScoreBatch(this.state.selectedFile)
                .then((res) => {
                    if (res.result.code === 200) {
                        this.setState({
                            enriquecimientoPosible: res.data.enriquecimientoPosible,
                            scoreResult: res.data.cantidadCuiles > 0,
                            creditoDisponible: res.data.creditoDisponible,
							cantidadCuiles: res.data.cantidadCuiles,
							nameFile: 'Ningún archivo seleccionado',
							selectedFile: null,
						});

						UiUtils.showProgress(false);
                    }
				}).catch((error) => {
					// Blanqueo el estado del componente
					this.setState({
						cantidadCuiles: 0,
						scoreResult: false,
						nameFile: 'Ningún archivo seleccionado',
						selectedFile: null,
					});
					
                    UiUtils.showError(error);
                    UiUtils.showProgress(false);
                });
        } else {
            UiUtils.showAlert("Aviso", "Para buscar, debe seleccionar un archivo");
            UiUtils.showProgress(false);
        }
	}

	/**
	 * Almaceno el archivo seleccionado y guardo el nombre
	 */
    fileProcesar = (event) => {
        this.setState({
			nameFile: event.target.files[0].name,
			selectedFile: event.target.files[0],
			enriquecimientoPosible: true,
			scoreResult: false,
			cantidadCuiles: 0,
        });
	}

	/**
	 * 
	 */
	render() {
		return (
			<div>{this.renderArchivoDatos()}</div>
		);
    }
}

ScoreBatch.propTypes = {
	match: PropTypes.object,
	creditoActualizado: PropTypes.any,
	returnTabFiltros: PropTypes.func,
	tipoFiltro: PropTypes.any
}

export default ScoreBatch;
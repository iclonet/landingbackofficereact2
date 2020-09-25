import React, {
    Component
} from 'react';
import {
    Modal,
    Button,
	Alert
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import keyMirror from 'keymirror';
import moment from 'moment';
import lstrings from '../../../../utils/LStrings';
import PdfDoc from '../../../../utils/PdfDoc';
import "./CrearPDF.css";

export const CrearPDFTIPODIALOGO = keyMirror({
    descargar: null,
    imprimir: null
});

class CrearPDF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mostrarAlertPopup: false,
            alert_text: ""
        }
    }

    imprimir = () => {
        // crea un chunk de js a traves de webpack para solo cargar pdfmake en caso de
        // que se quiera imprimir
        let cpdf = null;
        require.ensure('./cpdf', () => {
            cpdf = require('./cpdf').default;

            let docDefinition = this.procesarDatos();

            try {
                if (this.props.tipodialogo === CrearPDFTIPODIALOGO.imprimir) {
                    cpdf
                        .createPdf(docDefinition)
                        .print();
                } else {
                    cpdf
                        .createPdf(docDefinition)
                        .download(`consultas.pdf`);
                }
                this
                    .props
                    .onCerrarPDF();
            } catch (error) {
                this.setState({
                    alert_text: error,
                    mostrarAlertPopup: true
                });
            }
        });
    }

    procesarDatos = () => {

        const doc = new PdfDoc();

		// Datos particulares
		const listaConsultas = this.props.info.listaConsultas;

		doc.addText("Histórico de Consultas", "header");
		doc.addText(`${lstrings.fecha} : ${moment().format('DD/MM/YYYY HH:mm')}`, "h3");

		const fechaDesde = doc.createDL("Fecha desde", this.props.info.fechaDesde);
		fechaDesde.width = "*";

		const fechaHasta = doc.createDL("Fecha hasta", this.props.info.fechaHasta);
		fechaHasta.width = "*";

		const intervaloFechas = {};
		intervaloFechas.columns = [fechaDesde, fechaHasta];
		doc.addRawDef(intervaloFechas);

		let tipoResultados = "fecha";
		if (this.props.info.porServicio) {
			tipoResultados = "servicio";
		}
		doc.addText(`Resultados por ${tipoResultados}`, 'subheader');
		
		let datp_w = [];
		let datp_h = [];
		let datp_d = [];
		if (this.props.agruparPorUsuario) {
			datp_w = [
			    100,
			    100,
			    "*",
			    100,
			];
			datp_h = [
			    'Fecha Desde',
			    'Fecha Hasta',
			    'Usuario',
			    'Total Consultas',
			];

			listaConsultas.forEach((consulta) => {
				datp_d.push([
					this.props.info.fechaDesde,
					this.props.info.fechaHasta,
					consulta.usuario,
					consulta.totales,
				]);
			});
		}
		else {
			datp_w = [
			    50,
			    30,
			    50,
			    100,
			    50,
			    "*",
			    60,
			];
			datp_h = [
			    'ID',
			    'Código',
			    'Fecha',
			    'Usuario',
			    'CUIT',
			    'Nombre',
			    'Total Consultas',
			];

			listaConsultas.forEach((consulta) => {
				datp_d.push([
					consulta.id,
					consulta.codigo,
					consulta.fecha.substring(0, 10),
					consulta.usuario,
					consulta.cuil,
					consulta.nombre,
					consulta.totales,
				]);
			});
		}

		let tituloTabla = "Todas las consultas";
		if (this.props.info.consumeCredito) {
		    tituloTabla = "Consultas que consumieron crédito";
		}
		doc.addSimpleTable(tituloTabla, datp_h, datp_d, datp_w);
		
        return doc.getDoc();
    }

	render() {
		let boton_text = (this.props.tipodialogo === CrearPDFTIPODIALOGO.imprimir)
			? lstrings.imprimir
			: lstrings.descargar;
		let titulo = (this.props.tipodialogo === CrearPDFTIPODIALOGO.imprimir)
			?
			<h2>
				<i className="fa fa-print" aria-hidden="true"></i> Imprimir
			</h2>
			:
			<h2>
				<i className="fa fa-file-pdf-o" aria-hidden="true"></i> Descargar a PDF
			</h2>;

		return (
			<div>
				<Modal show={this.props.mostrarPDF} onHide={this.props.onCerrarPDF}>
					<Modal.Header closeButton>
						<Modal.Title>{titulo}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Por favor, confirme la acción que desea realizar</h5>

						{this.state.mostrarAlertPopup &&
							<Alert bsStyle="warning">
							{"Mensaje para que se permitan popups " + this.state.alert_text}
							</Alert>}
						
						<div className="cpdf-toolbar">
							<Button onClick={this.imprimir} bsStyle="primary">
								{boton_text}
							</Button>
							<Button onClick={this.props.onCerrarPDF} bsStyle="secondary">
								Cerrar
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

CrearPDF.propTypes = {
    mostrarPDF: PropTypes.bool,
    onCerrarPDF: PropTypes.func,
    info: PropTypes.object,
	tipodialogo: PropTypes.string,
	agruparPorUsuario: PropTypes.bool,
};

export default CrearPDF;

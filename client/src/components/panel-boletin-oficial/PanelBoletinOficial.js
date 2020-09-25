import React from 'react';
import PropTypes from 'prop-types';
import lstrings from '../../utils/LStrings';
import { Panel } from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor'
import TablePlain from '../table-plain/TablePlain';
import TableUtils from '../../utils/TableUtils';
import PermissionChecker from '../permission-checker/PermissionChecker';
import TableEmbargos from './components/TableEmbargos';
import TableJuicios from './components/TableJuicios';
import { map } from 'lodash'
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class PanelBoletinOficial extends React.Component {

    onRequestInfo = (infoKey, infoTitle) => {
        this.props.onRequestInfo(lstrings.boletinoficial_title, infoTitle);
    }

    render() {
        let titulo = <h2><i className="fa fa-file-text-o"></i> {lstrings.boletinoficial_title}</h2>;

        return (
            <ScrollableAnchor id={'panel-boletinoficial'}>
				<Panel collapsible defaultExpanded header={titulo}>
					
					{
						this.props.participacionSocietaria &&
						<PermissionChecker
							infoKey='participacionSocietaria'
							infoTitle={lstrings.sociedadesComercialesTitle}
							data={this.props.participacionSocietaria}
							onRequestInfo={this.onRequestInfo}
							hidePanels={this.props.hidePanels}
						>
							<TablePlain
								columns={[
									lstrings.archivo,
									lstrings.cuit,
									lstrings.fuente,
									lstrings.boletin,
									lstrings.fechaPublicacion,
									lstrings.nombre,
									lstrings.razonsocial,
									lstrings.fechaconstitucion,
									lstrings.cargo,
								]}
								rows={map(this.props.participacionSocietaria.datos, (item, ix) =>
									<tr key={ix}>
										<td>{TableUtils.stringFormat(item.archivo)}</td>
										<td>{TableUtils.cuitFormat(item.cuit)}</td>
										<td>{TableUtils.stringFormat(item.fuente)}</td>
										<td>{item.idboletin}</td>
										<td>{TableUtils.dateFormat(item.fechaPublicacion)}</td>
										<td>{TableUtils.stringFormat(item.nombre)}</td>
										<td>{TableUtils.stringFormat(item.razonSocial)}</td>
										<td>{TableUtils.dateFormat(item.fechaConstitucion)}</td>
										<td>{TableUtils.stringFormat(item.cargo)}</td>
									</tr>
								)}
							/>
	                    </PermissionChecker>
					}

					<PermissionChecker
						infoKey='parteSociedad'
						infoTitle={lstrings.participacionsociedades_title}
						data={this.props.boletinOficial}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						<TablePlain
							columns={[
								lstrings.fuente,
								lstrings.razonSocial,
								lstrings.fecha,
								lstrings.informe,
							]}
							rows={map(this.props.boletinOficial ? this.props.boletinOficial.datos : [], (item, ix) =>
								<tr key={ix}>
									<td>{item.fuente}</td>
									<td>{item.razonSocial}</td>
									<td>{TableUtils.dateFormat(item.fecha)}</td>
									<td>{item.informe}</td>
								</tr>
							)}
						/>
					</PermissionChecker>
					
					<PermissionChecker
						infoKey='embargos'
						infoTitle={lstrings.embargos_title}
						data={this.props.embargos}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						<TableEmbargos
							data={this.props.embargos}
							onRequestInfo={this.onRequestInfo}
							hidePanels={this.props.hidePanels}
						/> 
                    </PermissionChecker>

					<PermissionChecker
						infoKey='juiciosDemandado'
						infoTitle={lstrings.juiciosdemandado_title}
						data={this.props.juiciosDemandado}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						<TableJuicios
							data={this.props.juiciosDemandado}
						/>
                    </PermissionChecker>

					<PermissionChecker
						infoKey='juiciosActor'
						infoTitle={lstrings.juiciosactor_title}
						data={this.props.juiciosActor}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						<TableJuicios
							data={this.props.juiciosActor}
						/>
                    </PermissionChecker>

                </Panel>
            </ScrollableAnchor>
        );
    }
}

PanelBoletinOficial.propTypes = {
    participacionSocietaria: PropTypes.array,
    boletinOficial: PropTypes.array,
    embargos: PropTypes.array,
    juiciosActor: PropTypes.array,
    juiciosDemandado: PropTypes.array,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
};

export default PanelBoletinOficial;

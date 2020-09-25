import React from 'react';
import PropTypes from 'prop-types';
import lstrings from '../../utils/LStrings';
import { map } from 'lodash';
import { Panel } from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor'
import TablePlain from '../table-plain/TablePlain';
import TableUtils from '../../utils/TableUtils';
import PermissionChecker from '../permission-checker/PermissionChecker';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class PanelContactacion extends React.Component {

    onRequestInfo = (infoKey, infoTitle) => {
        this.props.onRequestInfo(lstrings.telefonos_title, infoTitle);
    }

    render() {
        let titulo = <h2><i className="fa fa-phone"></i> {lstrings.contactacion_title}</h2>;

        return (
            <ScrollableAnchor id={'panel-contactacion'}>
                <Panel collapsible defaultExpanded header={titulo}>
					<PermissionChecker
						infoKey='telefonos'
						infoTitle={lstrings.telefonosPrincipales}
						data={this.props.telefonos}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						{
							this.props.telefonos &&
							<TablePlain
								columns={[
									'Número de teléfono',
									'Tipo de línea',
									'Localidad',
								]}
								rows={map(this.props.telefonos.datos, (item, ix) =>
									<tr key={ix}>
										<td>{TableUtils.phoneWhatsappFormat(item.tel, item.wsp)}</td>
										<td>{TableUtils.phoneTypeFormat(item.tipo)}</td>
										<td>{item.localidad}</td>
									</tr>
								)}
							/>
						}
                    </PermissionChecker>

					<PermissionChecker
						infoKey='telefonosCelulares'
						infoTitle={lstrings.telefonosCelulares}
						data={this.props.telefonosCelulares}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						{
							this.props.telefonosCelulares &&
							<TablePlain
								columns={[
									'Número de celular',
									'Tipo de línea',
									'Localidad'
								]}
								rows={map(this.props.telefonosCelulares.datos, (item, ix) =>
									<tr key={ix}>
										<td>{TableUtils.phoneWhatsappFormat(item.tel, item.wsp)}</td>
										<td>{TableUtils.phoneTypeFormat(item.tipo)}</td>
										<td>{item.localidad}</td>
									</tr>
								)}
							/>
						}
                    </PermissionChecker>

					<PermissionChecker
						infoKey='telefonosAdicionales'
						infoTitle={lstrings.telefonosAdicionales}
						data={this.props.telefonosAdicionales}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						{
							this.props.telefonosAdicionales &&
							<TablePlain
								columns={[
									'Nombre',
									'CUIL/CUIL',
									'Número de teléfono',
									'Tipo de línea',
									'Localidad'
								]}
								rows={map(this.props.telefonosAdicionales.datos, (item, ix) =>
									<tr key={ix}>
										<td>{item.nombre}</td>
										<td>{item.tipo.toLowerCase() === 'particular' ? TableUtils.cuilFormat(item.cuitlinea) : TableUtils.cuitFormat(item.cuitlinea)}</td>
										<td>{TableUtils.phoneWhatsappFormat(item.tel, item.wsp)}</td>
										<td>{TableUtils.phoneTypeFormat(item.tipo)}</td>
										<td>{item.domicilio}</td>
									</tr>
								)}
							/>
						}
                    </PermissionChecker>

					<PermissionChecker
						infoKey='mails'
						infoTitle={lstrings.emailsTitle}
						data={this.props.mails}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}>
						{
							this.props.mails &&
							<TablePlain
								columns={[
									lstrings.emaildirs_title
								]}
								rows={map(this.props.mails.datos, (item, ix) =>
									<tr key={ix}>
										<td>{TableUtils.stringFormat(item.email)}</td>
									</tr>
								)}
							/>
						}
					</PermissionChecker>
				</Panel>
            </ScrollableAnchor>
        );
    }
}


PanelContactacion.propTypes = {
    telefonos: PropTypes.array,
    telefonosCelulares: PropTypes.array,
    telefonosAdicionales: PropTypes.array,
    mails: PropTypes.array,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
};

export default PanelContactacion;

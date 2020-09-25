import React from 'react';
import PropTypes from 'prop-types';
import lstrings from '../../utils/LStrings';
import { Panel } from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor'
import TablePlain from '../table-plain/TablePlain';
import PermissionChecker from '../permission-checker/PermissionChecker';
import TableBCRA from './components/table-bcra/TableBCRA';
import TableChequesRechazados from './components/TableChequesRechazados';
import { map } from 'lodash';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class PanelSituacionFinanciera extends React.Component {

    onRequestInfo = (infoKey, infoTitle) => {
        this.props.onRequestInfo(lstrings.situacionFinanciera_title, infoTitle);
    }

	render() {
		let titulo = <h2><i className="fa fa-usd"></i>  {lstrings.situacionFinanciera_title}</h2>;

		return (
			<ScrollableAnchor id={'panel-situacionfinanciera'}>
				<Panel collapsible defaultExpanded header={titulo}>
					{this.props.info &&
						<PermissionChecker
							infoKey='bancoOpera'
							infoTitle={lstrings.bancosopera_title}
							data={this.props.info.bancoOpera}
							onRequestInfo={this.onRequestInfo}
							hidePanels={this.props.hidePanels}
						>
							{
								this.props.info.bancoOpera &&
								<TablePlain
									columns={[lstrings.bancos, lstrings.titular, lstrings.otros]}
									rows={map(this.props.info.bancoOpera.datos, (item, ix) =>
										<tr key={ix}>
											<td>{item.banco}</td>
											<td>{item.titular}</td>
											<td>{item.otros}</td>
										</tr>
									)}
								/>
							}
						</PermissionChecker>
					}

					<PermissionChecker
						infoKey='informacionBcra'
						infoTitle={lstrings.infobcra_pdf_title}
						data={this.props.morosidad.informacionBcra}
						onRequestInfo={this.onRequestInfo}
						noCount hidePanels={this.props.hidePanels}
					>
						<TableBCRA
							data={this.props.morosidad.informacionBcra}
							onRequestInfo={this.onRequestInfo}
							hidePanels={this.props.hidePanels}
						/>
					</PermissionChecker>

					<PermissionChecker
						infoKey='chequesRechazados'
						infoTitle={lstrings.chequesrechazados_title}
						data={this.props.morosidad.chequesRechazados}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						<TableChequesRechazados
							data={this.props.morosidad.chequesRechazados}
							onRequestInfo={this.onRequestInfo}
							hidePanels={this.props.hidePanels}
						/>
					</PermissionChecker>

					<PermissionChecker
						infoKey='deudoresBancoCentral'
						infoTitle={lstrings.deudoresbcra_title}
						data={this.props.morosidad.deudoresBancoCentral}
						onRequestInfo={this.onRequestInfo}
						hidePanels={this.props.hidePanels}
					>
						{
							this.props.morosidad.deudoresBancoCentral &&
							<TablePlain
								columns={[
									lstrings.entidad
								]}
								rows={map(this.props.morosidad.deudoresBancoCentral.datos, (item, ix) =>
									<tr key={ix}>
										<td>{item.entidad}</td>
									</tr>)
								}
							/>
						}
					</PermissionChecker>
					
				</Panel>
			</ScrollableAnchor>
		);
	}
}

PanelSituacionFinanciera.propTypes = {
    info: PropTypes.any.isRequired,
    morosidad: PropTypes.any.isRequired,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
};

export default PanelSituacionFinanciera;

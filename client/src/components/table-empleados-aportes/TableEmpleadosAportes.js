import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { Alert, Button } from 'react-bootstrap';
import TableUtils from '../../utils/TableUtils';
import NominaDialog from './components/NominaDialog';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class TableEmpleadosAportes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialog: {
                show: false,
                info: []
            },
            data: null,
            quanity: 0,
            quanityValidation:0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.processData(nextProps.data));
    }

    processData = (data) => {
        if (data.datos == null)
            return null;
        
        let cant = 0;
        data.datos.forEach(item => {
            cant += item.cantidadEmpleados;
        });

        return { 
            data: orderBy(data.datos, ['periodo'], ['desc']),
            quanity: data.cantTotal,
            quanityValidation: cant
        };
    }

    empleadosFormat = (cell, row) => {
        let onClick = () => {
            this.setState({
                dialog: {
                    show: true,
                    title: `Nómina de empleados año ${row.periodo}`,
                    info: cell
                }
            });
        }

        if (row.cantidadEmpleados > 0) {
            return <Button onClick={onClick}>Ver nómina</Button>
        } else {
            return <span></span>
        }

    }

    onCloseDialog = () => {
        this.setState({
            dialog: {
                show: false,
                info: []
            }
        });
    }

    onClick = () => {
        this.props.onRequestInfo(this.props.infoKey, this.props.infoTitle);
    }

    render() {
		let counter = (<p>Cantidad de registros: {this.state.quanity} </p>);
		
        let moreInfo = (
            <Alert bsStyle="info" className="text-center">
                <p>
                    <Button onClick={this.onClick}>Solicitar {this.props.infoTitle} completo</Button>
                </p>
            </Alert>
		);
		
        return (
            <div>
                <NominaDialog show={this.state.dialog.show} title={this.state.dialog.title} info={this.state.dialog.info} onCloseDialog={this.onCloseDialog} />
                <BootstrapTable data={this.state.data}
                    options={TableUtils.defaultConfig()}>
                    <TableHeaderColumn dataField="periodo" isKey>Año</TableHeaderColumn>
                    <TableHeaderColumn dataField="cantidadEmpleados">Cantidad de empleados</TableHeaderColumn>
                    {!this.props.sinNomina && <TableHeaderColumn dataField="empleados" dataFormat={this.empleadosFormat}>Nómina de empleados</TableHeaderColumn>}
                </BootstrapTable>
                { this.state.quanity > 0 && counter }
                { this.state.quanity > 0 && this.state.quanityValidation < this.props.data.cantTotal && moreInfo }
            </div>
        );
    }
}

TableEmpleadosAportes.propTypes = {
    data: PropTypes.any,
    sinNomina: PropTypes.bool,
    onRequestInfo: PropTypes.func,
    infoTitle: PropTypes.string,
    infoKey: PropTypes.string
};
TableEmpleadosAportes.defaultProps = {
    sinNomina: false
}
export default TableEmpleadosAportes;

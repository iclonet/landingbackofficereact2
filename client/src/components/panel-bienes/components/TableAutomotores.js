import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import TableUtils from '../../../utils/TableUtils';
import { reduce, sortBy, filter, find } from 'lodash';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class TableAutomotores extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.processData(props.autos.datos, props.embargos.datos)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.processData(nextProps.autos.datos, nextProps.embargos.datos)
        });
    }

    processData = (data, embargos) => {
        if (data == null)
            return null;

        if (embargos == null)
            embargos = [];
        let auxId = 0;
        let result = reduce(data, (result, value) => {
            let item = find(result, (x) => x.anioModelo === value.anioModelo && x.origen === value.origen && x.porcentaje === value.porcentaje);
            if (item === undefined || item === false) {
                auxId++;
                item = {
                    id: auxId,
                    anioModelo: value.anioModelo,
                    origen: value.origen,
                    porcentaje: value.porcentaje,
                    cantidad: 0,
                    vehiculos: []
                };
                result.push(item);
            }
            let itemEmbargos = filter(embargos, (x) => x.dominio === value.dominio);
            item.vehiculos.push({
                dominio: value.dominio,
                marca: value.marca,
                modelo: value.modelo,
                tipo: value.tipo,
                embargos: itemEmbargos === undefined ? [] : itemEmbargos
            });
            item.cantidad++;
            return result;
        }, []);
        return sortBy(result, ['anioModelo', 'origen', 'porcentaje'], ['asc', 'desc', 'asc']);
    }

    expandedRow = (row) => {
        let rows = [];
        let auxid = 0;
        row.vehiculos.forEach(item => {
            auxid++;
            rows.push(<tr key={auxid}>
                <td>{item.dominio}</td>
                <td>{item.marca}</td>
                <td>{item.modelo}</td>
                <td>{item.tipo}</td>
            </tr>);
            item.embargos.forEach(x => {
                auxid++;
                rows.push(<tr key={auxid}><td colSpan="3" style={{color:"red"}}>{`El vehículo posee un embargo, deuda: ${TableUtils.ARSFormat(x.deuda)} , valuación: ${TableUtils.ARSFormat(x.valuacion)}`}</td></tr>);
            });
        });

        return (
            <Table striped bordered condensed fill responsive>
                <thead>
                    <tr>
                        <td>Dominio</td>
                        <td>Marca</td>
                        <td>Modelo</td>
                        <td>Tipo</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

    render() {
        return (
                <BootstrapTable data={this.state.data}
                    expandableRow={() => true}
                    expandComponent={this.expandedRow}
                    options={TableUtils.defaultConfig()}>
                    <TableHeaderColumn dataField="id" width='30' dataFormat={TableUtils.plusButtonFormat} isKey></TableHeaderColumn>
                    <TableHeaderColumn dataField="anioModelo">Modelo</TableHeaderColumn>
                    <TableHeaderColumn dataField="origen" >Origen</TableHeaderColumn>
                    <TableHeaderColumn dataField="porcentaje" dataFormat={TableUtils.percentageFormat}>Porcentaje</TableHeaderColumn>
                    <TableHeaderColumn dataField="cantidad" >Cantidad</TableHeaderColumn>
                </BootstrapTable>
            )
    }
}

TableAutomotores.propTypes = {
    autos: PropTypes.any,
    embargos: PropTypes.any,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
};

export default TableAutomotores;

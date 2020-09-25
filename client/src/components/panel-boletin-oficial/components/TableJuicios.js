import React from 'react';
import PropTypes from 'prop-types';
import { map, merge } from 'lodash';
import TableUtils from '../../../utils/TableUtils';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class TableJuicios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.processData(props.data.datos)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.processData(nextProps.data.datos)
        });
    }

    processData = (data) => {
        if( data == null)
            return null;
        
        return map(data, (item,ix) => {
            let x = {
                ix : ix
            };
            return merge(x, item);
        });
    }

    gridOptions = () => {
        return TableUtils.defaultConfig();
    }

    expandedRow = (row) => {
        return (
            <p className="large-text">{row.texto}</p>
        );
    }

    render() {

        return (
            <BootstrapTable data={this.state.data}
                expandableRow={() => true}
                expandComponent={this.expandedRow}
                options={this.gridOptions()}>
                <TableHeaderColumn dataField="ix" isKey width='30' dataFormat={TableUtils.plusButtonFormat} ></TableHeaderColumn>
                <TableHeaderColumn dataField="expediente" width='100' >Expediente</TableHeaderColumn>
                <TableHeaderColumn dataField="demandado" >Demandado</TableHeaderColumn>
                <TableHeaderColumn dataField="fecha" width='100' dataFormat={TableUtils.dateFormat}>Fecha</TableHeaderColumn>
                <TableHeaderColumn dataField="actor" >Actor</TableHeaderColumn>
                <TableHeaderColumn dataField="provincia" >Provincia</TableHeaderColumn>
                <TableHeaderColumn dataField="personas" >Personas</TableHeaderColumn>
                <TableHeaderColumn dataField="objeto" >Objeto</TableHeaderColumn>
                <TableHeaderColumn dataField="juzgado" >Juzgado</TableHeaderColumn>
            </BootstrapTable>
        );
    }

}

TableJuicios.propTypes = {
    data: PropTypes.array
}

export default TableJuicios;



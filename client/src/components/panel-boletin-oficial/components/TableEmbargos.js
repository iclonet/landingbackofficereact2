import React from 'react';
import PropTypes from 'prop-types';
import { map, merge } from 'lodash';
import TableUtils from '../../../utils/TableUtils';
import TablePlain from '../../table-plain/TablePlain'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class TableEmbargos extends React.Component {

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
            <TablePlain title={'Oficio levantamiento'}
                columns={['Caratula', 'Juzgado', 'Domicilio', 'Teléfono']}
                rows={[(<tr key={0}>
                    <td>{row.caratula}</td>
                    <td>{row.juzgado}</td>
                    <td>{row.domicilio}</td>
                    <td>{row.telefono}</td>
                </tr>)]} />
        );
    }

    verReferencias = () => {
        this.setState({
            verReferencias: !this.state.verReferencias
        });
    }

    render() {

        return (
                <BootstrapTable data={this.state.data}
                    expandableRow={() => true}
                    expandComponent={this.expandedRow}
                    options={this.gridOptions()}>
                    <TableHeaderColumn dataField="ix" isKey hidden></TableHeaderColumn>
                    <TableHeaderColumn dataField="nrooficio" width='30' dataFormat={TableUtils.plusButtonFormat} ></TableHeaderColumn>
                    <TableHeaderColumn dataField="fecha" dataFormat={TableUtils.dateFormat}>Fecha</TableHeaderColumn>
                    <TableHeaderColumn dataField="nrooficio" >Nro. Oficio</TableHeaderColumn>
                    <TableHeaderColumn dataField="expediente" >Expediente</TableHeaderColumn>
                    <TableHeaderColumn dataField="caratula" >Embargo</TableHeaderColumn>
                    <TableHeaderColumn dataField="fechaLevantamiento" dataFormat={TableUtils.dateFormat}>Fecha Levantamiento</TableHeaderColumn>
                </BootstrapTable>
        );
    }

}

TableEmbargos.propTypes = {
    data: PropTypes.array,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
}

export default TableEmbargos;

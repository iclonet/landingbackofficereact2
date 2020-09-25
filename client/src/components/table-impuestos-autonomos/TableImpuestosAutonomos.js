import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import lstrings from '../../utils/LStrings';
import { Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import TableUtils from '../../utils/TableUtils';
import { flatMap, forEach } from 'lodash';
import PermissionChecker from '../permission-checker/PermissionChecker';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class TableImpuestosAutonomos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.processData(props.info ? props.info.datos : null)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.processData(nextProps.info ? nextProps.info.datos : null)
        });
    }

    processData = (data) => {
        if (data == null)
            return null;
        let info = {};

        forEach(data, (item) => {
            if (item.periodo === null)
                return;

            let periodo = moment(item.periodo);
            let agno = periodo.year();
            let mes = periodo.month();


            if (!info[agno]) {
                info[agno] = {
                    anio: agno,
                    contriSocial: 0,
                    contriAutonomo: 0,
                    autonomo: 0,
                    segSocial: 0,
                    monotributo: 0,
                    total: 0,
                    meses: []
                };

                for (let x = 0; x < 12; x++)
                    info[agno].meses.push({
                        contriSocial: 0,
                        contriAutonomo: 0,
                        autonomo: 0,
                        segSocial: 0,
                        monotributo: 0,
                        total: 0
                    });

            }

            info[agno].contriSocial += item.contriSocial;
            info[agno].contriAutonomo += item.contriAutonomo;
            info[agno].autonomo += item.autonomo;
            info[agno].segSocial += item.segSocial;
            info[agno].monotributo += item.monotributo;
            info[agno].total += item.contriSocial + item.contriAutonomo + item.autonomo + item.segSocial + item.monotributo;

            info[agno].meses[mes].contriSocial += item.contriSocial;
            info[agno].meses[mes].contriAutonomo += item.contriAutonomo;
            info[agno].meses[mes].autonomo += item.autonomo;
            info[agno].meses[mes].segSocial += item.segSocial;
            info[agno].meses[mes].monotributo += item.monotributo;
            info[agno].meses[mes].total += item.contriSocial + item.contriAutonomo + item.autonomo + item.segSocial + item.monotributo;

        });


        let result = flatMap(info, (x) => x);

        return result;
    }

    expandedRow = (row) => {
        return (
            <Table striped bordered condensed fill responsive>
                <thead>
                    <tr>
                        <td>Mes</td>
                        <td>Monotributo</td>
                        <td>Monotributo autónomo</td>
                        <td>Monotributo seg. social</td>
                        <td>Contribución autónomo</td>
                        <td>Contribución seg. social autónomos</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {row.meses.map((item, ix) => <tr key={ix}>
                        <td>{TableUtils.monthFormat(ix)}</td>
                        <td>{TableUtils.ARSFormat(item.monotributo)}</td>
                        <td>{TableUtils.ARSFormat(item.autonomo)}</td>
                        <td>{TableUtils.ARSFormat(item.segSocial)}</td>
                        <td>{TableUtils.ARSFormat(item.contriAutonomo)}</td>
                        <td>{TableUtils.ARSFormat(item.contriSocial)}</td>
                        <td>{TableUtils.ARSFormat(item.total)}</td>
                    </tr>)}
                </tbody>
            </Table>
        );
    }

    render() {
        return <PermissionChecker infoKey='pagosImpuestos' infoTitle={lstrings.impuesto_title} data={this.props.info}
            onRequestInfo={this.onRequestInfo} hidePanels={this.props.hidePanels} >
            <BootstrapTable data={this.state.data}
                expandableRow={() => true}
                expandComponent={this.expandedRow}
                options={TableUtils.defaultConfig()}>
                <TableHeaderColumn dataField="anio" width='30' dataFormat={TableUtils.plusButtonFormat} ></TableHeaderColumn>
                <TableHeaderColumn dataField="anio" isKey>Período</TableHeaderColumn>
                <TableHeaderColumn dataField="monotributo" dataFormat={TableUtils.ARSFormat}>Monotributo</TableHeaderColumn>
                <TableHeaderColumn dataField="autonomo" dataFormat={TableUtils.ARSFormat}>Monotributo autónomo</TableHeaderColumn>
                <TableHeaderColumn dataField="segSocial" dataFormat={TableUtils.ARSFormat}>Monotributo seg. social</TableHeaderColumn>
                <TableHeaderColumn dataField="contriAutonomo" dataFormat={TableUtils.ARSFormat}>Contribución autónomo</TableHeaderColumn>
                <TableHeaderColumn dataField="contriSocial" dataFormat={TableUtils.ARSFormat}>Contribución seg. social autónomos</TableHeaderColumn>
                <TableHeaderColumn dataField="total" dataFormat={TableUtils.ARSFormat}>Total</TableHeaderColumn>
            </BootstrapTable>
        </PermissionChecker>
    }
}

TableImpuestosAutonomos.propTypes = {
    info: PropTypes.any,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
};

export default TableImpuestosAutonomos;

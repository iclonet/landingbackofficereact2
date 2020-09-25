import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import TableUtils from '../../../../utils/TableUtils';
import Session from '../../../../utils/Session';
import Validations from '../../../../utils/Validations';
import './TableUsers.css';

class TableUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.processData(props.data)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.processData(nextProps.data)
        });
    }

    processData(data) {
        if (data === null)
            return [];

        return data;
    }

    rolFormat(value) {
        return Validations.userIsAdmin(value) ? 'Administrador' : 'Usuario consulta';
    }

    actionFormat = (cell, row) => {
        let onDeleteClick = () => {
            this.props.onDeleteUser(row);
        }

        let onModifyClick = () => {
            this.props.onModifyUser(row);
        }

        return (
            <span>
                <Button bsStyle="secondary" onClick={onModifyClick}>Modificar</Button>
                {row.usuario !== Session.getUser().userName && <Button bsStyle="secondary" onClick={onDeleteClick}>Eliminar</Button>}
            </span>
        );
    }

    render() {
        return (
            <div>
                <BootstrapTable data={this.state.data}
                    options={TableUtils.defaultConfig()}>
                    <TableHeaderColumn dataField="usuario" isKey>Usuario</TableHeaderColumn>
                    <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="roles" dataFormat={this.rolFormat}>Rol</TableHeaderColumn>
                    <TableHeaderColumn dataField="usuario" dataFormat={this.actionFormat}>&nbsp;</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

TableUsers.propTypes = {
    data: PropTypes.array.isRequired,
    onDeleteUser: PropTypes.func,
    onModifyUser: PropTypes.func
};

export default TableUsers;
import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import TableUtils from '../../utils/TableUtils';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class ResultadoBusquedaFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datos: this.procesarDatos(props.datos) }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      datos: this.procesarDatos(nextProps.datos)
    });
  }

  procesarDatos(datos) {
    return datos;
  }

  onRowClick = (row) => {
    this.props.onResultadoSeleccionado(row.cuil,row.tipoTitular === 'Persona');
  }

  render() {
    const table_options = TableUtils.defaultConfig({ pagination: true },
      {
        onRowClick: this.onRowClick,
        onPageChange: this.props.onPageChange,
        page: this.props.currentPage,
        sizePerPage: 100
      });

    return (
      <BootstrapTable data={this.state.datos} remote={true} options={table_options}
        fetchInfo={{ dataTotalSize: this.props.totalDataSize }}
        striped={true} pagination>
        <TableHeaderColumn width="350px" dataField="nombre" dataSort={true}>Nombre</TableHeaderColumn>
        <TableHeaderColumn width="150px" dataField="cuil" isKey={true} dataSort={true}>CUIL/CUIT</TableHeaderColumn>
      </BootstrapTable>
    );
  }

  static propTypes = {
    datos: PropTypes.array,
    onResultadoSeleccionado: PropTypes.func,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number,
    totalDataSize: PropTypes.number
  }
}


export default ResultadoBusquedaFull;

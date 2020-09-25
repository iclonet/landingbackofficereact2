import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import lstrings from '../../../utils/LStrings';
import TablePlain from '../../table-plain/TablePlain';
import TableUtils from '../../../utils/TableUtils';
import { flatMap, forEach, map } from 'lodash';
import PermissionChecker from '../../permission-checker/PermissionChecker';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class TableFacturacion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.processData(props.info.datos)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.processData(nextProps.info.datos)
        });
    }

    processData = (data) => {
        if (data == null)
            return null;
        let info = {};

        forEach(data, (item) => {
            if (item.fecha === null)
                return;

            let periodo = moment(item.fecha);
            let hash = periodo.year().toString() + item.cuit.toString();


            if (!info[hash]) {
                info[hash] = {
                    anio: periodo.year(),
                    cuit: item.cuit,
                    compras: 0,
                    ventas: 0
                };
            }

            info[hash].compras += numeral(this.fixDecimals(item.totalcompras)).value();
            info[hash].ventas += numeral(this.fixDecimals(item.facturacionestimada)).value();
        });


        let result = flatMap(info, (x) => x);

        return result;
    }

    fixDecimals = (value) => {
        for(let x = value.length; x > 0; x--)
        {
            if (value[x] == '.') {
                value = value.replace(",","").replace(".",",");
                break;
            }
        }
        return value;
    }


    render() {
        return (
                <TablePlain columns={['Año', 'CUIT', 'Ventas', 'Compras']}
                    rows={map(this.state.data, (item, ix) => <tr key={ix}>
                        <td>{item.anio}</td>
                        <td>{TableUtils.cuitFormat(item.cuit)}</td>
                        <td>{TableUtils.ARSFormat(item.ventas)}</td>
                        <td>{TableUtils.ARSFormat(item.compras)}</td>
                    </tr>)} />
            )
    }
}

TableFacturacion.propTypes = {
    info: PropTypes.any,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any
};

export default TableFacturacion;

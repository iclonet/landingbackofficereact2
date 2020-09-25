import React from 'react';
import PropTypes from 'prop-types';
import {
    Table
} from 'react-bootstrap';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import spinner from '../../images/spinner.gif'

function TablePlain(props) {

    let footer;
    let text;
    let style = "";

    if (props.fixed) {
        style += "tableFixed";
    }

	if (props.rows.length === 0) {
		footer = <tfoot>
			<tr>
				<td colSpan={props.columns.length}>
					{props.waitingMessage
						? <div>
								{props.waitingMessage}
								<img src={spinner} alt="loading..."/>
							</div>
						: 'No hay registros para mostrar'}
				</td>
			</tr>
		</tfoot>;
	} else if (props.showCount) {
		text = <p>Cantidad de registros: {props.rows.length}
		</p>
	}

	return (
		<div>
			{props.title && <h2>{props.title}</h2>}
			<Table striped bordered condensed fill responsive className={style}>
				<thead>
					<tr>
						{props
							.columns
							.map((item, ix) => {
								let width = '';
								if (ix == 0 && props.columns.length == 2) 
									width = '10%';
								
								return <td width={width} key={ix}>{item}</td>
							})}
					</tr>
				</thead>
				<tbody>
					{props.rows}
				</tbody>
				{footer}
			</Table>
			{text}
		</div>
	);
}

TablePlain.propTypes = {
	title: PropTypes.string,
	columns: PropTypes.array,
	rows: PropTypes.array,
	fixed: PropTypes.bool,
	showCount: PropTypes.bool
};

TablePlain.defaultProps = {
	columns: [],
	rows: [],
	showCount: false
}
export default TablePlain;

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import ScoreWidget from "../../scenes/personas/components/personas-detalle/components/ScoreWidget";

class HeaderDetalle extends React.Component {
    render() {
        return (
			<Row>
				<Col sm={7}>
					<h1>
						{this.props.nombre}
					</h1>
					
					<h3><strong>CUIT/CUIL: </strong>{this.props.cuil}</h3>
				</Col>

				<Col sm={5}>
					<div className="pull-right">
						<div style={{ marginTop: '3em', display: 'flex' }}>
							{
								this.props.personScore &&
								<ScoreWidget
									score={this.props.personScore}
									puntaje={this.props.personPuntaje}
								/>
							}
							<Button onClick={this.props.onPrint}><i className="fa fa-print"></i></Button>
						</div>

						<h3 className="pull-right" style={{ marginRight: '5em' }}>
							<strong>Status: </strong>{this.props.status}&nbsp;
							<a onClick={this.props.onStatusDialogShow}><i className="fa fa-search"></i></a>
						</h3>
					</div>
				</Col>

            </Row>
        );
    }
}

HeaderDetalle.propTypes = {
    nombre: PropTypes.string,
    cuil: PropTypes.any,
    personScore: PropTypes.string,
    personPuntaje: PropTypes.number,
    status: PropTypes.string,
    onStatusDialogShow: PropTypes.func,
    onPrint: PropTypes.func,
}

export default HeaderDetalle;

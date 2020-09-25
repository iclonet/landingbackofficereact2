import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';

class PermissionChecker extends React.Component {

    onClick = () => {
        this.props.onRequestInfo(this.props.infoKey, this.props.infoTitle);
    }

    render() {
        if(this.props.hidePanels){
            if(this.props.hidePanels.find((x) => x === this.props.infoKey ) != undefined) {
                return <div></div>;
            }
        }

        let renderChild = null;
        let moreInfo = null;
        let showCount = null;

        if (this.props.data != null) {
            renderChild = this.props.children;
            if(this.props.data.cantTotal != null) {
                if(this.props.data.cantTotal > 0) {
                    showCount = !this.props.noCount ? (
                        <p>Cantidad de registros: {this.props.data.cantTotal} </p>
                    ) : (<p></p>);
                    if(this.props.data.cantTotal > this.props.data.datos.length && !this.props.noMoreBtn) {
                        moreInfo = (
                            <Alert bsStyle="info" className="text-center">
                                <p>
                                    <Button onClick={this.onClick}>Solicitar {this.props.infoTitle} completo</Button>
                                </p>
                            </Alert>
                        );
                    }
                }
            }
        } else {
            renderChild = (
                <Alert bsStyle="info" className="text-center">
                    <h5>No tiene permisos para visualizar este bloque de información</h5>
                    <p>
                        <Button onClick={this.onClick}>Solicitar información</Button>
                    </p>
                </Alert>
            );
        }

        const title = (this.props.infoTitle.length > 0) ? (<h2>{ this.props.infoTitle }</h2>) : '';

        return (
            <div>
                { title }
                {renderChild}
                {showCount}
                {moreInfo}

            </div>
        );
    }

}

PermissionChecker.propTypes = {
    infoTitle: PropTypes.string,
    infoKey: PropTypes.string,
    data: PropTypes.any,
    noCount: PropTypes.bool,
    noMoreBtn: PropTypes.bool,
    onRequestInfo: PropTypes.func,
    hidePanels: PropTypes.any,
    children: PropTypes.any
}

export default PermissionChecker;

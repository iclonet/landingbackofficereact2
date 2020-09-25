import React from 'react'
import PropTypes from 'prop-types';
import QuestionDialog from '../question-dialog/QuestionDialog';

class RequestInfoDialog extends React.Component {

    onAccept = () => {
        this.props.onResult(true);
    }

    onCancel = () => {
        this.props.onResult(false);
    }

    render() {

        let body = (<div>
            <h4>Usted ha solicitado información sobre {this.props.subBlockName}</h4>
            <p>La solicitud de información puede contener cargos adicionales</p>
            <p>Para más información comuníquese con nosotros</p>
        </div>);

        return <QuestionDialog show={this.props.show}
            title={`Solicitar información - ${this.props.blockName}`}
            message={body}
            onAccept={this.onAccept}
            onCancel={this.onCancel} />
    }
}

RequestInfoDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    blockName: PropTypes.string,
    subBlockName: PropTypes.string,
    onResult: PropTypes.func
};

export default RequestInfoDialog;
import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


class InputText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dirty: false,
            valid: false
        };
    }

    onValueChange = (ev) => {
        let value = ev.target.value;
        let valid = true;
        if (this.props.validationRule != null)
            valid = this.props.validationRule(value);

        this.props.onChange({ value: ev.target.value, valid: valid });
        this.setState({ dirty: true, valid: valid });
    }

    render() {

        return (
            <FormGroup validationState={(this.state.dirty || this.props.forceValidation) && !this.state.valid ? 'error' : ''}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl type={this.props.type}
                    value={this.props.value}
                    onChange={this.onValueChange}
                    placeholder={this.props.placeholder} />
                {(this.state.dirty || this.props.forceValidation) && !this.state.valid && <HelpBlock>{this.props.validationMessage}</HelpBlock>}
            </FormGroup>
        );
    }

}

InputText.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    forceValidation: PropTypes.bool,
    validationRule: PropTypes.func,
    validationMessage: PropTypes.string,
    onChange: PropTypes.func
}
InputText.defaultProps = {
    type:'text'
}

export default InputText;
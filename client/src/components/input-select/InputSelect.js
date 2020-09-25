import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class InputSelect extends React.Component {

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

    generateOptions = (options) => {
        let selectedValue = this.props.value;
        return options.map((item, ix) =>
            <option key={ix} value={item.value} selected={item.value === selectedValue}>{item.desc}</option>
        );
    }

    render() {

        return (
            <FormGroup validationState={(this.state.dirty || this.props.forceValidation) && !this.state.valid ? 'error' : ''}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl componentClass="select" onChange={this.onValueChange}>
                    {this.generateOptions(this.props.options)}
                </FormControl>
                {(this.state.dirty || this.props.forceValidation) && !this.state.valid && <HelpBlock>{this.props.validationMessage}</HelpBlock>}
            </FormGroup>
        );
    }

}

InputSelect.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array,
    forceValidation: PropTypes.bool,
    validationRule: PropTypes.func,
    validationMessage: PropTypes.string,
    onChange: PropTypes.func
}
InputSelect.defaultProps = {
    options: [],
    value: null
}

export default InputSelect;
import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, ControlLabel, HelpBlock,Checkbox } from 'react-bootstrap';

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

        this.props.onChange({ value: value, valid: valid });
        this.setState({ dirty: true, valid: valid });
    }

    render() {

        return (
            <FormGroup validationState={(this.state.dirty || this.props.forceValidation) && !this.state.valid ? 'error' : ''}>
                <Checkbox>{this.props.label}</Checkbox>
                <DatePicker value={this.props.value} onChange={this.onValueChange}/>
                {(this.state.dirty || this.props.forceValidation) && !this.state.valid && <HelpBlock>{this.props.validationMessage}</HelpBlock>}
            </FormGroup>
        );
    }

}

InputSelect.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    maxDate:PropTypes.string,
    forceValidation: PropTypes.bool,
    validationRule: PropTypes.func,
    validationMessage: PropTypes.string,
    onChange: PropTypes.func
}

export default InputSelect;
import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-16-bootstrap-date-picker'
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';


const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

class InputSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dirty: false,
            valid: false
        };
    }

    onValueChange = (value) => {
        let valid = true;
        if (this.props.validationRule != null)
            valid = this.props.validationRule(value);

        this.props.onChange({ value: value, valid: valid });
        this.setState({ dirty: true, valid: valid });
    }

    render() {

        return (
            <FormGroup validationState={(this.state.dirty || this.props.forceValidation) && !this.state.valid ? 'error' : ''}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <DatePicker value={this.props.value} onChange={this.onValueChange} maxDate={this.props.maxDate}
                monthLabels={MONTHS} dayLabels={DAYS} showTodayButton todayButtonLabel='Hoy'/>
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
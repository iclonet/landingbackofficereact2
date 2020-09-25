import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, ControlLabel, FormControl, InputGroup, Button, HelpBlock, ProgressBar } from 'react-bootstrap';
import Validations from '../../utils/Validations';

class InputPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            dirty: false,
            showPassword: false
        };
    }

    checkPassword = (password) => {
        if (!password)
            return false;

        if (this.props.compareValue != null)
            return password === this.props.compareValue;

        return Validations.password(password) === 4;
    }

    onValueChange = (ev) => {
        let value = ev.target.value;

        if (this.props.onChange != null)
            this.props.onChange(value, this.checkPassword(value));

        this.setState({
            dirty: true,
            score: Validations.password(value)
        });
    }

    getValidationState = () => {
        if (this.state.dirty || this.props.forceValidation) {
            if (this.checkPassword(this.props.value))
                return 'success';
            else
                return 'error';
        }
        else return '';
    }

    onEyeClick = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {

        let helpBlock = '';
        let isCompare = this.props.compareValue == null;
        if (isCompare)
            helpBlock = 'Debe contener entre 8 y 15 caracteres, una letra mayúscula, un número y uno de los siguientes símbolos: @ # $ % & + =';
        else if (!this.checkPassword(this.props.value) && (this.state.dirty || this.props.forceValidation))
            helpBlock = 'Las contraseñas deben coincidir';

        return (
            <FormGroup validationState={this.getValidationState()}>
                <ControlLabel>{this.props.compareValue != null ? 'Repetir Contraseña' : 'Contraseña'}</ControlLabel>
                <InputGroup>
                    <FormControl type={this.state.showPassword ? "text" : "password"}
                        value={this.props.value} onChange={this.onValueChange} />
                    <InputGroup.Button>
                        <Button onClick={this.onEyeClick}><i className={this.state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i></Button>
                    </InputGroup.Button>
                </InputGroup>
                {isCompare == null && <ProgressBar bsStyle={this.state.score === 4 ? "success" : "danger"} now={100 / 4 * this.state.score} />}
                <HelpBlock>{helpBlock}</HelpBlock>
            </FormGroup>
        );
    }

}

InputPassword.propTypes = {
    value: PropTypes.string.isRequired,
    compareValue: PropTypes.string,
    onChange: PropTypes.func,
    forceValidation: PropTypes.bool
}

export default InputPassword;
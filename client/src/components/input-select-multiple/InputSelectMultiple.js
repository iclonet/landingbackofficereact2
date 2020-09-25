import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl } from 'react-bootstrap';

class InputSelectMultiple extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dirty: false,
            valid: false
        };
    }

    onValueChange = (ev) => {
        this.props.onChange({ value: ev.target.value });
    }

    generateOptions = (options) => {
        return options.map((item, ix) =>
           <option key={ix} value={item.id} >{item.descripcion}</option>
        );
    }

    render() {

        return (
            <FormGroup >
                <FormControl size={5}  multiple={true} componentClass="select" onChange={this.onValueChange} >
                    {this.generateOptions(this.props.options)}
                </FormControl>
            </FormGroup>
        );
    }

}

InputSelectMultiple.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func
}
InputSelectMultiple.defaultProps = {
    options: [],
    value: null
}

export default InputSelectMultiple;
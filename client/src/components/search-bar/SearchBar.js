import React from 'react';
import PropTypes from 'prop-types';
import {
    find
} from 'lodash';
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import {
    PROVINCIAS_SEARCH_OPTIONS,
    NACIONALIDAD_SEARCH_OPTIONS,
    ETARIO_SEARCH_OPTIONS
} from '../../config';
import './SearchBar.css';

class SearchBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selector_value: props.opciones[0].value,
			placeholder: props.opciones[0].desc,
			numberOnly: props.opciones[0].numberOnly,
			carPlate: props.opciones[0].carPlate,
			texto_busqueda: '',
			nombre: '',
			provincia: '',
			nacionalidad: '',
			edadlt: 0,
			edadgt: 0,
		}
	}

	selectorOnChange = (event) => {
		let option = find(this.props.opciones, (item) => item.value === event.target.value);
		this.setState({
			selector_value: option.value,
			placeholder: option.desc,
			numberOnly: option.numberOnly,
			carPlate: option.carPlate,
			texto_busqueda: '',
			nombre: '',
			provincia: '',
			nacionalidad: '',
			edadlt: 0,
			edadgt: 0,
		});
	}

	handleSubmit = () => {
		if (this.state.texto_busqueda.length === 0) {
			return;
		}

		this.props.onBusqueda(this.state.selector_value, this.state.texto_busqueda,
			this.state.nombre,
			this.state.provincia,
			this.state.nacionalidad,
			this.state.edadgt,
			this.state.edadlt);

	}

	onChangeTextoBusqueda = (ev) => {
		let value = ev.target.value;
		if (this.state.numberOnly === true) {
			let regNumber = /^\d*$/g;
			if (!regNumber.test(value))
				return;
		}

		if (this.state.carPlate === true) {
			value = value.toUpperCase();
			let regPlate = /^[A-Z]*|\d*$/g;
			if (!regPlate.test(value))
				return;
		}

		this.setState({
			texto_busqueda: value
		});
	}

	onChangeNombre = (ev) => {
		this.setState({
			nombre: ev.target.value
		});
	}

	onChangeProvincia = (ev) => {
		this.setState({
			provincia: ev.target.value
		});
	}
	onChangeNacionalidad = (ev) => {
		this.setState({
			nacionalidad: ev.target.value
		});
	}
	onChangeRangoEtario = (ev) => {
		let edadgt = ev.target.value.split('|')[0];
		let edadlt = ev.target.value.split('|')[1];

		this.setState({
			edadlt: edadlt,
			edadgt: edadgt
		});
	}

	handleEnterPress = (ev) => {
		if (ev.key === 'Enter') {
			this.handleSubmit();
		}
	}

    mapOptions = (array) => {
        return array.map((opt, ix) => <option key={ix} value={opt.value}>{opt.desc}</option>);
    }

    searchPersona = (allFields) => {
        if (!allFields) {
            return (
                <FormGroup className="search-text" onChange={this.onChangeTextoBusqueda}>
                    <FormControl
                        placeholder={"Buscar " + this.state.placeholder}
                        value={this.state.texto_busqueda}
                        onKeyPress={this.handleEnterPress}></FormControl>
                </FormGroup>
            );
        }

        return (
            <div className="searchbar-form">
                <FormGroup className="search-apellido" onChange={this.onChangeTextoBusqueda}>
                    <FormControl
                        placeholder={"Apellido"}
                        value={this.state.texto_busqueda}
                        onKeyPress={this.handleEnterPress}></FormControl>
                </FormGroup>
                <FormGroup className="search-nombre" onChange={this.onChangeNombre}>
                    <FormControl
                        placeholder={"Nombre"}
                        value={this.state.nombre}
                        onKeyPress={this.handleEnterPress}></FormControl>
                </FormGroup>
                <FormGroup className="search-selector-prov">
                    <FormControl
                        componentClass="select"
                        defaultValue="placeholder"
                        onChange={this.onChangeProvincia}>
                        <option value="placeholder" disabled>Provincias</option>
                        {this.mapOptions(PROVINCIAS_SEARCH_OPTIONS)}
                    </FormControl>
                </FormGroup>
                <FormGroup className="search-selector-nacionalidad">
                    <FormControl
                        componentClass="select"
                        defaultValue="placeholder"
                        onChange={this.onChangeNacionalidad}>
                        <option value="placeholder" disabled>Nacionalidad</option>
                        {this.mapOptions(NACIONALIDAD_SEARCH_OPTIONS)}
                    </FormControl>
                </FormGroup>
                <FormGroup className="search-selector-etario">
                    <FormControl
                        componentClass="select"
                        defaultValue="placeholder"
                        onChange={this.onChangeRangoEtario}>
                        <option value="placeholder" disabled>Rango etario</option>
                        {this.mapOptions(ETARIO_SEARCH_OPTIONS)}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="searchbar-form">
                    <FormGroup className="search-selector">
                        <FormControl
                            componentClass="select"
                            onChange={this.selectorOnChange}
                            value={this.state.selector_value}>
                            {this.mapOptions(this.props.opciones)}
                        </FormControl>
                    </FormGroup>
                    {this.searchPersona(this.state.selector_value === 'apellido')}
                    <div className="search-button">
                        <Button
                            onClick={this.handleSubmit}
                            bsStyle="primary"
                            className={(this.state.texto_busqueda.length === 0)
                            ? 'disabled'
                            : ''}>
                            Buscar
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
	opciones: PropTypes.array,
	onBusqueda: PropTypes.func
}

export default SearchBar;

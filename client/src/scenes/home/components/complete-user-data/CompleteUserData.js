import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Col, InputGroup, Modal, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form } from 'react-bootstrap';

import ReCAPTCHA from 'react-google-recaptcha';
import UiUtils from '../../../../utils/UiUtils';
import ApiClient from '../../../../utils/ApiClient';
import './CompleteUserData.css';


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

function FieldGroupCelular({ value1, value2, onchange1,onchange2 }){
    return( 
        <div>
          <ControlLabel>Celular</ControlLabel>
                <br/>
                   <Col className="Col-Form-Demo"  xs={4}>
                    <FormGroup   onChange={onchange1}>
                     <InputGroup>
                      <InputGroup.Addon>0</InputGroup.Addon>   
                       <FormControl
                        required="true" 
                        type="text"
                        pattern="[0-9]{2,4}" 
                        placeholder="Caracteristica" 
                        value={value1} />
                      </InputGroup>   
                    </FormGroup>
                   </Col> 
                   <Col className="Col-Form-Demo" xs={8}>            
                    <FormGroup  onChange={onchange2}>
                     <InputGroup>
                      <InputGroup.Addon>15</InputGroup.Addon>       
                      <FormControl 
                       required="true"  
                       type="text"
                       pattern="[0-9]{6,8}"  
                       placeholder="Número" 
                       value={value2}/>
                     </InputGroup>    
                    </FormGroup>
                   </Col>
        </div>
       )
}

class CompleteUserData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            documento:'',
            area:'',
            telefono:'', 
            email: '',
            data: this.props.data,
            isShowing: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps (nextProps)  {
        if(nextProps.mostrarCompleteUserData && !this.state.isShowing){
            this.setState( this.prepareStateFromProps(nextProps));  
        }

    }

    prepareStateFromProps(props){
        var ret = {
            nombre: props.data.nombre ? props.data.nombre : '',
            apellido: props.data.apellido ? props.data.apellido :'',
            documento:props.data.documento ? props.data.documento :'',
            area:props.data.area ? props.data.area :'',
            telefono:props.data.telefono ? props.data.telefono : '', 
            email: props.data.email ? props.data.email : '',
            isShowing: true
          }
      return ret;
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value 
        });
    }

    onDocumentoChange = (event) => {
        this.setState({
            documento: event.target.value 
        });
    }

    onNombreChange = (event) => {
        this.setState({
            nombre: event.target.value 
        });
    }

    onApellidoChange = (event) => {
        this.setState({
            apellido: event.target.value 
        });
    }
   
    onAreaChange = (event) => {
        this.setState({
            area: event.target.value 
        });
    }

    onTelefonoChange = (event) => {
        this.setState({
            telefono: event.target.value 
        });
    }
    
    onSendClick = () => {
       

        if (this.state.apellido.length === 0 || this.state.nombre.length === 0 || this.state.email.lengt === 0 ||
             this.state.documento.lengt === 0) {
            UiUtils.showAlert("Error", "Complete todos los campos");
            return;
        } 
        var telefonoCompleto =this.state.area+this.state.telefono;
        if (telefonoCompleto.length !== 10){
            UiUtils.showAlert("Error en nro. celular ", "La cantidad de dígitos no corresponde al formato para celulares");
            return;
        }

            UiUtils.showProgress(true);
            const final = () => {
                UiUtils.showProgress(false);
                this.props.onCerrarCompleteUserData();
            }
            
            ApiClient.completeUserData(this.state)
                .then(function (res) {
                    final();
                    if (res.status === 200) {
                        UiUtils.showAlert("Datos de usuario", "Sus datos fueron completados con éxito.");
                    } else {
                        UiUtils.showProgress(false);
                        UiUtils.showAlert(res.data.title, res.data.message);
                    }
                }).catch(function (error) {
                    UiUtils.showProgress(false);
                    UiUtils.showError (error);
                });
        
    }
    handleSubmit(event){
       this.onSendClick()
        event.preventDefault();
        
    }

    

    render() {
        return (
            <Modal backdrop={'static'} keyboard={false} show={this.props.mostrarCompleteUserData} onHide={this.props.onCancelarCompleteUserData} data={this.props.data} >
                <Modal.Header closeButton>
                    <Modal.Title>Datos de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form lang="es" onSubmit={this.handleSubmit}  >
                    <h4 style={{color:'#00e0aa'}}>Complete sus datos por favor</h4>
                    <FieldGroup
                        required="true"
                        id="nombre"
                        type="text"
                        label="Nombres"
                        placeholder=""
                        value={this.state.nombre}
                        onChange={this.onNombreChange}/>
                    <FieldGroup
                        required="true"
                        id="apellido"
                        type="text"
                        label="Apellido"
                        placeholder=""
                        value={this.state.apellido}
                        onChange={this.onApellidoChange}/>
                    <FieldGroup
                        required="true"
                        id="dni"
                        type="text"
                        label="Número de documento"
                        placeholder=""
                        pattern="[0-9]{7,8}"
                        value={this.state.documento}  
                        onChange={this.onDocumentoChange} />
                    <FieldGroupCelular
                        value1={this.state.area}
                        value2={this.state.telefono}
                        onchange1={this.onAreaChange}
                        onchange2={this.onTelefonoChange}/>
                    <FieldGroup
                       required="true"
                        id="email"
                        type="email"
                        label="Email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                        placeholder=""
                        value={this.state.email}
                        onChange={this.onEmailChange} />
                    <br/>
                    <Modal.Footer>
                        <Button bsStyle="primary" type="submit">Enviar</Button>
                    </Modal.Footer>
                </Form>
                </Modal.Body>
            </Modal >
        );
    }
}
CompleteUserData.propTypes = {
    mostrarCompleteUserData: PropTypes.bool,
    onCerrarCompleteUserData: PropTypes.func,
    onCancelarCompleteUserData: PropTypes.func,
    data: PropTypes.object
}
export default CompleteUserData;



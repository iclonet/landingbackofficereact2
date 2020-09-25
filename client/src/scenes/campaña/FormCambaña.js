import React, { Component, useEffect } from "react";
import { Panel, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

class FormCampaña extends React.Component {
    constructor() {
        super();
        this.state = {
            deshabilitado: false,
            parametros: false,
            nuevo: false,
        };
    }

    guardar = () => {
        if (this.state.deshabilitado === false) {
            this.setState({
                deshabilitado: true,
                parametros: true,
                nuevo: true,
            });
        }
    };

    render() {
        return (
            <div style={{ width: "50%", marginLeft: "15%", marginTop: "5%" }}>
                <h1>Nueva Campaña</h1>
                <Panel header=" ">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <FormGroup
                            style={{
                                width: "50%",
                                alignSelf: "center",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <FormControl
                                style={{ marginBottom: "2%" }}
                                placeholder="Hash"
                                //value={this.state.texto_busqueda}
                                // onKeyPress={this.handleEnterPress}
                            ></FormControl>

                            <FormControl
                                style={{ marginBottom: "2%" }}
                                placeholder="Nombre"
                                //value={this.state.texto_busqueda}
                                // onKeyPress={this.handleEnterPress}
                            ></FormControl>

                            <FormControl
                                style={{ marginBottom: "2%" }}
                                placeholder="Fecha Lanzimiento"
                                //value={this.state.texto_busqueda}
                                // onKeyPress={this.handleEnterPress}
                            ></FormControl>

                            <FormControl
                                style={{ marginBottom: "2%" }}
                                placeholder="Fecha Vencimiento"
                                //value={this.state.texto_busqueda}
                                // onKeyPress={this.handleEnterPress}
                            ></FormControl>

                            <Button
                                style={{
                                    width: "50%",
                                    alignSelf: "center",
                                    marginBottom: "2%",
                                }}
                                bsStyle="primary"
                                disabled={this.state.deshabilitado}
                                onClick={this.guardar}
                            >
                                Guaradar
                            </Button>
                            <Button
                                style={
                                    this.state.nuevo
                                        ? {
                                              width: "50%",
                                              alignSelf: "center",
                                              marginBottom: "2%",
                                          }
                                        : {
                                              display: "none",
                                          }
                                }
                                bsStyle="primary"
                                //onClick={this.guardar}
                            >
                                nuevo
                            </Button>
                            <Button
                                style={
                                    this.state.parametros
                                        ? {
                                              width: "50%",
                                              alignSelf: "center",
                                              marginBottom: "2%",
                                          }
                                        : {
                                              display: "none",
                                          }
                                }
                                bsStyle="primary"
                                //onClick={this.guardar}
                            >
                                Agregar parametros
                            </Button>
                        </FormGroup>
                    </div>
                </Panel>
            </div>
        );
    }
}
export default FormCampaña;

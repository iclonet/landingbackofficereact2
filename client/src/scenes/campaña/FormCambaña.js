import React, { Component, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Panel, Row, Col } from "react-bootstrap";
import { FormGroup, Button } from "react-bootstrap";
import  {createCampaign, hashh} from "../api";
import { FormControl, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
var randomstring = require("randomstring");


const FormCampaña = () => {
    const guardar = () => {
        if (deshabilitado === false) {
            setDeshabilitado(true);
            setParametros(true);
            setNuevo(true);
            formik.handleSubmit();
        }
    };
    const [error, setError] = useState("");
    const [deshabilitado, setDeshabilitado] = useState(false);
    const [parametros, setParametros] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const [campaña, setCampaña] = useState([]);
    const formik = useFormik({
        initialValues: {
            fechaLanzamiento: "",
            fechaVencimiento: "",
            habilitada: false,
            nombre: "",
        },
        onSubmit: (values) => {
            const {
                fechaLanzamiento,
                fechaVencimiento,
                habilitada,
                nombre,
            } = values;
            const cam = {
                fechaLanzamiento,
                fechaVencimiento,
                habilitada,
                nombre,
            };
            createCampaignFunc(values);
            console.log("formik in submit");
            console.log(values);
            console.log(cam);
        },
    });
    async function createCampaignFunc(obj) {
        const res = await createCampaign(obj);
        setCampaña(res.data);
    }
   // const [hashh, setHashh] = useState("");

    const label = (label) => {
    <p id='label'>{label}</p>
    }
    

    useEffect(() => {
        try {
           //setHashh(randomstring.generate(5)); 
        } catch (err) {
            setError(err);
        }
    }, []);

    
    return (
        <div style={{ width: "50%", marginLeft: "15%", marginTop: "5%" }}>
            <h1>Nueva Campaña</h1>
            <Panel header=" ">
                <form
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl
                        style={{
                            width: "50%",
                            alignSelf: "center",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <TextField
                            style={{ marginBottom: "2%", marginTop: "2%" }}
                            placeholder={hashh}
                            disabled={true}
                            id="hash"
                            name="hash"
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginBottom: "2%" }}
                            placeholder="Nombre"
                            label={label("Nombre")}
                            id="nombre"
                            name="nombre"
                            onChange={formik.handleChange}
                            value={formik.values.nombre}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginBottom: "2%" }}
                            placeholder="fecha Lanzamiento"
                            label={label("fecha Lanzamiento")}
                            id="fechaLanzamiento"
                            name="fechaLanzamiento"
                            onChange={formik.handleChange}
                            value={formik.values.fechaLanzamiento}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginBottom: "2%" }}
                            placeholder="Fecha Vencimiento"
                            label={label("Fecha Vencimiento")}
                            id="fechaVencimiento"
                            name="fechaVencimiento"
                            onChange={formik.handleChange}
                            value={formik.values.fechaVencimiento}
                            variant="outlined"
                        />

                        <Button
                            style={{
                                width: "50%",
                                alignSelf: "center",
                                marginBottom: "2%",
                            }}
                            type="submit"
                            bsStyle="primary"
                            disabled={deshabilitado}
                            onClick={guardar}
                        >
                            Guardar
                        </Button>
                        {nuevo == true && (
                            <Button
                                style={{
                                    width: "50%",
                                    alignSelf: "center",
                                    marginBottom: "2%",
                                }}
                                bsStyle="primary"
                                //onClick={this.guardar}
                            >
                                nuevo
                            </Button>
                        )}
                        {parametros == true && (
                            <Button
                                style={{
                                    width: "50%",
                                    alignSelf: "center",
                                    marginBottom: "2%",
                                }}
                                bsStyle="primary"
                                //onClick={this.guardar}
                            >
                                Agregar parametros
                            </Button>
                        )}
                    </FormControl>
                </form>
            </Panel>
        </div>
    );
};
FormCampaña.propTypes = {
    match: PropTypes.object,
};

export default FormCampaña;

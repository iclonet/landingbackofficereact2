import React, { Component, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Panel, Row, Col } from "react-bootstrap";
import { FormGroup, Button } from "react-bootstrap";
import { createCampaign, hashh } from "../api";
import { FormControl, TextField, InputLabel } from "@material-ui/core";
import PropTypes from "prop-types";
var randomstring = require("randomstring");
import * as Yup from "yup";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";


const FormCampaña = () => {


    const useStyles = makeStyles((theme) => ({
        formControl: {
            width: "100%",
        },
        textField: {
            marginTop: theme.spacing(6),
        },
    }));
    const classes = useStyles();
    const guardar = () => {
        if (deshabilitado === false && formik.values.nombre != "" && formik.values.fechaVencimiento != "" && formik.values.fechaLanzamiento != "") {
            setDeshabilitado(true);
            setParametros(true);
            setNuevo(true);
            formik.handleSubmit();
        }
    };
    const nuevaCampaña = () => {
        if ( deshabilitado === true) {
            setDeshabilitado(false);
            setParametros(false);
            setNuevo(false);
            location.reload();
        }
    };
    const nuevaParametros = () => {

    };
    const [error, setError] = useState("");
    const [deshabilitado, setDeshabilitado] = useState(false);
    const [parametros, setParametros] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const [campaña, setCampaña] = useState([]);

    const validation = Yup.object().shape({
        fechaVencimiento: Yup.string().required("requerido"),
        nombre: Yup.string()
            .max(20, "Debe contener 20 caracteres o menos")
            .required("requerido"),
        fechaLanzamiento: Yup.string().required("requerido"),
    });

    const formik = useFormik({
        initialValues: {
            fechaLanzamiento: "",
            fechaVencimiento: "",
            habilitada: false,
            nombre: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            const {
                fechaLanzamiento,
                fechaVencimiento,
                habilitada,
                nombre,
            } = values;
            createCampaignFunc(values);
            console.log("formik in submit");
            console.log(values);
        },
    });
    async function createCampaignFunc(obj) {
        const res = await createCampaign(obj);
        setCampaña(res.data);
    }

    const label = (label) => {
        <p id="label">{label}</p>;
    };

    useEffect(() => {
        try {
            console.log(formik.errors.nombre);
            //setHashh(randomstring.generate(5));
        } catch (err) {
            setError(err);
        }
    }, []);

    return (
        <div
            style={{
                width: "50%",
                marginLeft: "15%",
                marginTop: "5%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <h1 style={{ alignSelf: "center" }}>Nueva Campaña</h1>
            <Divider style={{
                    width: "70%",
                    alignSelf: "center",
                }} />
            <form
                style={{
                    width: "70%",
                    alignSelf: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
                onSubmit={formik.handleSubmit}
            >
                <FormControl className={classes.formControl}>
                    <InputLabel
                        style={{
                            fontSize: "16pt",
                            fontFamily: "Roboto",
                        }}
                    >
                        Hash
                    </InputLabel>
                    <TextField
                        className={classes.textField}
                        style={{ marginBottom: "2%" }}
                        placeholder={hashh}
                        disabled={true}
                        id="hash"
                        name="hash"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel
                        style={{
                            fontSize: "16pt",
                            fontFamily: "Roboto",
                        }}
                    >
                        Nombre
                    </InputLabel>
                    <TextField
                        style={{ marginBottom: "2%" }}
                        className={classes.textField}
                        placeholder="Nombre"
                        label={label("Nombre")}
                        id="nombre"
                        name="nombre"
                        onChange={formik.handleChange}
                        value={formik.values.nombre}
                        variant="outlined"
                        helperText={formik.errors.nombre}
                        error={formik.errors.nombre}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel
                        style={{
                            fontSize: "16pt",
                            fontFamily: "Roboto",
                        }}
                    >
                        Fecha Lanzamiento
                    </InputLabel>
                    <TextField
                        style={{ marginBottom: "2%" }}
                        className={classes.textField}
                        id="fechaLanzamiento"
                        type="date"
                        value={formik.values.fechaLanzamiento}
                        selected={formik.values.fechaLanzamiento}
                        onChange={formik.handleChange}
                        helperText={formik.errors.fechaLanzamiento}
                        error={formik.errors.fechaLanzamiento}
                        variant="outlined"
                      
                        //excludeDates={populateFeriados(feriados)}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel
                        style={{
                            fontSize: "16pt",
                            fontFamily: "Roboto",
                        }}
                    >
                        Fecha Vencimiento
                    </InputLabel>
                    <TextField
                        style={{ marginBottom: "2%" }}
                        className={classes.textField}
                        id="fechaVencimiento"
                        type="date"
                        value={formik.values.fechaVencimiento}
                        selected={formik.values.fechaVencimiento}
                        onChange={formik.handleChange}
                        helperText={formik.errors.fechaVencimiento}
                        error={formik.errors.fechaVencimiento}
                        variant="outlined"
                        
                        //excludeDates={populateFeriados(feriados)}
                    />
                </FormControl>

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
                {nuevo == true && formik.values.nombre != "" && formik.values.fechaVencimiento != ""  && formik.values.fechaLanzamiento != ""  && (
                    <Button
                        style={{
                            width: "50%",
                            alignSelf: "center",
                            marginBottom: "2%",
                        }}
                        bsStyle="primary"
                        onClick={nuevaCampaña}
                    >
                        nuevo
                    </Button>
                )}
                {parametros == true && formik.values.nombre != "" && formik.values.fechaVencimiento != "" && formik.values.fechaLanzamiento != ""  && (
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
            </form>
        </div>
    );
};
FormCampaña.propTypes = {
    match: PropTypes.object,
};

export default FormCampaña;

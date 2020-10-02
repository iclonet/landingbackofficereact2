import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { createCampaign, hashh } from "../api";
import { FormControl, TextField, InputLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { LinkContainer } from "react-router-bootstrap";
import Paper from "@material-ui/core/Paper";

const FormCampaña = (props) => {
    const id = props.id;
    const hash1 = props.hash;
    const Form = (props) => {
        const useStyles = makeStyles((theme) => ({
            paper: {
                padding: theme.spacing(2),
                textAlign: "center",
                color: theme.palette.text.secondary,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "20%",
                marginTop: "5%",
            },
            formControl: {
                width: "100%",
            },
            textField: {
                marginTop: theme.spacing(6),
            },
        }));
        const classes = useStyles();
        const guardar = () => {
            const fechaLanzamiento = new Date(
                document.getElementById("fechaLanzamiento").value
            );
            const fechaVencimiento = new Date(
                document.getElementById("fechaVencimiento").value
            );
            if (
                deshabilitado === false &&
                fechaVencimiento > fechaLanzamiento &&
                formik.values.nombre != "" &&
                formik.values.fechaVencimiento != "" &&
                formik.values.fechaLanzamiento != ""
            ) {
                setDeshabilitado(true);
                setParametros(true);
                setNuevo(true);
                formik.handleSubmit();
            }
        };
        const nuevaCampaña = () => {
            if (deshabilitado === true) {
                setDeshabilitado(false);
                setParametros(false);
                setNuevo(false);
                location.reload();
            }
        };
        const [error, setError] = useState("");
        const [deshabilitado, setDeshabilitado] = useState(false);
        const [parametros, setParametros] = useState(false);
        const [nuevo, setNuevo] = useState(false);
        const [campaña, setCampaña] = useState([]);
        const [fecha, setFecha] = useState(true);

        const validation = Yup.object().shape({
            fechaVencimiento: Yup.string().required("requerido"),
            nombre: Yup.string()
                .max(20, "Debe contener 20 caracteres o menos")
                .required("requerido"),
            fechaLanzamiento: Yup.string().required("requerido"),
        });

        const idd = props.id;
        const formik = useFormik({
            initialValues: {
                fechaLanzamiento: "",
                fechaVencimiento: "",
                habilitada: false,
                nroCliente: idd,
                nombre: "",
            },
            validationSchema: validation,
            onSubmit: (values) => {
                const {
                    fechaLanzamiento,
                    fechaVencimiento,
                    habilitada,
                    nroCliente,
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
                console.log(hash1);
                //setHashh(randomstring.generate(5));
            } catch (err) {
                setError(err);
            }
        }, []);

        function errorText() {
            return (
                <div>
                    <p
                        style={{
                            marginTop: "0px",
                            fontSize: "10pt",
                            color: "red",
                        }}
                    >
                        ¡ Fecha Vencimiento no puede ser antes de la fecha
                        Lanzamiento !
                    </p>
                </div>
            );
        }
        function formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + (d.getDate() + 1),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        }

        function handleDateChange() {
            const fechaVencimiento = new Date(
                document.getElementById("fechaVencimiento").value
            );
            formik.setFieldValue(
                "fechaVencimiento",
                formatDate(fechaVencimiento)
            );
            const fechaLanzamiento = new Date(
                document.getElementById("fechaLanzamiento").value
            );
            if (fechaVencimiento < fechaLanzamiento) {
                setFecha(false);
            }
            if (fechaVencimiento > fechaLanzamiento) {
                setFecha(true);
            }
        }
        return (
            <div
                style={{
                    width: "50%",
                }}
            >
                <Paper className={classes.paper} elevation={3}>
                    <h1 style={{ alignSelf: "center" }}>Nueva Campaña</h1>
                    <Divider
                        style={{
                            width: "70%",
                            alignSelf: "center",
                        }}
                    />
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
                                placeholder={hash1}
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
                                onChange={() => handleDateChange()}
                                helperText={formik.errors.fechaVencimiento}
                                error={formik.errors.fechaVencimiento}
                                variant="outlined"
                            />
                        </FormControl>
                        {fecha == false && errorText()}

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
                        {nuevo == true &&
                            formik.values.nombre != "" &&
                            formik.values.fechaVencimiento != "" &&
                            formik.values.fechaLanzamiento != "" && (
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
                        {parametros == true &&
                            formik.values.nombre != "" &&
                            formik.values.fechaVencimiento != "" &&
                            formik.values.fechaLanzamiento != "" && (
                                <LinkContainer
                                    style={{
                                        width: "50%",
                                        alignSelf: "center",
                                        marginBottom: "2%",
                                    }}
                                    to="/parameters"
                                >
                                    <Button bsStyle="primary">
                                        Agregar parametros
                                    </Button>
                                </LinkContainer>
                            )}
                    </form>
                </Paper>
            </div>
        );
    };
    return (
        <div>
            <Form id={id} />
        </div>
    );
};

FormCampaña.propTypes = {
    match: PropTypes.object,
};

export default FormCampaña;

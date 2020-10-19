import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FormControl, TextField, InputLabel } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";
import DashboardNav from "../dashboard/components/navbar/Navbar";
import { hashh } from "../api";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addParametrs, getCampaigns } from "../api";
import { Typography } from "@material-ui/core";

const AddParameters = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(8),
            marginLeft: theme.spacing(8),
            marginRight: theme.spacing(8),
            marginBottom: theme.spacing(3),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
            height: "100%",
        },
        paperMain: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
        textField: {
            marginTop: theme.spacing(3),
            alignSelf: "center",
        },
        textFieldFull: {
            marginTop: theme.spacing(3),
            width: "80%",
            alignSelf: "center",
        },
        textFieldM: {
            marginTop: theme.spacing(3),
            width: "65%",
            alignSelf: "center",
        },
    }));
    const classes = useStyles();

    const validation = Yup.object().shape({});

    const formik = useFormik({
        initialValues: {
            texto: "",
            habilitaNombre: true,
            habilitaApellido: true,
            habilitaLocalidad: "",
            habilitaProvincia: "",
            validaEmail: "",
            validaSms: "",
            validaScore: "",
            validaDni: true,
            imagenBackground: "",
            imagenLogo: "",
            estrategia: [],
            hash: "",
            textoSobreImagen: "",
            textoDebajoImagen: "",
            textoPieFormulario: "",
            titulo1Formulario: "",
            detalle1Formulario: "",
            titulo2Formulario: "",
            detalle2Formulario: "",
            titulo3Formulario: "",
            detalle3Formulario: "",
            titulo4Formulario: "",
            detalle4Formulario: "",
            titulo5Formulario: "",
            detalle5Formulario: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            console.log(values);
            const {
                texto,
                habilitaNombre,
                habilitaApellido,
                habilitaLocalidad,
                habilitaProvincia,
                validaEmail,
                validaSms,
                validaScore,
                validaDni,
                imagenBackground,
                imagenLogo,
                estrategia,
                hash,
                textoSobreImagen,
                textoDebajoImagen,
                textoPieFormulario,
                titulo1Formulario,
                detalle1Formulario,
                titulo2Formulario,
                detalle2Formulario,
                titulo3Formulario,
                detalle3Formulario,
                titulo4Formulario,
                detalle4Formulario,
                titulo5Formulario,
                detalle5Formulario,
            } = values;
            addParametrsFunc(values);
        },
    });
    const [parametrs, setParametrs] = useState([]);
    async function addParametrsFunc(obj) {
        const res = await addParametrs(obj);
        setParametrs(res.data);
    }
    const [campañas, setCampañas] = useState([]);
    async function getCampaignFunc() {
        const res = await getCampaigns();
        setCampañas(res.data);
    }
    const hash = props.hash;
    const label = (label) => {
        <p id="label">{label}</p>;
    };
    const [deshabilitado, setDeshabilitado] = useState(false);
    const [sms, setSms] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const [score, setScore] = React.useState(false);
    const [provinica, setProvincia] = React.useState(false);
    const [localidad, setLocalidad] = React.useState(false);

    const handleChangeSMS = () => {
        setSms(!sms);
        formik.setFieldValue("validaSms", sms);
    };
    const handleChangeEMAIL = () => {
        setEmail(!email);
        formik.setFieldValue("validaEmail", email);
    };
    const handleChangeScore = () => {
        setScore(!score);
        formik.setFieldValue("validaScore", score);
    };
    const handleChangeProvincia = () => {
        setProvincia(!provinica);
        formik.setFieldValue("habilitaProvincia", provinica);
    };
    const handleChangeLocalidad = () => {
        setLocalidad(!localidad);
        formik.setFieldValue("habilitaLocalidad", localidad);
    };
    const [estrategiaID, setEstrategiaID] = React.useState([]);
    function id() {
        {
            campañas &&
                campañas
                    .filter((cam) => cam.hash == hash)
                    .map((campaña) =>
                        setEstrategiaID("id" + ":" + ` ${campaña.hash} `)
                    );
        }
    }
    const guardar = () => {
        formik.setFieldValue("hash", hash);
        getCampaignFunc();
        id();
        formik.setFieldValue("estrategia", estrategiaID);
        setDeshabilitado(true);
        formik.handleSubmit();
    };
    return (
        <div>
            <div>
                <DashboardNav />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Paper className={classes.paperMain} elevation={3}>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper} elevation={3}>
                                    <Paper
                                        style={{
                                            marginTop: "-7%",
                                            marginLeft: "2%",
                                            padding: "1%",
                                            width: "30%",
                                            textAlign: "center",
                                            backgroundColor:
                                                "var(--primary-color)",
                                            color: "white",
                                        }}
                                    >
                                        {" "}
                                        Campaña #{hash || hashh}
                                    </Paper>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper} elevation={3}>
                                    <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <TextField
                                            className={classes.textFieldFull}
                                            placeholder="Titulo encabezado (opcional)"
                                            label={label(
                                                "Titulo encabezado (opcional)"
                                            )}
                                            id="nombre"
                                            name="texto"
                                            onChange={formik.handleChange}
                                            value={formik.values.texto}
                                            variant="outlined"
                                            helperText={formik.errors.texto}
                                            error={formik.errors.texto}
                                        />
                                    </FormControl>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <FormControl>
                                                <TextField
                                                    className={
                                                        classes.textField
                                                    }
                                                    disabled={true}
                                                    placeholder="DNI"
                                                    label={label("DNI")}
                                                    id="nombre"
                                                    name="DNI"
                                                    //onChange={formik.handleChange}
                                                    //value={formik.values.nombre}
                                                    variant="outlined"
                                                    // helperText={formik.errors.nombre}
                                                    // error={formik.errors.nombre}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl>
                                                <TextField
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Nombre"
                                                    label={label("Nombre")}
                                                    id="nombre"
                                                    disabled={true}
                                                    name="nombre"
                                                    //onChange={formik.handleChange}
                                                    //value={formik.values.nombre}
                                                    variant="outlined"
                                                    // helperText={formik.errors.nombre}
                                                    // error={formik.errors.nombre}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                className={classes.textField}
                                                placeholder="Apellido"
                                                label={label("Apellido")}
                                                id="nombre"
                                                disabled={true}
                                                name="Apellido"
                                                //onChange={formik.handleChange}
                                                //value={formik.values.nombre}
                                                variant="outlined"
                                                // helperText={formik.errors.nombre}
                                                // error={formik.errors.nombre}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                className={classes.textField}
                                                placeholder="Prefijo"
                                                label={label("Prefijo")}
                                                id="nombre"
                                                disabled={true}
                                                name="Prefijo"
                                                //onChange={formik.handleChange}
                                                //value={formik.values.nombre}
                                                variant="outlined"
                                                // helperText={formik.errors.nombre}
                                                // error={formik.errors.nombre}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                className={classes.textField}
                                                placeholder="Telefono"
                                                label={label("Telefono")}
                                                id="nombre"
                                                name="Telefono"
                                                disabled={true}
                                                //onChange={formik.handleChange}
                                                //value={formik.values.nombre}
                                                variant="outlined"
                                                // helperText={formik.errors.nombre}
                                                // error={formik.errors.nombre}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                className={classes.textField}
                                                placeholder="Email"
                                                label={label("Email")}
                                                id="nombre"
                                                name="Email"
                                                disabled={true}
                                                //onChange={formik.handleChange}
                                                //value={formik.values.nombre}
                                                variant="outlined"
                                                // helperText={formik.errors.nombre}
                                                // error={formik.errors.nombre}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                            item
                                            xs={6}
                                        >
                                            <FormGroup
                                                style={{
                                                    alignSelf: "center",
                                                    marginTop: "5%",
                                                }}
                                                row
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name="checkedA"
                                                            onChange={
                                                                handleChangeProvincia
                                                            }
                                                        />
                                                    }
                                                    label={<h4>Provincia</h4>}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                            item
                                            xs={6}
                                        >
                                            <FormGroup
                                                style={{
                                                    alignSelf: "center",
                                                    marginTop: "5%",
                                                }}
                                                row
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name="checkedA"
                                                            onChange={
                                                                handleChangeLocalidad
                                                            }
                                                        />
                                                    }
                                                    label={<h4>Localidad</h4>}
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        style={{
                                            marginTop: "2%",
                                        }}
                                        container
                                    >
                                        <Grid
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                            item
                                            xs={6}
                                        >
                                            <FormGroup
                                                style={{
                                                    alignSelf: "center",
                                                    marginTop: "3%",
                                                }}
                                                row
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name="checkedA"
                                                            onChange={
                                                                handleChangeSMS
                                                            }
                                                        />
                                                    }
                                                    label={<h4>Valida SMS</h4>}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                            item
                                            xs={6}
                                        >
                                            <FormGroup
                                                style={{
                                                    alignSelf: "center",
                                                    marginTop: "3%",
                                                }}
                                                row
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name="checkedA"
                                                            onChange={
                                                                handleChangeEMAIL
                                                            }
                                                        />
                                                    }
                                                    label={
                                                        <h4>Valida Email</h4>
                                                    }
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                            item
                                            xs={6}
                                        >
                                            <FormGroup
                                                style={{
                                                    alignSelf: "center",
                                                    marginTop: "3%",
                                                }}
                                                row
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            name="checkedA"
                                                            onChange={
                                                                handleChangeScore
                                                            }
                                                        />
                                                    }
                                                    label={
                                                        <h4>Valida Score</h4>
                                                    }
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Titulo 1 pie formulario (opcional)"
                                            label={label(
                                                "Titulo 1 pie formulario (opcional)"
                                            )}
                                            id="nombre"
                                            name="titulo1Formulario"
                                            onChange={formik.handleChange}
                                            value={formik.values.titulo1Formulario}
                                            variant="outlined"
                                            helperText={formik.errors.titulo1Formulario}
                                            error={formik.errors.titulo1Formulario}
                                        />
                                    </FormControl>
                                    <FormControl  style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}>
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Detalle 1 pie formulario (opcional)"
                                        label={label("Detalle 1 pie formulario (opcional)")}
                                        id="nombre"
                                        name="detalle1Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle1Formulario}
                                        variant="outlined"
                                        helperText={formik.errors.detalle1Formulario}
                                        error={formik.errors.detalle1Formulario}
                                    />
                                    </FormControl>
                                    <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Titulo 2 pie formulario (opcional)"
                                        label={label("Titulo 2 pie formulario (opcional)")}
                                        id="nombre"
                                        name="titulo2Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo2Formulario}
                                        variant="outlined"
                                        helperText={formik.errors.titulo2Formulario}
                                        error={formik.errors.titulo2Formulario}
                                    />
                                     </FormControl>
                                     <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Detalle 2 pie formulario (opcional)"
                                        label={label("Detalle 2 pie formulario (opcional)")}
                                        id="nombre"
                                        name="detalle2Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle2Formulario}
                                        variant="outlined"
                                        helperText={formik.errors.detalle2Formulario}
                                        error={formik.errors.detalle2Formulario}
                                    />
                                    </FormControl>
                                    <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Titulo 3 pie formulario (opcional)"
                                        label={label("Titulo 3 pie formulario (opcional)")}
                                        id="nombre"
                                        name="titulo3Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo3Formulario}
                                        variant="outlined"
                                        helperText={formik.errors.titulo3Formulario}
                                        error={formik.errors.titulo3Formulario}
                                    />
                                    </FormControl>
                                    <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Detalle 3 pie formulario (opcional)"
                                        label={label("Detalle 3 pie formulario (opcional)")}
                                        id="nombre"
                                        name="detalle3Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle3Formulario}
                                        variant="outlined"
                                        helperText={formik.errors.detalle3Formulario}
                                        error={formik.errors.detalle3Formulario}
                                    />
                                    </FormControl>
                                    <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Titulo 4 pie formulario (opcional)"
                                        label={label("Titulo 4 pie formulario (opcional)")}
                                        id="nombre"
                                        name="titulo4Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo4Formulario}
                                        variant="outlined"
                                        helperText={formik.errors.titulo4Formulario}
                                        error={formik.errors.titulo4Formulario}
                                    />
                                     </FormControl>
                                     <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Detalle 4 pie formulario (opcional)"
                                        label={label("Detalle 4 pie formulario (opcional)")}
                                        id="nombre"
                                        name="detalle4Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle4Formulario}
                                        variant="outlined"
                                         helperText={formik.errors.detalle4Formulario}
                                        error={formik.errors.detalle4Formulario}
                                    />
                                      </FormControl>
                                      <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        placeholder="Titulo 5 pie formulario (opcional)"
                                        label={label("Titulo 5 pie formulario (opcional)")}
                                        id="nombre"
                                        name="titulo5Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo5Formulario}
                                        variant="outlined"
                                        helperText={formik.errors.titulo5Formulario}
                                     error={formik.errors.titulo5Formulario}
                                    />
                                    </FormControl>
                                    <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                    <TextField
                                        className={classes.textFieldM}
                                        label={label("Detalle 5 pie formulario (opcional)")}
                                        placeholder="Detalle 5 pie formulario (opcional)"
                                        id="nombre"
                                        name="detalle5Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle5Formulario}
                                        variant="outlined"
                                         helperText={formik.errors.detalle5Formulario}
                                         error={formik.errors.detalle5Formulario}
                                    />
                                    </FormControl>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider
                        style={{
                            backgroundColor: "black",
                            marginLeft: "5%",
                            marginRight: "5%",
                        }}
                    />
                    <Grid container spacing={0} style={{ paddingBottom: "2%" }}>
                        <Grid
                            item
                            xs={6}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                            <TextField
                                className={classes.textFieldFull}
                                label={label("Texto pie imagen")}
                                placeholder="Texto pie imagen"
                                id="nombre"
                                name="textoDebajoImagen"
                                onChange={formik.handleChange}
                                value={formik.values.textoDebajoImagen}
                                variant="outlined"
                                helperText={formik.errors.textoDebajoImagen}
                                 error={formik.errors.textoDebajoImagen}
                            />
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                             <FormControl
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                            <TextField
                                className={classes.textFieldFull}
                                label={label("Texto final formulario (opcional)")}
                                placeholder="Texto final formulario (opcional)"
                                id="nombre"
                                name="textoPieFormulario"
                                onChange={formik.handleChange}
                                value={formik.values.textoPieFormulario}
                                variant="outlined"
                                helperText={formik.errors.textoPieFormulario}
                                error={formik.errors.textoPieFormulario}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        style={{
                            width: "30%",
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
                </Paper>
            </form>
        </div>
    );
};
export default AddParameters;

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
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addParametrs, getCampaigns } from "../api";
import { Typography } from "@material-ui/core";
//import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
        button: {
            margin: theme.spacing(1),
            width: "15px",
        },
    }));
    const classes = useStyles();

    const validation = Yup.object().shape({
        imagenLogo: Yup.string().required(),
        imagenBackground: Yup.string().required(),
        texto: Yup.string().required("Requerido"),
    });

    const formik = useFormik({
        initialValues: {
            texto: "",
            habilitaNombre: true,
            habilitaApellido: true,
            habilitaLocalidad: false,
            habilitaProvincia: false,
            validaEmail: false,
            validaSms: false,
            validaScore: false,
            validaDni: true,
            imagenBackground: "",
            imagenLogo: "",
            estrategia: "",
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
            console.log(values, typeof values.estrategia);
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
        if (
            res.status == 201 &&
            formik.values.imagenBackground != "" &&
            formik.values.imagenLogo != "" &&
            formik.values.texto != ""
        ) {
            setWarning(false);
            setImgbg(true);
            setLogo(true);
            setDeshabilitado(true);
            setEdit(true);
            console.log("status === 200");
        }
        if (res.status == 500) {
            window.alert("algo ocurrió mal !");
        }
        /*
        if (
            res.status == 500 ||
            formik.values.imagenBackground == "" ||
            formik.values.imagenLogo == "" ||
            formik.values.texto == ""
        ) {
            console.log("status != 200");
            setWarning(true);
            setImgbg(false);
            setLogo(false);
            setWarning(true);
        }
        */
    }

    const guardar = () => {
        formik.setFieldValue("hash", hashprops);
        formik.setFieldValue("estrategia", JSON.parse(id()));
       // formik.handleSubmit();
        
        if (
            formik.values.imagenBackground == "" ||
            formik.values.imagenLogo == "" ||
            formik.values.texto == ""
        ) {
            setImgbg(false);
            setLogo(false);
            setWarning(true);
        }
        /*
        if (
            formik.values.imagenBackground != "" &&
            formik.values.imagenLogo != "" &&
            formik.values.texto != ""
        ) {
            setWarning(false);
            setImgbg(true);
            setLogo(true);
            setDeshabilitado(true);
            setEdit(true);
        }
        */
    };
    const [campañas, setCampañas] = useState("");
    async function getCampaignsFunc() {
        const res = await getCampaigns();
        setCampañas(res.data);
    }
    const hashprops = props.hash;
    const label = (label) => {
        <p id="label">{label}</p>;
    };
    const [deshabilitado, setDeshabilitado] = useState(false);

    const handleChangeSMS = () => {
        if (formik.values.validaSms == false) {
            formik.setFieldValue("validaSms", true);
        }
        if (formik.values.validaSms == true) {
            formik.setFieldValue("validaSms", false);
        }
    };
    const handleChangeEMAIL = () => {
        if (formik.values.validaEmail == false) {
            formik.setFieldValue("validaEmail", true);
        }
        if (formik.values.validaEmail == true) {
            formik.setFieldValue("validaEmail", false);
        }
    };
    const handleChangeScore = () => {
        if (formik.values.validaScore == false) {
            formik.setFieldValue("validaScore", true);
        }
        if (formik.values.validaScore == true) {
            formik.setFieldValue("validaScore", false);
        }
    };
    const handleChangeProvincia = () => {
        if (formik.values.habilitaProvincia == false) {
            formik.setFieldValue("habilitaProvincia", true);
        }
        if (formik.values.habilitaProvincia == true) {
            formik.setFieldValue("habilitaProvincia", false);
        }
    };
    const handleChangeLocalidad = () => {
        if (formik.values.habilitaLocalidad == false) {
            formik.setFieldValue("habilitaLocalidad", true);
        }
        if (formik.values.habilitaLocalidad == true) {
            formik.setFieldValue("habilitaLocalidad", false);
        }
    };
    const [error, setError] = useState("");
    const [imgbg, setImgbg] = useState(true);
    const [logo, setLogo] = useState(true);
    const [warning, setWarning] = useState(false);
    const [checklogo, setChecklogo] = useState(false);
    const [checkimage, setCheckimage] = useState(false);
    useEffect(() => {
        try {
            getCampaignsFunc();
            {
                id;
            }
            console.log(hashprops);
            console.log(campañas);
            // console.log(estrategiaID);
        } catch (err) {
            setError(err);
        }
    }, []);
    const [edit, setEdit] = React.useState(false);

    const id = () =>
        campañas &&
        campañas
            .filter((cam) => cam.hash == hashprops)
            .map((campaña) => `{ "id": ${campaña.id} }`);

    const uploadlogo = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        var strImage = base64.replace(/^data:image\/[a-z]+;base64,/, "");
        console.log(strImage);
        formik.setFieldValue("imagenLogo", strImage);
        setChecklogo(true);
    };
    const uploadImagen = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        var strImage = base64.replace(/^data:image\/[a-z]+;base64,/, "");
        console.log(strImage);
        formik.setFieldValue("imagenBackground", strImage);
        setCheckimage(true);
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    function errorText(w, ml, mr) {
        return (
            <div>
                <Divider
                    style={{
                        width: w,
                        backgroundColor: "red",
                        marginTop: "2%",
                        marginLeft: ml,
                    }}
                />
                <p
                    style={{
                        marginTop: "0px",
                        marginRight: mr,
                        fontSize: "10pt",
                        color: "red",
                    }}
                >
                    requerido
                </p>
            </div>
        );
    }
    return (
        <div>
            <div>
                <DashboardNav />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Paper className={classes.paper} elevation={3}>
                                <Paper
                                    style={{
                                        marginTop: "-7%",
                                        marginLeft: "2%",
                                        padding: "1%",
                                        width: "30%",
                                        textAlign: "center",
                                        backgroundColor: "var(--primary-color)",
                                        color: "white",
                                    }}
                                >
                                    {" "}
                                    Campaña #{hashprops}
                                </Paper>

                                <div
                                    style={{
                                        marginTop: "8%",
                                        marginRight: "50%",
                                    }}
                                >
                                    <h3>Upload logo</h3>
                                    <FormControl>
                                        <label htmlFor="upload-logo">
                                            <input
                                                style={{ display: "none" }}
                                                id="upload-logo"
                                                name="upload-logo"
                                                type="file"
                                                disabled={deshabilitado}
                                                onChange={(e) => {
                                                    uploadlogo(e);
                                                }}
                                            />
                                            <Fab
                                                disabled={deshabilitado}
                                                color="secondary"
                                                size="small"
                                                component="span"
                                                aria-label="add"
                                                variant="extended"
                                            >
                                                <AddIcon /> Upload logo
                                            </Fab>
                                        </label>
                                    </FormControl>
                                    {checklogo == true && (
                                        <div>
                                            <CheckCircleIcon
                                                fontSize="large"
                                                color="primary"
                                            />
                                        </div>
                                    )}
                                </div>
                                {logo == false && errorText("60%", "0%", "40%")}
                                <div
                                    style={{
                                        marginTop: "40%",
                                    }}
                                >
                                    <h3
                                        style={{
                                            marginLeft: "3%",
                                        }}
                                    >
                                        Upload imagen campaña
                                    </h3>
                                    <FormControl>
                                        <label htmlFor="upload-photo">
                                            <input
                                                style={{ display: "none" }}
                                                id="upload-photo"
                                                name="upload-photo"
                                                type="file"
                                                disabled={deshabilitado}
                                                onChange={(e) => {
                                                    uploadImagen(e);
                                                }}
                                            />
                                            <Fab
                                                disabled={deshabilitado}
                                                color="secondary"
                                                size="small"
                                                component="span"
                                                aria-label="add"
                                                variant="extended"
                                            >
                                                <AddIcon /> Upload imagen
                                            </Fab>
                                        </label>
                                    </FormControl>
                                    {checkimage == true && (
                                        <div>
                                            <CheckCircleIcon
                                                fontSize="large"
                                                color="primary"
                                            />
                                        </div>
                                    )}
                                </div>
                                {imgbg == false &&
                                    errorText("70%", "16%", "0%")}
                                <FormControl
                                    style={{
                                        marginTop: "21%",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                    }}
                                >
                                    <TextField
                                        className={classes.textFieldFull}
                                        placeholder="Texto sobre imagen campaña (opcional)"
                                        label={label(
                                            "Texto sobre imagen campaña (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="textoSobreImagen"
                                        onChange={formik.handleChange}
                                        value={formik.values.textoSobreImagen}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.textoSobreImagen
                                        }
                                        error={formik.errors.textoSobreImagen}
                                    />
                                </FormControl>
                            </Paper>
                        </Grid>
                        <Grid item xs>
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
                                        disabled={deshabilitado}
                                        name="texto"
                                        onChange={formik.handleChange}
                                        value={formik.values.texto}
                                        variant="outlined"
                                        helperText={
                                            <Typography
                                                component={"span"}
                                                style={{ fontSize: "14px" }}
                                            >
                                                {formik.errors.texto}
                                            </Typography>
                                        }
                                        error={formik.errors.texto}
                                    />
                                </FormControl>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FormControl>
                                            <TextField
                                                className={classes.textField}
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
                                                className={classes.textField}
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
                                        xs
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
                                                        disabled={deshabilitado}
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
                                        xs
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
                                                        disabled={deshabilitado}
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
                                        xs
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
                                                        disabled={deshabilitado}
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
                                        xs
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
                                                        disabled={deshabilitado}
                                                        onChange={
                                                            handleChangeEMAIL
                                                        }
                                                    />
                                                }
                                                label={<h4>Valida Email</h4>}
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
                                        xs
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
                                                        disabled={deshabilitado}
                                                        onChange={
                                                            handleChangeScore
                                                        }
                                                    />
                                                }
                                                label={<h4>Valida Score</h4>}
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
                                        disabled={deshabilitado}
                                        name="titulo1Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo1Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.titulo1Formulario
                                        }
                                        error={formik.errors.titulo1Formulario}
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
                                        placeholder="Detalle 1 pie formulario (opcional)"
                                        label={label(
                                            "Detalle 1 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="detalle1Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle1Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.detalle1Formulario
                                        }
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
                                        label={label(
                                            "Titulo 2 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="titulo2Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo2Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.titulo2Formulario
                                        }
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
                                        label={label(
                                            "Detalle 2 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="detalle2Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle2Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.detalle2Formulario
                                        }
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
                                        label={label(
                                            "Titulo 3 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        name="titulo3Formulario"
                                        disabled={deshabilitado}
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo3Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.titulo3Formulario
                                        }
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
                                        label={label(
                                            "Detalle 3 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="detalle3Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle3Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.detalle3Formulario
                                        }
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
                                        label={label(
                                            "Titulo 4 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="titulo4Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo4Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.titulo4Formulario
                                        }
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
                                        label={label(
                                            "Detalle 4 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="detalle4Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle4Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.detalle4Formulario
                                        }
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
                                        label={label(
                                            "Titulo 5 pie formulario (opcional)"
                                        )}
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="titulo5Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo5Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.titulo5Formulario
                                        }
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
                                        label={label(
                                            "Detalle 5 pie formulario (opcional)"
                                        )}
                                        placeholder="Detalle 5 pie formulario (opcional)"
                                        id="nombre"
                                        disabled={deshabilitado}
                                        name="detalle5Formulario"
                                        onChange={formik.handleChange}
                                        value={formik.values.detalle5Formulario}
                                        variant="outlined"
                                        helperText={
                                            formik.errors.detalle5Formulario
                                        }
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
                        xs
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
                                label={label("Texto pie imagen (opcional)")}
                                placeholder="Texto pie imagen (opcional)"
                                id="nombre"
                                disabled={deshabilitado}
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
                        xs
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
                                label={label(
                                    "Texto final formulario (opcional)"
                                )}
                                placeholder="Texto final formulario (opcional)"
                                id="nombre"
                                disabled={deshabilitado}
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
                <Grid container spacing={0} style={{ paddingBottom: "2%" }}>
                    <Grid
                        item
                        xs
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        {" "}
                        <Button
                            style={{ alignSelf: "center" }}
                            bsStyle="primary"
                            id="btn-primary"
                            onClick={() => window.location.reload(false)}
                        >
                            Volver
                        </Button>
                    </Grid>
                    {edit == true && (
                        <Grid
                            item
                            xs
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            {" "}
                            <Button
                                style={{ alignSelf: "center" }}
                                bsStyle="primary"
                                id="btn-primary"
                            >
                                Editar
                            </Button>
                        </Grid>
                    )}
                    {warning == true && (
                        <Grid
                            item
                            xs
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            {" "}
                            <p
                                style={{
                                    color: "red",
                                    alignSelf: "center",
                                    fontSize: "18px",
                                }}
                            >
                                Revise los campos requeridos{" "}
                            </p>
                        </Grid>
                    )}
                    <Grid
                        item
                        xs
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Button
                            style={{ alignSelf: "center" }}
                            type="submit"
                            id="btn-primary"
                            bsStyle="primary"
                            disabled={deshabilitado}
                            onClick={guardar}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
export default AddParameters;

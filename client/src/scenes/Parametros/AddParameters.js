import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FormControl, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";
import DashboardNav from "../dashboard/components/navbar/Navbar";
import { hashh } from "../api";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
        initialValues: {},
        validationSchema: validation,
        onSubmit: (values) => {},
    });
    const label = (label) => {
        <p id="label">{label}</p>;
    };
    return (
        <div>
            <div>
                <DashboardNav />
            </div>

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
                                        backgroundColor: "var(--primary-color)",
                                        color: "white",
                                    }}
                                >
                                    {" "}
                                    Campaña #{hashh}
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper} elevation={3}>
                                <form onSubmit={formik.handleSubmit}>
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
                                            name="Tituloencabezado"
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <TextField
                                                    className={
                                                        classes.textField
                                                    }
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
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Nombre"
                                                    label={label("Nombre")}
                                                    id="nombre"
                                                    name="nombre"
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
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Apellido"
                                                    label={label("Apellido")}
                                                    id="nombre"
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
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Prefijo"
                                                    label={label("Prefijo")}
                                                    id="nombre"
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
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Telefono"
                                                    label={label("Telefono")}
                                                    id="nombre"
                                                    name="Telefono"
                                                    //onChange={formik.handleChange}
                                                    //value={formik.values.nombre}
                                                    variant="outlined"
                                                    // helperText={formik.errors.nombre}
                                                    // error={formik.errors.nombre}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Email"
                                                    label={label("Email")}
                                                    id="nombre"
                                                    name="Email"
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
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Provincia"
                                                    label={label("Provincia")}
                                                    id="nombre"
                                                    name="Provincia"
                                                    //onChange={formik.handleChange}
                                                    //value={formik.values.nombre}
                                                    variant="outlined"
                                                    // helperText={formik.errors.nombre}
                                                    // error={formik.errors.nombre}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    className={
                                                        classes.textField
                                                    }
                                                    placeholder="Localidad"
                                                    label={label("Localidad")}
                                                    id="nombre"
                                                    name="Localidad"
                                                    //onChange={formik.handleChange}
                                                    //value={formik.values.nombre}
                                                    variant="outlined"
                                                    // helperText={formik.errors.nombre}
                                                    // error={formik.errors.nombre}
                                                />
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
                                                            <Switch name="checkedA" />
                                                        }
                                                        label={
                                                            <h4>Valida SMS</h4>
                                                        }
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
                                                            <Switch name="checkedA" />
                                                        }
                                                        label={
                                                            <h4>
                                                                Valida Email
                                                            </h4>
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
                                                            <Switch name="checkedA" />
                                                        }
                                                        label={
                                                            <h4>
                                                                Valida Score
                                                            </h4>
                                                        }
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Titulo 1 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Detalle 1 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Titulo 2 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Detalle 2 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Titulo 3 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Detalle 3 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Titulo 4 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder=".."
                                            placeholder="Detalle 4 pie formulario (opcional)"
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder="Titulo 5 pie formulario (opcional)"
                                            label={label("..")}
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                        <TextField
                                            className={classes.textFieldM}
                                            placeholder=".."
                                            placeholder="Detalle 5 pie formulario (opcional)"
                                            id="nombre"
                                            name=".."
                                            //onChange={formik.handleChange}
                                            //value={formik.values.nombre}
                                            variant="outlined"
                                            // helperText={formik.errors.nombre}
                                            // error={formik.errors.nombre}
                                        />
                                    </FormControl>
                                </form>
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
                        <TextField
                            className={classes.textFieldFull}
                            placeholder=".."
                            placeholder="Texto pie imagen"
                            id="nombre"
                            name=".."
                            //onChange={formik.handleChange}
                            //value={formik.values.nombre}
                            variant="outlined"
                            // helperText={formik.errors.nombre}
                            // error={formik.errors.nombre}
                        />
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
                        <TextField
                            className={classes.textFieldFull}
                            placeholder=".."
                            placeholder="Texto final formulario (opcional)"
                            id="nombre"
                            name=".."
                            //onChange={formik.handleChange}
                            //value={formik.values.nombre}
                            variant="outlined"
                            // helperText={formik.errors.nombre}
                            // error={formik.errors.nombre}
                        />
                    </Grid>
                </Grid>
            </Paper>
           
        </div>
    );
};
export default AddParameters;

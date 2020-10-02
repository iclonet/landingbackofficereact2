import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FormControl, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";
import DashboardNav from "../dashboard/components/navbar/Navbar";
import {hashh } from "../api";



const AddParameters = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            margin: theme.spacing(4)
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
            height: "100%",
        },
        textField: {
            marginTop: theme.spacing(3),
        },
        textFieldFull: {
            marginTop: theme.spacing(3),
            width: '90%',
            marginLeft: theme.spacing(3),
        },
        textFieldM: {
            marginTop: theme.spacing(3),
            width: '65%',
            marginLeft: theme.spacing(10),
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
            <DashboardNav />
             <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Paper
                            style={{
                                marginTop: "-5%",
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
                    <Paper className={classes.paper}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl style={{ width: "90%" }}>
                                <TextField
                                    className={classes.textFieldFull}
                                    placeholder="Titulo encabezado (opcional)"
                                    label={label("Titulo encabezado (opcional)")}
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
                                    className={classes.textField}
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
                                    className={classes.textField}
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
                                    className={classes.textField}
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
                                    className={classes.textField}
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
                                    className={classes.textField}
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
                                    className={classes.textField}
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
                                    className={classes.textField}
                                    placeholder="Provencia"
                                    label={label("Provencia")}
                                    id="nombre"
                                    name="Provencia"
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
                                <Grid container>
                                    <Grid item xs={6}>
                                    <TextField
                                    className={classes.textField}
                                    placeholder=".."
                                    label={label("..")}
                                    id="nombre"
                                    name=".."
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
                                    placeholder=".."
                                    label={label("..")}
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
                                <Grid container>
                                    <Grid item xs={6}>
                                    <TextField
                                    className={classes.textField}
                                    placeholder=".."
                                    label={label("..")}
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
                                <TextField
                                    className={classes.textFieldM}
                                    placeholder=".."
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
                                    label={label("..")}
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
        </div>
       
    );
};
export default AddParameters;

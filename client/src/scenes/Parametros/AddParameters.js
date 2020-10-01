import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FormControl, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";

const AddParameters = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            margin: theme.spacing(4),
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
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Paper
                            style={{
                                marginTop: "-5%",
                                marginLeft: "2%",
                                padding: "1%",
                                width: "20%",
                                textAlign: "center",
                                backgroundColor: "var(--primary-color)",
                                color: "white",
                            }}
                        >
                            {" "}
                            Campaña #h{" "}
                        </Paper>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl >
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
                            </FormControl>
                        </form>
                       
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
export default AddParameters;

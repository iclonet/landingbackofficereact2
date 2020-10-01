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
        },
    }));
    const classes = useStyles();

    const validation = Yup.object().shape({});

    const formik = useFormik({
        initialValues: {},
        validationSchema: validation,
        onSubmit: (values) => {},
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
            </Grid>
        </div>
    );
};
export default AddParameters;

import React, { useEffect, useState } from "react";
import DashboardNav from "../dashboard/components/navbar/Navbar";
import { getParameters, getParametersByHash } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const ShowParameters = (props) => {
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

    const hashprops = props.hash || props.location.aboutProps;
    const [error, setError] = useState("");
    const [parametrs, setParametrs] = useState([]);

    async function getParametersFunc() {
        const res = await getParameters();
        setParametrs(res.data);
        console.log(res.data);
    }

    useEffect(() => {
        try {
            getParametersFunc();
        } catch (err) {
            setError(err);
        }
    }, []);

    return (
        <div>
            <div>
                <DashboardNav />
            </div>
            <div id="divid">
                <Paper id="paper" className={classes.paper} elevation={3}>
                    {parametrs &&
                        parametrs
                            .filter((cam) => cam.hash == hashprops)
                            .map((parametr) => (
                                <div>
                                    <Divider
                                        style={{
                                            width: "98%",
                                            alignSelf: "center",
                                        }}
                                    />
                                    <div id="buscarR" className={classes.root}>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Id
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                {` ${parametr.id} `}{" "}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Titulo encabezado
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.texto} `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Hash
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.hash } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                fecha Vencimiento
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            ></Grid>
                                        </Grid>
                                    </div>
                                </div>
                            ))}
                </Paper>
            </div>
        </div>
    );
};
export default ShowParameters;

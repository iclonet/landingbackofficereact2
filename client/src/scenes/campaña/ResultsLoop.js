import React, { useEffect, useState } from "react";
import { getParametersByHash } from "../api";
import { FormControl, TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import "./css/formCampaña.css";
import AddParameters from '../Parametros/AddParameters';

const ResultLoop = (props) => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
        },
        formControl: {
            width: "100%",
        },
        textField: {
            //marginTop: theme.spacing(2),
            width: "100%",
            marginLeft: theme.spacing(3),
        },
        textFieldR: {
            marginTop: theme.spacing(2),
            width: "80%",
            marginLeft: theme.spacing(3),
            color: "black",
        },
        root: {
            ...theme.typography.button,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();
    const [campañas, setCampañas] = useState([]);
    const [error, setError] = useState("");
    const [user, setUser] = React.useState([]);
    const [result, setResult] = React.useState(false);
    const [search, setSearch] = useState(true);
    const [param, setParam] = useState(false);
    const [showParam, setShowParam] = useState(false);
    const [addParamButton, setAddParamButton] = useState(true);
    const [verParam, setVerParam] = useState(false);
    const [hash, setHash] = React.useState("");

    const campaña = props.campaña;

    async function getParametersFunc(hash) {
        const res = await getParametersByHash(hash);
        console.log(res.status);
        if (res.status === 200) {
            setAddParamButton(false);
            setVerParam(true);
        }
    }
    useEffect(() => {
        try {
            getParametersFunc(campaña.hash);
        } catch (err) {
            setError(err);
        }
    }, [campaña]);
    return (
        <div id="buscarR" className={classes.root}>
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
                >
                    {` ${campaña.hash} `}{" "}
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
                    Nombre
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textTransform: "none",
                    }}
                >{` ${campaña.nombre} `}</Grid>
            </Grid>
            <Grid container>
                <Grid
                    item
                    xs
                    style={{
                        textTransform: "none",
                    }}
                >
                    fecha Lanzamiento
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textTransform: "none",
                    }}
                >{` ${campaña.fechaLanzamiento} `}</Grid>
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
                >{` ${campaña.fechaVencimiento} `}</Grid>
            </Grid>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {verParam == true && (
                       <Link to={{
                        pathname:'/showparameters',
                        aboutProps:campaña.hash
                    }} style={{ textDecoration: "none" }}>
                         <Button
                        style={{
                            width: "100%",
                            alignSelf: "center",
                            marginTop: "4%",
                            marginBottom: "5%",
                        }}
                        bsStyle="primary"
                    >
                        Ver Parametros
                    </Button>
                    </Link>
                    )}
                </div>
                <div
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {addParamButton == true && (
                        <Link to={{
                            pathname:'/parameters',
                            aboutProps:campaña.hash
                        }} style={{ textDecoration: "none" }}>
                             <Button
                            style={{
                                width: "100%",
                                alignSelf: "center",
                                marginTop: "4%",
                                marginBottom: "5%",
                            }}
                            bsStyle="primary"
                        >
                            Agregar Parametros
                        </Button>
                        </Link>
                       
                    )}
                </div>
            </div>
            <Divider
                style={{
                    width: "98%",
                    alignSelf: "center",
                }}
            />
        </div>
    );
};
export default ResultLoop;

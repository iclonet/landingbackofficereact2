import React, { useEffect, useState } from "react";
import { getCampaigns, getParametersByHash } from "../api";
import UiUtils from "../../utils/UiUtils";
import ApiClient from "../../utils/ApiClient";
import { FormControl, TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DashboardNav from "../dashboard/components/navbar/Navbar";
import Divider from "@material-ui/core/Divider";
import "./css/formCampaña.css";
import ResultLoop from './ResultsLoop';

const Results = (props) => {
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
    const [error, setError] = useState("");
    const [user, setUser] = React.useState([]);
    const [result, setResult] = React.useState(false);
    const [search, setSearch] = useState(true);
    const [param, setParam] = useState(false);
    const [showParam, setShowParam] = useState(false);
    const [addParamButton, setAddParamButton] = useState(true);
    const [verParam, setVerParam] = useState(false);
    const [hash, setHash] = React.useState("");

    const input = props.input;
    const clientId = props.clientId;
    const campañas = props.campañas;
    
    return (
        <div>
            <DashboardNav />
            <div id="divid">
                <Paper id="paper" className={classes.paper} elevation={3}>
                    <h1 style={{ alignSelf: "center" }}>Buscar Campaña</h1>
                    <Divider
                        style={{
                            width: "98%",
                            alignSelf: "center",
                        }}
                    />
                    {campañas &&
                        campañas
                            .filter(
                                (cam) =>
                                    (cam.nombre == input ||
                                        cam.hash == input) &&
                                    cam.nroCliente == clientId
                            )
                            .map((campaña) => <ResultLoop campaña={campaña} />)}
                    <Button
                        style={{
                            width: "50%",
                            alignSelf: "center",
                            marginTop: "2%",
                            marginBottom: '2%'
                        }}
                        bsStyle="primary"
                        onClick={() => window.location.reload(false)}
                    >
                        Volver
                    </Button>
                    <Divider
                        style={{
                            width: "98%",
                            alignSelf: "center",
                        }}
                    />
                </Paper>
            </div>
        </div>
    );
};
export default Results;

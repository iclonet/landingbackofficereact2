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
import Results from "./Results";

const BuscarCampaña = (props) => {

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
    const [input, setInput] = React.useState("");
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

    async function getCampaignFunc() {
        const res = await getCampaigns();
        setCampañas(res.data);
    }
    function getData() {
        UiUtils.showProgress(true);
        ApiClient.getAccount()
            .then(onFinishGetAccount)
            .then(() => {
                UiUtils.showProgress(true);
                return ApiClient.getListUsers();
            })
            .catch((error) => {
                UiUtils.showProgress(false);
                UiUtils.showError(error);
            });
    }

    function onFinishGetAccount(res) {
        UiUtils.showProgress(false);
        if (res.result.code === 200) {
            setUser(res.data);
        } else {
            throw UiUtils.handledError(res.result.info);
        }
    }
    useEffect(() => {
        try {
            getData();
            getCampaignFunc();
        } catch (err) {
            setError(err);
        }
    }, []);


    const SearchCapaign = () => {
        const label = (label) => {
            <p id="label">{label}</p>;
        };

        const buscar = () => {
            setInput(document.getElementById("buscar").value);
            setSearch(false);
            setResult(true);
        };
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
                        <form
                            style={{
                                marginTop: "5%",
                                marginBottom: "5%",
                                width: "100%",
                                alignSelf: "center",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <FormControl>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <TextField
                                            className={classes.textField}
                                            placeholder="Buscar campaña por nombre o hash"
                                            label={label("Buscar ")}
                                            id="buscar"
                                            name="buscar"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            style={{
                                                width: "50%",
                                                alignSelf: "center",
                                                marginTop: "4%",
                                            }}
                                            bsStyle="primary"
                                            onClick={buscar}
                                        >
                                            buscar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </form>
                    </Paper>
                </div>
            </div>
        );
    };

    return (
        <div>
            
            {search == true ? <SearchCapaign /> : null}
            {result == true ? <Results input={input} clientId={user.idCliente} campañas={campañas} /> : null}
            
        </div>
    );
};
export default BuscarCampaña;

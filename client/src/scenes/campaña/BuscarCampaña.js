import React, { useEffect, useState } from "react";
import { getCampaigns } from "../api";
import UiUtils from "../../utils/UiUtils";
import ApiClient from "../../utils/ApiClient";
import {
    FormControl,
    TextField,
} from "@material-ui/core";
import { Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DashboardNav from "../dashboard/components/navbar/Navbar";
import Divider from "@material-ui/core/Divider";
import "./css/formCampaña.css";
import AddParameters from "../Parametros/AddParameters";


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
    
    async function getCampaignByClientIdFunc() {
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
            getCampaignByClientIdFunc();
        } catch (err) {
            setError(err);
        }
    }, []);
    const label = (label) => {
        <p id="label">{label}</p>;
    };

    const buscar = () => {
        setInput(document.getElementById("buscar").value);
        setResult(true);
    };

    const addParam = () => {
        if(search == true){
            setSearch(false);
            setParam(true);
        }
    }
   const [hash , setHash] = React.useState('');

   const SearchCapaign = () => {
        const clientId = user.idCliente;
    
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
                        {result == true ? (
                            <div>
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
                                                cam.hash == input ) &&
                                                cam.nroCliente == clientId
                                        )
                                        .map((campaña) => (
                                            
                                            
                                            <div
                                                id="buscarR"
                                                className={classes.root}
                                            >
                                                <Grid container>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                        Hash
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}

                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >{` ${campaña.hash} `} </Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                        Nombre
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >{` ${campaña.nombre} `}</Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                        fecha Lanzamiento
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >{` ${campaña.fechaLanzamiento} `}</Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                        fecha Vencimiento
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                        }}
                                                    >{` ${campaña.fechaVencimiento} `}</Grid>
                                                </Grid>
                                                <Divider
                                                    style={{
                                                        width: "98%",
                                                        alignSelf: "center",
                                                    }}
                                                />
                                                <Grid container>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        style={{
                                                            textTransform: "none",
                                                            marginBottom: "2%"
                                                        }}
                                                    >
                                                        <Button
                                                            style={{
                                                                width: "50%",
                                                                alignSelf: "center",
                                                                marginTop: "4%",
                                                            }}
                                                            bsStyle="primary"
                                                            // onClick={buscar}
                                                        >
                                                            Editar
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                    
                                                        <Button
                                                            style={{
                                                                width: "60%",
                                                                alignSelf: "center",
                                                                marginTop: "4%",
                                                            }}
                                                            bsStyle="primary"
                                                            onClick = { () =>{
                                                                if(search == true){
                                                                    setSearch(false);
                                                                    setParam(true);
                                                                    setHash(campaña.hash)
                                                                }
                                                            }}
                                                        >
                                                            Agregar Parametros
                                                        </Button>
                                                        
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                <Divider
                                    style={{
                                        width: "98%",
                                        alignSelf: "center",
                                    }}
                                />
                            </div>
                        ) : null}
                    </Paper>
                </div>
            </div>
        );
    }
   
    return (
        <div>
           {search == true ? <SearchCapaign /> : null} 
           {param == true ? <AddParameters hash={hash} /> : null } 
        </div>
    );
};
export default BuscarCampaña;

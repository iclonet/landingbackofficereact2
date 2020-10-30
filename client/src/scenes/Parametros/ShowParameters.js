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
           // marginBottom: theme.spacing(3),
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

    function trueFalse  (input) {
        if(input == true){
            return (<p>Sí</p>);
        }
        if(input == false){
            return (<p>No</p>);
        }
    }
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
                                     <h2 style={{ alignSelf: "center" }}>Los parametros de la campaña {` ${parametr.estrategia.nombre } `}</h2>
                                    <Divider
                                        style={{
                                            width: "98%",
                                            alignSelf: "center",
                                            marginBottom: "2%"
                                        }}
                                    />
                                    <div id="buscarR" >
                                   
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
                                                Habilita Nombre 
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.habilitaNombre } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Habilita Apellido 
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.habilitaApellido } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Habilita Localidad 
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.habilitaLocalidad } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Habilita Provincia 
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.habilitaProvincia } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                valida Email
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.validaEmail } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                valida Sms
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.validaSms } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                valida Score
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.validaScore } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                valida Dni
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.validaDni } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Texto Sobre Imagen
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.textoSobreImagen } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Texto Debajo Imagen
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.textoDebajoImagen } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Titulo 1 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.titulo1Formulario } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Detalle 1 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.detalle1Formulario } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Titulo 2 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.titulo2Formulario } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Detalle 2 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.detalle2Formulario } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                titulo 3 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.titulo3Formulario } `}</Grid>
                                        </Grid><Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Detalle 3 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.detalle3Formulario } `}</Grid>
                                        </Grid><Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Titulo 4 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.titulo4Formulario } `}</Grid>
                                        </Grid><Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Detalle 4 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.detalle4Formulario } `}</Grid>
                                        </Grid><Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Titulo 5 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.titulo5Formulario } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Detalle 5 pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.detalle5Formulario } `}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                Texto Pie Formulario
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                style={{
                                                    textTransform: "none",
                                                }}
                                            >{` ${parametr.textoPieFormulario } `}</Grid>
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

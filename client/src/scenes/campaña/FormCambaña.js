import React, { Component, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Panel, Row, Col } from "react-bootstrap";
import { FormGroup, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputLabel } from "@material-ui/core";
import  {createCampaign} from "../api";
import { FormControl, TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";


const FormCampaña = () => {
    const guardar = () => {
        if (deshabilitado === false) {
            setDeshabilitado(true);
            setParametros(true);
            setNuevo(true);
            formik.handleSubmit();
        }
    };
    const [error, setError] = useState("");
    const [deshabilitado, setDeshabilitado] = useState(false);
    const [parametros, setParametros] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const [campaña, setCampaña] = useState([]);

    const formik = useFormik({
        initialValues: {
            fechaLanzamiento: "",
            fechaVencimiento: "",
            habilitada: false,
            nombre: "",
            hash: "qqq",
            nroCliente: 84,
        },
        onSubmit: (values) => {
            const {
                fechaLanzamiento,
                fechaVencimiento,
                habilitada,
                nombre,
                hash,
                nroCliente,
            } = values;
            const cam = {
                fechaLanzamiento,
                fechaVencimiento,
                habilitada,
                nombre,
                hash,
                nroCliente,
            };
            createCampaignFunc(values);
            console.log("formik in submit");
            console.log(hashh);
            console.log(values);
            console.log(cam);
        },
    });
    async function createCampaignFunc(obj) {
        const res = await createCampaign(obj);
        setCampaña(res.data);
    }

    function makeHashString() {
        var text = "";
        var possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );

        return text;
    }
    const hashh = makeHashString();

    useEffect(() => {
        try {
            console.log(hashh);
        } catch (err) {
            setError(err);
        }
    }, []);

    return (
        <div style={{ width: "50%", marginLeft: "15%", marginTop: "5%" }}>
            <h1>Nueva Campaña</h1>
            <Panel header=" ">
                <form
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl
                        style={{
                            width: "50%",
                            alignSelf: "center",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <TextField
                            style={{ marginBottom: "2%", marginTop: "2%" }}
                            placeholder={hashh}
                            disabled={true}
                            id="hash"
                            name="hash"
                            //value={formik.values.apellido}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginBottom: "2%" }}
                            placeholder="Nombre"
                            label="Nombre"
                            id="nombre"
                            name="nombre"
                            onChange={formik.handleChange}
                            value={formik.values.nombre}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginBottom: "2%" }}
                            placeholder="Fecha Lanzimiento"
                            label="Fecha Lanzimiento"
                            id="fechaLanzamiento"
                            name="fechaLanzamiento"
                            onChange={formik.handleChange}
                            value={formik.values.fechaLanzamiento}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginBottom: "2%" }}
                            placeholder="Fecha Vencimiento"
                            label="Fecha Vencimiento"
                            id="fechaVencimiento"
                            name="fechaVencimiento"
                            onChange={formik.handleChange}
                            value={formik.values.fechaVencimiento}
                            variant="outlined"
                        />

                        <Button
                            style={{
                                width: "50%",
                                alignSelf: "center",
                                marginBottom: "2%",
                            }}
                            type="submit"
                            bsStyle="primary"
                            disabled={deshabilitado}
                            onClick={guardar}
                        >
                            Guardar
                        </Button>
                        {nuevo == true && (
                            <Button
                                style={{
                                    width: "50%",
                                    alignSelf: "center",
                                    marginBottom: "2%",
                                }}
                                bsStyle="primary"
                                //onClick={this.guardar}
                            >
                                nuevo
                            </Button>
                        )}
                        {parametros == true && (
                            <Button
                                style={{
                                    width: "50%",
                                    alignSelf: "center",
                                    marginBottom: "2%",
                                }}
                                bsStyle="primary"
                                //onClick={this.guardar}
                            >
                                Agregar parametros
                            </Button>
                        )}
                    </FormControl>
                </form>
            </Panel>
        </div>
    );
};
FormCampaña.propTypes = {
    match: PropTypes.object,
};

export default FormCampaña;

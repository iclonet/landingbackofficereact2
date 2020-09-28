import React, { Component, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Panel, Row, Col } from "react-bootstrap";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputLabel } from "@material-ui/core";
import {createCampaign} from '../api';

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
            fecha_lanzamiento: "",
            fecha_vencimiento: "",
            habilitada: false,
            nombre: "",
            hash: {hashh},
            nro_cliente: 84,
        },
        onSubmit: (values) => {
        const { fecha_lanzamiento, fecha_vencimiento, habilitada, nombre, hash,nro_cliente } = values;
        const cam = {fecha_lanzamiento, fecha_vencimiento, habilitada, nombre, hash,nro_cliente};
        createCampaignFunc(cam);
        console.log("formik in submit");
        console.log(values);
        console.log(cam);
        },
    });
    async function createCampaignFunc(obj) {
            const res = await createCampaign(obj);
            setCampaña(res.data);
      }

    function makeHashString (){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          
        return (text);
      };
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <FormGroup
                        style={{
                            width: "50%",
                            alignSelf: "center",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                        onSubmit={formik.handleSubmit}
                    >
                        <InputLabel
                            style={{
                                fontSize: "16pt",
                                fontFamily: "Roboto",
                                marginTop: "2%",
                            }}
                        >
                            Hash
                        </InputLabel>

                        <FormControl
                            style={{ marginBottom: "2%" }}
                            placeholder={hashh}
                            disabled = {true}
                        ></FormControl>
                        <InputLabel
                            style={{ fontSize: "16pt", fontFamily: "Roboto" }}
                        >
                            Nombre
                        </InputLabel>

                        <FormControl
                            style={{ marginBottom: "2%" }}
                            placeholder="Nombre"
                            onChange={formik.handleChange}
                            value={formik.values.sucursalId}
                            // onKeyPress={this.handleEnterPress}
                        ></FormControl>
                        <InputLabel
                            style={{ fontSize: "16pt", fontFamily: "Roboto" }}
                        >
                            Fecha Lanzimiento
                        </InputLabel>
                        <FormControl
                            style={{ marginBottom: "2%" }}
                            placeholder="Fecha Lanzimiento"
                            type="date"
                            onChange={formik.handleChange}
                            selected={formik.values.fecha_lanzamiento}
                            // onKeyPress={this.handleEnterPress}
                        ></FormControl>
                        <InputLabel
                            style={{ fontSize: "16pt", fontFamily: "Roboto" }}
                        >
                            Fecha Vencimiento
                        </InputLabel>
                        <FormControl
                            type="date"
                            style={{ marginBottom: "2%" }}
                            placeholder="Fecha Vencimiento"
                            onChange={formik.handleChange}
                            selected={formik.values.fecha_vencimiento}
                            // onKeyPress={this.handleEnterPress}
                        ></FormControl>

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
                            Guaradar
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
                    </FormGroup>
                </div>
            </Panel>
        </div>
    );
};
export default FormCampaña;

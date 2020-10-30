import axios from "axios";
var randomstring = require("randomstring");

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const hashh = randomstring.generate(5);

export const createCampaign = async (values) => {
    const url = `estrategias/create`;
    const request = {
        fechaLanzamiento: values.fechaLanzamiento,
        fechaVencimiento: values.fechaVencimiento,
        habilitada: values.habilitada,
        nombre: values.nombre,
        hash: hashh,
        nroCliente: values.nroCliente,
    };
    
    return await api.post(url, request);
};
export const addParametrs = async (values) => {
    const url = `parametros/create`;
    const request = {
        texto: values.texto,
        habilitaNombre: values.habilitaNombre,
        habilitaApellido: values.habilitaApellido,
        habilitaLocalidad: values.habilitaLocalidad,
        habilitaProvincia: values.habilitaProvincia,
        validaEmail: values.validaEmail,
        validaSms: values.validaSms,
        validaScore: values.validaScore,
        validaDni: values.validaDni,
        imagenBackground: values.imagenBackground,
        imagenLogo: values.imagenLogo,
        estrategia: values.estrategia,
        hash: values.hash,
        textoSobreImagen: values.textoSobreImagen,
        textoDebajoImagen: values.textoDebajoImagen,
        textoPieFormulario: values.textoPieFormulario,
        titulo1Formulario: values.titulo1Formulario,
        detalle1Formulario: values.detalle1Formulario,
        titulo2Formulario: values.titulo2Formulario,
        detalle2Formulario: values.detalle2Formulario,
        titulo3Formulario: values.titulo3Formulario,
        detalle3Formulario: values.detalle3Formulario,
        titulo4Formulario: values.titulo4Formulario,
        detalle4Formulario: values.detalle4Formulario,
        titulo5Formulario: values.titulo5Formulario,
        detalle5Formulario: values.detalle5Formulario,
    };
    console.log("api add parametross");
    console.log(request);
    return await api.post(url, request);
};
export const getCampaigns = async () => {
    const url = `estrategias/findAll`;
    return await api.get(url);
};
export const getCampaignByHash = async (hash) => {
    const url = `estrategias/findByHash?hash=${hash}`;
    return await api.get(url);
    
};
export const getParameters = async () => {
    const url = `parametros/findAll`;
    return await api.get(url);
    
};export const getParametersByHash = async (hash) => {
    const url = `parametros/findByHash?hash=${hash}`;
    return await api.get(url);
    
};
import axios from 'axios';
//const urlBase = 'http://localhost:8080/api/v1/'
export const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1/',
	headers: {
			'Content-Type': 'application/json'
	},
})


export const createCampaign = async (values) => {
	const url = `estrategias/create`;
	const request = { 
        fechaLanzamiento: values.fechaLanzamiento,
        fechaVencimiento: values.fechaVencimiento,
        habilitada: values.habilitada,
        nombre: values.nombre,
        hash: values.hash,
        nroCliente: values.nroCliente,
									}
	return await api.post(url, request);
}
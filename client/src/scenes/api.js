import axios from 'axios';
//const urlBase = 'http://localhost:8080/api/v1/'
export const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1/',
	headers: {
			'Content-Type': 'application/json'
	},
})


export const createCamoaign = async (values) => {
	const url = `estrategias/create`;
	const request = { 
        fecha_lanzamiento: values.fecha_lanzamiento,
        fecha_vencimiento: values.fecha_vencimiento,
        habilitada: values.habilitada,
        nombre: values.nombre,
        hash: values.hash,
        nro_cliente: values.nro_cliente,
									}
	return await api.post(url, request);
}
import axios from 'axios';
var randomstring = require("randomstring");

export const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1/',
	headers: {
			'Content-Type': 'application/json'
	},
})

const NroClient = (props) => {
	function id (){
		return id = props.id;
	}
	return (
		id()
	);
}

export const hashh = randomstring.generate(5) ;

export const createCampaign = async (values) => {
	const url = `estrategias/create`;
	const request = { 
        fechaLanzamiento: values.fechaLanzamiento,
        fechaVencimiento: values.fechaVencimiento,
        habilitada: values.habilitada,
        nombre: values.nombre,
        hash: hashh,
        nroCliente: values.nroCliente,
									}	
									console.log(request);						
	return await api.post(url, request);
}
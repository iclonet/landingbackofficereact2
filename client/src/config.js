import pjson from './../package.json';
import keyMirror from 'keymirror';

export const AGD_DOMAIN = 'agd-online.com';
export const REPORTES_DOMAIN = 'reportes.agd-online.com';
export const API_BASE = '/api/';
export const API_VERSION = 'v1/';
export const CLIENT_VERSION = pjson.version;
export const REACT_VERSION = pjson.dependencies.react;

console.log("Versión ".concat(CLIENT_VERSION).concat(" - ".concat(process.env.NODE_ENV)));

export const CONTACTO_WHATSAPP = '5491124115953';

export const PERSONAS_SEARCH_OPTIONS = [
    {
        value: 'dni',
        desc: 'DNI',
        numberOnly: true
    }, {
        value: 'cuil',
        desc: 'CUIL',
        numberOnly: true
    }, {
        value: 'apellido',
        desc: 'Apellido y Nombre'
    }
];
export const EMPRESAS_SEARCH_OPTIONS = [
    {
        value: 'cuit',
        desc: 'CUIT',
        numberOnly: true
    }, {
        value: 'razon',
        desc: 'Razón social'
    }
];
export const AUTOMOTORES_SEARCH_OPTIONS = [
    {
        value: 'dominio',
        desc: 'Dominio',
        carPlate: true
    }
];
export const TELEFONOS_SEARCH_OPTIONS = [
    {
        value: 'fijo',
        desc: 'Fijo',
        numberOnly: true
    }, {
        value: 'cel',
        desc: 'Celular',
        numberOnly: true
    }
];
export const PROVINCIAS_SEARCH_OPTIONS = [
    {
        id: 0,
        value: '',
        desc: 'Todas'
    }, {
        id: 1,
        value: 'BUENOS AIRES',
        desc: 'Buenos aires'
    }, {
        id: 3,
        value: 'CATAMARCA',
        desc: 'Catamarca'
    }, {
        id: 4,
        value: 'CHACO',
        desc: 'Chaco'
    }, {
        id: 5,
        value: 'CHUBUT',
        desc: 'Chubut'
    }, {
        id: 2,
        value: 'CAPITAL FEDERAL',
        desc: 'Ciudad Autónoma de Buenos Aires'
    }, {
        id: 6,
        value: 'CORDOBA',
        desc: 'Cordoba'
    }, {
        id: 7,
        value: 'CORRIENTES',
        desc: 'Corrientes'
    }, {
        id: 8,
        value: 'ENTRE RIOS',
        desc: 'Entre Rios'
    }, {
        id: 9,
        value: 'FORMOSA',
        desc: 'Formosa'
    }, {
        id: 10,
        value: 'JUJUY',
        desc: 'Jujuy'
    }, {
        id: 11,
        value: 'LA PAMPA',
        desc: 'La Pampa'
    }, {
        id: 12,
        value: 'LA RIOJA',
        desc: 'La Rioja'
    }, {
        id: 13,
        value: 'MENDOZA',
        desc: 'Mendoza'
    }, {
        id: 14,
        value: 'MISIONES',
        desc: 'Misiones'
    }, {
        id: 15,
        value: 'NEUQUEN',
        desc: 'Neuquen'
    }, {
        id: 16,
        value: 'RIO NEGRO',
        desc: 'Rio Negro'
    }, {
        id: 17,
        value: 'SALTA',
        desc: 'Salta'
    }, {
        id: 18,
        value: 'SAN JUAN',
        desc: 'San Juan'
    }, {
        id: 19,
        value: 'SAN LUIS',
        desc: 'San Luis'
    }, {
        id: 20,
        value: 'SANTA CRUZ',
        desc: 'Santa Cruz'
    }, {
        id: 21,
        value: 'SANTA FE',
        desc: 'Santa Fe'
    }, {
        id: 22,
        value: 'SANTIAGO DEL ESTERO',
        desc: 'Santiago del Estero'
    }, {
        id: 23,
        value: 'TIERRA DEL FUEGO',
        desc: 'Tierra del Fuego'
    }, {
        id: 24,
        value: 'TUCUMAN',
        desc: 'Tucuman'
    }
];
export const NACIONALIDAD_SEARCH_OPTIONS = [
    {
        value: '',
        desc: 'Todos'
    }, {
        value: 'arg',
        desc: 'Argentinos'
    }, {
        value: 'ext',
        desc: 'Extranjeros'
    }
];
export const ETARIO_SEARCH_OPTIONS = [
    {
        value: '|',
        desc: 'Todos'
    }, {
        value: '|20',
        desc: 'Menos de 20'
    }, {
        value: '20|29',
        desc: 'Entre 20 y 29'
    }, {
        value: '30|39',
        desc: 'Entre 30 y 39'
    }, {
        value: '40|49',
        desc: 'Entre 40 y 49'
    }, {
        value: '50|59',
        desc: 'Entre 50 y 59'
    }, {
        value: '60|69',
        desc: 'Entre 60 y 69'
    }, {
        value: '70|',
        desc: '70 o más'
    }
];
export const VARIABLES_PERSONAS = [
    {
        key: 'Edad',
        value: 'Edad'
    }, {
        key: 'Dni',
        value: 'Rango DNI'
    }, {
        key: 'Ultimo periodo BCRA',
        value: 'Último Periodo BCRA'
    }, {
        key: 'Histórico BCRA',
        value: 'Histórico BCRA'
    }, {
        key: 'Cheque rechazados',
        value: 'Cheques rechazados'
    }, {
        key: 'Historico morosidad',
        value: 'Histórico de Morosidad'
    }, {
        key: 'Laboral',
        value: 'Laboral'
    }, {
        key: 'Fallecidos',
        value: 'Fallecido'
    }, {
        key: 'Cantidad de Consulta',
        value: 'Cantidad de Consultas'
    }
];
export const VARIABLES_EMPRESAS = [
    {
        key: 'Ultimo periodo BCRA',
        value: 'Último Periodo BCRA'
    }, {
        key: 'Histórico BCRA',
        value: 'Histórico BCRA'
    }, {
        key: 'Cheque rechazados',
        value: 'Cheques rechazados'
    }, {
        key: 'Historico morosidad',
        value: 'Histórico de Morosidad'
    }, {
        key: 'Cantidad de Consulta',
        value: 'Cantidad de Consultas'
    }
]
export const OPERADOR_SEARCH_OPTIONS = [
    {
        value: '',
        descripcion: ''
    }, {
        value: 'mayor',
        descripcion: 'MAYOR'
    }, {
        value: 'menor',
        descripcion: 'MENOR'
    }, {
        value: 'igual',
        descripcion: 'IGUAL'
    }
];
export const OPERADOR2_SEARCH_OPTIONS = [
    {
        value: '',
        descripcion: ''
    }, {
        value: 'entre',
        descripcion: 'ENTRE'
    }, {
        value: 'mayor',
        descripcion: 'MAYOR'
    }, {
        value: 'menor',
        descripcion: 'MENOR'
    }
];
export const OPERADOR3_SEARCH_OPTIONS = [
    {
        value: '',
        descripcion: ''
    }, {
        value: 'igual',
        descripcion: 'IGUAL'
    }, {
        value: 'distinto',
        descripcion: 'DISTINTO'
    }
];
export const SEXO_SEARCH_OPTIONS = [
    {
        value: '',
        descripcion: ''
    }, {
        value: 'M',
        descripcion: 'MASCULINO'
    }, {
        value: 'F',
        descripcion: 'FEMENINO'
    }
];

export const INFO_KEY = keyMirror({
    general: null,
    domicilioFiscal: null,
    domAlternativos: null,
    mails: null,
    situacionFiscal: null,
    art: null,
    empAportes: null,
    sueldos: null,
    pagosImpuestos: null,
    //Datos Laborales
    domAportes: null,
    sueldosCobrados: null,
    datoLaboral: null,
    monotributista: null,
    aportesAM: null,
    actividad: null,
    obraSocial: null,
    empDomesticos: null,
    seguridadSocial: null,
    jubilacion: null,
    //Vinculos
    vinculos: null,
    otrosVinculos: null,
    //Boletin Oficial
    parteSociedad: null,
    //Bienes
    propiedades: null,
    automotores: null,
    //Morosidad
    deudoresBancoCentral: null,
    juiciosDemandado: null,
    juiciosActor: null,
    embargos: null,
    chequesRechazados: null,
    informacionBcra: null,
    //Sit financiera
    tarjetas: null,
    bancoOpera: null,
    facturacion: null,
    //telefonos
    telefonos: null,
    telefonosAdicionales: null,
    telefonosCelulares: null,
    //paticipacion societaria
    participacionSocietaria: null

})

export const STORAGE_KEYS = keyMirror({
    token: null,
    expireDate: null,
    user: null,
    account: null,
    logo: null,
    accessTimes: 0
});

export const HTTP_METHODS = keyMirror({get: null, post: null, put: null});

export const EVENT_KEYS = keyMirror({BLOCK_UI: null, NAVIGATE_TO: null, SHOW_ALERT: null});

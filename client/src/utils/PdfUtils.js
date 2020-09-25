import lstrings from './LStrings';
import moment from 'moment';
import numeral from 'numeral';
import {
    flatMap,
    orderBy,
    reduce,
    filter,
    sortBy,
    find
} from 'lodash';
import TableUtils from './TableUtils';
import RefIcons from './RefIcons';
import PdfDoc from './PdfDoc';
import {
    map
} from 'lodash';


/**
 * Agrego el encabezado del PDF
 * 
 * @param {*} doc 
 * @param {*} nombre 
 * @param {*} cuil 
 * @param {*} idLog 
 * @param {*} status 
 * @param {*} fecha 
 * @param {*} score 
 * @param {*} puntaje 
 */
function header(doc, nombre, cuil, idLog, status, fecha, score, puntaje) {
    doc.addText(nombre, "header");
    doc.addEmptyLine();

    const cuilCol = doc.createText(
        `${lstrings.cuitcuil_title}: ${cuil}\nStatus: ${status}`, "h3");
    cuilCol.width = "*";

    const consultaCol = doc.createText(
        `${lstrings.fecha}: ${fecha}\nCódigo de consulta: ${idLog}`, "h3");
    consultaCol.width = "*";

    let pje = parseInt(puntaje)
    if (!Number.isInteger(pje)) {
        pje = -1
    }

    let styles = ["score"]
    switch (pje) {
        case 5:
            styles.push("puntaje", "puntaje5")
            break;
        case 4:
            styles.push("puntaje", "puntaje4")
            break;
        case 3:
            styles.push("puntaje", "puntaje3")
            break;
        case 2:
            styles.push("puntaje", "puntaje2")
            break;
        case 1:
            styles.push("puntaje", "puntaje1")
            break;
        case -1:
        default:
            score = "--"
    }

    let scoreCol = {}
    scoreCol.text = [
        doc.createText('Score: ', "score"),
        doc.createText(score, styles),
    ]
    scoreCol.width = "*";

    const headerCols = {};
    headerCols.columns = [cuilCol, consultaCol, scoreCol];
    doc.addRawDef(headerCols);
}

function tableActividad(doc, dla) {
    if (dla == null) {
        return;
    }

    const dla_h = ["Codigo", "Actividad"];
    const dla_d = dla.datos.map(info => {
        return [info.ciiu, info.descripcion]
    })
    doc.addSimpleTable(lstrings.actividades_title, dla_h, dla_d, ['auto', '*']);

}

/**
 * Contruye una tabla de aportes, indicando para cada año y mes la situación correspondiente.
 * Luego de la tabla principal, muestra una tabla de referencias.
 * 
 * @param {PdfDoc} doc 
 * @param {Array} dlsda 
 * @param {String} table_title 
 */
function tableAportes(doc, dlsda, table_title) {
    const dlsda_h = [
        lstrings.agno,
        lstrings.mes_ene,
        lstrings.mes_feb,
        lstrings.mes_mar,
        lstrings.mes_abr,
        lstrings.mes_may,
        lstrings.mes_jun,
        lstrings.mes_jul,
        lstrings.mes_ago,
        lstrings.mes_sep,
        lstrings.mes_oct,
        lstrings.mes_nov,
        lstrings.mes_dic
    ];

    let dlsda_d = {};

    dlsda.forEach((item) => {
        // Año en formato string
        let anio = item.fecpres.substring(0, 4);
        // Mes en formato número
        let mes = Number(item.fecpres.substring(5, 7));

        // Si no existe una entrada para el año, la creo
        if (!dlsda_d[anio]) {
            dlsda_d[anio] = [];
            dlsda_d[anio].push(anio);
            // Completo todos los meses con un valor por defecto
            for (let x = 1; x <= 12; x++) {
                dlsda_d[anio].push([{
                    image: this.chooseRefIconAportes(null),
                    fit: [15, 15],
                    alignment: 'center',
                    border: [true, false, true, true]
                }]);
            }
        }

        // Completo el mes actual con el valor correspondiente
        dlsda_d[anio][mes] = [{
            image: this.chooseRefIconAportes(item.pago),
            fit: [15, 15],
            alignment: 'center',
            border: [true, false, true, true]
        }];
    });

    dlsda_d = map(dlsda_d, (x) => x);

    doc.addSimpleTable(table_title, dlsda_h, dlsda_d, ["auto", "*"]);

    //Tabla de referencias
    doc.addRefTable(RefIcons.imgs_refs_aportes, "aportes_ref_");
}

/**
 * Devuelve el ícono correspondiente al estado del pago mensual.
 * 
 * @param {Boolean} value estado del pago (true/false/null) para seleccionar el ícono
 */
function chooseRefIconAportes(value) {
    switch (value) {
        case false:
            // Fuera de término
            return RefIcons.imgs_refs_aportes[1];

        case true:
            // En término
            return RefIcons.imgs_refs_aportes[0];

        default:
            // No registra información
            return RefIcons.imgs_refs_aportes[2];
    }
}

function tableEmpAportes(doc, dgea, nomina) {
    if (dgea == null)
        return;

    let data = orderBy(flatMap(dgea.datos, (x) => x), ['periodo'], ['desc']);

    doc.addText(lstrings.emp_aportes_title, 'tableTitle');

    const dega_h = ['Año', 'Cantidad de empleados'];
    const dega_d = data.map(item => [item.periodo, item.cantidadEmpleados]);
    const dega_rh = ['CUIL', 'Nombre'];
    const dega_t = doc.createSimpleTable(dega_h, dega_d);

    if (nomina === true) {
        for (var i = dega_d.length; i > 0; i--) {
            if (data[i - 1]) {
                let dega_rd = data[i - 1].empleados.map(item => [item.cuil, item.nombre]);
                if (dega_rd.length > 0) {
                    var it = doc.createSimpleTable(dega_rh, dega_rd);
                    dega_t.table.body.splice(i + 1, 0, [{
                        colSpan: 2,
                        table: it.table
                    }]);
                }
            }
        }
    }
    doc.addRawDef(dega_t);
}

function tableSueldosPagados(doc, dgs) {
    if (dgs == null)
        return;

    const dgsi_agnos = [];
    const dgsi_acum = {};
    const dgsi_meses = {};
    dgs.datos.forEach((item) => {
        const periodo = moment(item.periodo);
        const agno = periodo.year();
        dgsi_agnos.push(agno);
        if (!dgsi_acum[agno]) {
            dgsi_acum[agno] = 0;
            dgsi_meses[agno] = new Array(12).fill(0)
        }

        dgsi_acum[agno] += item.remuneracion;
        const mes = periodo.month();
        dgsi_meses[agno][mes] += item.remuneracion;
    }, this);

    const dgsi_agnos_uniq = [...new Set(dgsi_agnos)].sort();

    const dgs_h = [lstrings.agno, lstrings.total];
    const dgs_d = dgsi_agnos_uniq.map((agno) => {
        return [agno, TableUtils.ARSFormat(dgsi_acum[agno])];
    });

    doc.addText(lstrings.sueldospagos_title, 'tableTitle');
    const dgs_t = doc.createSimpleTable(dgs_h, dgs_d);
    const dgs_sth = [lstrings.mes_ene, lstrings.mes_feb, lstrings.mes_mar, lstrings.mes_abr, lstrings.mes_may, lstrings.mes_jun, lstrings.mes_jul, lstrings.mes_ago, lstrings.mes_sep, lstrings.mes_oct, lstrings.mes_nov, lstrings.mes_dic];
    for (var i = dgsi_agnos_uniq.length; i > 0; i--) {
        var it = doc.createSimpleTable(dgs_sth, [dgsi_meses[dgsi_agnos_uniq[i - 1]].map(item => TableUtils.ARSFormat(item, true))]);
        dgs_t.table.body.splice(i + 1, 0, [{
            colSpan: 2,
            table: it.table
        }]);
    }

    doc.addRawDef(dgs_t);
}

function tableSueldosCobrados(doc, dgs) {
    if (dgs == null)
        return;

    const dgsi_agnos = [];
    const dgsi_acum = {};
    const dgsi_meses = {};
    dgs.datos.forEach((item) => {
        const periodo = moment(item.periodo);
        const agno = periodo.year();
        dgsi_agnos.push(agno);
        if (!dgsi_acum[agno]) {
            dgsi_acum[agno] = 0;
            dgsi_meses[agno] = new Array(12).fill(0)
        }

        dgsi_acum[agno] += item.remuneracion;
        const mes = periodo.month();
        dgsi_meses[agno][mes] += item.remuneracion;
    }, this);

    const dgsi_agnos_uniq = [...new Set(dgsi_agnos)].sort().reverse();

    const dgs_h = [lstrings.agno, lstrings.total];
    const dgs_d = dgsi_agnos_uniq.map((agno) => {
        return [agno, TableUtils.ARSFormat(dgsi_acum[agno])];
    });

    doc.addText(lstrings.sueldoscobrados_title, 'tableTitle');
    const dgs_t = doc.createSimpleTable(dgs_h, dgs_d);
    const dgs_sth = [lstrings.mes_ene, lstrings.mes_feb, lstrings.mes_mar, lstrings.mes_abr, lstrings.mes_may, lstrings.mes_jun, lstrings.mes_jul, lstrings.mes_ago, lstrings.mes_sep, lstrings.mes_oct, lstrings.mes_nov, lstrings.mes_dic];
    for (var i = dgsi_agnos_uniq.length; i > 0; i--) {
        var it = doc.createSimpleTable(dgs_sth, [dgsi_meses[dgsi_agnos_uniq[i - 1]].map(item => TableUtils.ARSFormat(item, true))]);
        dgs_t.table.body.splice(i + 1, 0, [{
            colSpan: 2,
            table: it.table
        }]);
    }

    doc.addRawDef(dgs_t);
}

/**
 * 
 * @param {PdfDoc} doc documento que contiene la definición del PDF
 * @param {Array} dgs datos de jubilación
 */
function tableJubilaciones(doc, dgs) {
    if (dgs == null)
        return;

	// Defino las columnas de la tabla
	const dbo_h = [
		'CUIT',
		'Nombre',
		'Período',
		'Nii',
	];

	// Defino las columnas para cada fila
	const dbo_d = dgs.datos.map(item =>
		[
			item.cuil,
			item.titular,
			item.periodo,
			item.rango,
		]
	);

    doc.addSimpleTable(lstrings.jubilacion_title, dbo_h, dbo_d);
}

function tableSegSocial(doc, dl_ss) {
    if (dl_ss == null)
        return;
    const dl_ss_h = ['Período', 'Seguridad social aportes', 'Seguridad social contribuciones', 'Seguridad social retenciones', 'Obra social aportes', 'Obra social contribuciones', 'Obra social retenciones'];
    const dl_ss_d = dl_ss.datos.map(info => {
        return [moment(info.periodo).year(), info.segSocialAportes, info.segSocialContribu, info.segSocialRetencion, info.obSocialAportes, info.obSocialContribu, info.obSocialRetencion];
    })
    doc.addSimpleTable(lstrings.seguridadsocial_title, dl_ss_h, dl_ss_d);
}


function tableParteSociedad(doc, participacionSocietaria, boletinOficial,
	embargos, juiciosActor, juiciosDemandado) {
	// Participación Societaria
	if (participacionSocietaria) {
		const dps = participacionSocietaria.datos;

		const dps_h = [
			lstrings.archivo,
			lstrings.cuit,
			lstrings.fuente,
			lstrings.boletin,
			lstrings.fechaPublicacion,
			lstrings.nombre,
			lstrings.razonsocial,
			lstrings.fechaconstitucion,
			lstrings.cargo,
		];

		const dps_d = dps.map(info => {
			return [
				info.archivo,
				info.cuit,
				info.fuente,
				info.idboletin,
				TableUtils.dateFormat(info.fechaPublicacion),
				info.nombre,
				info.razonsocial,
				TableUtils.dateFormat(info.fechaConstitucion),
				info.cargo,
			]
		});

		doc.addSimpleTable(
			lstrings.sociedadesComercialesTitle,
			dps_h,
			dps_d,
			["auto", "auto", "auto", "auto", "auto", "*", "auto", "auto", "auto"]
		);
	}

	const dbo_h = [
		lstrings.fuente,
		lstrings.razonsocial,
		lstrings.fecha,
		lstrings.informe,
	];

	const dbo_d = boletinOficial.datos.map(item =>
		[
			item.fuente,
			item.razonSocial,
			TableUtils.dateFormat(item.fecha),
			item.informe
		]
	);

	doc.addSimpleTable(lstrings.participacionsociedades_title, dbo_h, dbo_d);
	
	// embargos
	if (embargos != null) {
		const dme_h = [
			lstrings.fecha,
			lstrings.numeroOficio,
			lstrings.expediente,
			lstrings.embargo,
			lstrings.fechaLevantamiento,
		];
		const dme_d = [];
		const dme_of_h = [
			lstrings.caratula,
			lstrings.juzgado,
			lstrings.domicilio,
			lstrings.telefono,
		];
		const dme_of_d = [];

		embargos.datos.forEach(item => {
			dme_d.push([
				TableUtils.dateFormat(item.fecha),
				item.nrooficio,
				item.expediente,
				item.caratula,
				TableUtils.dateFormat(item.fechaLevantamiento)
			]);

			dme_of_d.push([
				item.caratula,
				item.juzgado,
				item.domicilio,
				item.telefono
			]);
		});

		const dme_t = doc.createSimpleTable(dme_h, dme_d);
		let tof = {};
		// inyecto las subtablas en orden invertido para que la logica sea mas clara
		for (var i = embargos.length; i > 0; i--) {
			tof = doc.createSimpleTable(dme_of_h, [dme_of_d[i - 1]]);
			dme_t.table.body.splice(i + 1, 0, [{
				colSpan: dme_h.length,
				table: tof.table
			}]);
		}

		doc.addText(lstrings.embargos_title, 'tableTitle');
		doc.addRawDef(dme_t);
	}

	// juicios - demandado
	tableJuicios(doc, lstrings.juiciosdemandado_title, juiciosDemandado);

	// juicios - actor
	tableJuicios(doc, lstrings.juiciosactor_title, juiciosActor);
}

function tableImpuestos(doc, dim) {
    if (dim == null) {
        return;
    }

    const str_meses = [lstrings.mes_enero, lstrings.mes_febrero, lstrings.mes_marzo, lstrings.mes_abril, lstrings.mes_mayo, lstrings.mes_junio, lstrings.mes_julio, lstrings.mes_agosto, lstrings.mes_septiembre, lstrings.mes_octubre, lstrings.mes_noviembre, lstrings.mes_diciembre];

    const info = {};
    dim.datos.forEach((item) => {

        const periodo = moment(item.periodo);
        const agno = periodo.year();
        const mes = periodo.month();
        if (!info[agno]) {
            info[agno] = {
                segSocial: 0,
                monotributo: 0,
                contriSocial: 0,
                contriAutonomo: 0,
                autonomo: 0,
                total: 0,
                meses: [...Array(12)].map(() => {
                    return {
                        segSocial: 0,
                        monotributo: 0,
                        contriSocial: 0,
                        contriAutonomo: 0,
                        autonomo: 0,
                        total: 0
                    };
                })
            }
        }

        info[agno].segSocial += item.segSocial;
        info[agno].monotributo += item.monotributo;
        info[agno].contriSocial += item.contriSocial;
        info[agno].contriAutonomo += item.contriAutonomo;
        info[agno].autonomo += item.autonomo;

        info[agno].meses[mes].contriSocial += item.contriSocial;
        info[agno].meses[mes].contriAutonomo += item.contriAutonomo;
        info[agno].meses[mes].autonomo += item.autonomo;
        info[agno].meses[mes].segSocial += item.segSocial;
        info[agno].meses[mes].monotributo += item.monotributo;


        info[agno].total += item.segSocial + item.monotributo + item.contriSocial + item.contriAutonomo + item.autonomo;
        info[agno].meses[mes].total += item.segSocial + item.monotributo + item.contriSocial + item.contriAutonomo + item.autonomo;

    });

    let dim_h = [lstrings.periodo, lstrings.monotributo, lstrings.monotributoautonomo, lstrings.monotributosegsocial, lstrings.contribucionautonomo, lstrings.contribucionsegsocial, lstrings.total];

    let dim_sh = [lstrings.mes, lstrings.monotributo, lstrings.monotributoautonomo, lstrings.monotributosegsocial, lstrings.contribucionautonomo, lstrings.contribucionsegsocial, lstrings.total];

    const dim_d = [];

    for (let agno in info) {
        const item = info[agno];
        dim_d.push([
            agno,
            TableUtils.ARSFormat(item.monotributo),
            TableUtils.ARSFormat(item.autonomo),
            TableUtils.ARSFormat(item.segSocial),
            TableUtils.ARSFormat(item.contriAutonomo),
            TableUtils.ARSFormat(item.contriSocial),
            TableUtils.ARSFormat(item.total)
        ]);

        const subt = [];
        for (let i = 0; i < 12; i++) {
            subt.push([
                str_meses[i],
                TableUtils.ARSFormat(item.meses[i].monotributo),
                TableUtils.ARSFormat(item.meses[i].autonomo),
                TableUtils.ARSFormat(item.meses[i].segSocial),
                TableUtils.ARSFormat(item.meses[i].contriAutonomo),
                TableUtils.ARSFormat(item.meses[i].contriSocial),
                TableUtils.ARSFormat(item.meses[i].total)
            ]);

        }

        const sut = doc.createSimpleTable(dim_sh, subt);
        dim_d.push([{
            colSpan: dim_h.length,
            table: sut.table
        }]);
    }

    doc.addSimpleTable(lstrings.impuesto_title, dim_h, dim_d);

}

function panelContactacion(doc, dt, dta, dtc, mails) {
	doc.addText(lstrings.contactacion_title, 'subheader');
	
    if (dt) {
        const dt_h = [lstrings.nrotelefono, lstrings.tipolinea, lstrings.localidad];
        const dt_d = dt.datos.map((item) => {
            return [
                item.tel,
                item.tipo,
                item.localidad
            ]
        });
        doc.addSimpleTable(lstrings.telefonosPrincipales, dt_h, dt_d);
    }

    if (dta) {
        const dta_h = [lstrings.nombre, 'CUIL/CUIT', lstrings.nrotelefono, lstrings.tipolinea, lstrings.localidad];
        const dta_d = dta.datos.map((item) => {
            return [
                item.nombre,
                item.cuitlinea,
                item.tel,
                item.tipo,
                item.domicilio
            ]
        })
        doc.addSimpleTable(lstrings.telefonosAdicionales, dta_h, dta_d);
    }

    if (dtc) {
        const dtc_h = [lstrings.nrocelular, lstrings.tipolinea, lstrings.localidad];
        const dtc_d = dtc.datos.map((item) => {
            return [
                item.tel,
                item.tipo,
                item.localidad
            ]
        });
        doc.addSimpleTable(lstrings.telefonosCelulares, dtc_h, dtc_d);
    }

	if (mails) {
		let correos = mails.datos.map((email) => {
			return [email.email];
		});
		doc.addSimpleTable(lstrings.emailsTitle, [lstrings.emaildirs_title], correos, ["100%"]);
	}
}

function panelBienes(doc, dbpp, dbpa, dbpe) {
    if (dbpp != null) {
        const dbpp_h = [lstrings.ubicacion, lstrings.superficie_terreno, lstrings.superficie_cubierta];
        const dbpp_d = dbpp.datos.map(info => {
            return [info.ubicacion, `${info.sup_terreno} m2`, `${info.sup_cubierta} m2`];
        });

        doc.addSimpleTable(lstrings.propiedades_title, dbpp_h, dbpp_d);
    }

    if (dbpa) {
        if (dbpe === null)
            dbpe = [];
        let auxId = 0;
        let dbpe_data = reduce(dbpa.datos, (result, value) => {
            let item = find(result, (x) => x.anioModelo === value.anioModelo && x.origen === value.origen && x.porcentaje === value.porcentaje);
            if (item === undefined || item === false) {
                auxId++;
                item = {
                    id: auxId,
                    anioModelo: value.anioModelo,
                    origen: value.origen,
                    porcentaje: value.porcentaje,
                    cantidad: 0,
                    vehiculos: []
                };
                result.push(item);
            }
            let itemEmbargos = filter(dbpe, (x) => x.dominio === value.dominio);
            item.vehiculos.push({
                dominio: value.dominio,
                marca: value.marca,
                modelo: value.modelo,
                tipo: value.tipo,
                embargos: itemEmbargos === undefined ? [] : itemEmbargos
            });
            item.cantidad++;
            return result;
        }, []);
        dbpe_data = sortBy(dbpe_data, ['anioModelo', 'origen', 'porcentaje'], ['asc', 'desc', 'asc']);

        doc.addText(lstrings.automotores_title, 'tableTitle');

        const dbpa_h = ['Modelo', 'Origen', 'Porcentaje', 'Cantidad'];
        const dbpa_d = dbpe_data.map(item => [item.anioModelo, item.origen, item.porcentaje, item.cantidad])
        const dbpa_t = doc.createSimpleTable(dbpa_h, dbpa_d);

        const dbpa_i_h = ['Dominio', 'Marca', 'Modelo', 'Tipo'];
        for (var i = dbpe_data.length; i > 0; i--) {
            let dbpa_i_d = [];

            dbpe_data[i - 1].vehiculos.forEach(item => {
                dbpa_i_d.push([item.dominio, item.marca, item.modelo, item.tipo]);
                item.embargos.forEach(x => {
                    dbpa_i_d.push([doc.createDLRed('El vehículo posee un embargo', `, deuda: ${TableUtils.ARSFormat(x.deuda)} , valuación: ${TableUtils.ARSFormat(x.valuacion)}`, {
                        colSpan: dbpa_i_h.length
                    })]);
                });
            })

            if (dbpa_i_d.length > 0) {
                var it = doc.createSimpleTable(dbpa_i_h, dbpa_i_d);
                dbpa_t.table.body.splice(i + 1, 0, [{
                    colSpan: dbpa_h.length,
                    table: it.table
                }]);
            }
        }
        doc.addRawDef(dbpa_t);
    }
}

function panelSituacionFinanciera(doc, infoSituacion, infoMorosidad) {
	doc.addText(lstrings.situacionFinanciera_title, 'subheader');
	
    if (infoSituacion && infoSituacion.bancoOpera) {
        const dsfbo = infoSituacion.bancoOpera.datos;
        const dsfbo_h = [lstrings.bancos, lstrings.titular, lstrings.otros];
        const dsfbo_d = dsfbo.map(item => [item.banco, item.titular, item.otros]);
        doc.addSimpleTable(lstrings.bancosopera_title, dsfbo_h, dsfbo_d);
    }

	const dmib = infoMorosidad.informacionBcra;
	if (dmib != null) {
		const dmib_h = [
			lstrings.periodo,
			lstrings.mes_ene,
			lstrings.mes_feb,
			lstrings.mes_mar,
			lstrings.mes_abr,
			lstrings.mes_may,
			lstrings.mes_jun,
			lstrings.mes_jul,
			lstrings.mes_ago,
			lstrings.mes_sep,
			lstrings.mes_oct,
			lstrings.mes_nov,
			lstrings.mes_dic
		];

		let dmib_t = {};

		// por cada objeto que mandan
		dmib.datos.forEach(info => {
			if (info.periodo === null)
				return;

			let periodo = moment(info.periodo);
			let agno = periodo.year();
			let mes = periodo.month();

			//creo un nuevo objeto temporal
			if (!dmib_t[agno]) {
				dmib_t[agno] = {
					entidades: {},
					anio: agno,
					meses: new Array(12).fill(0)
				};
			}

			let info_agno = dmib_t[agno];
			// acumulo el valor en el mes correcto
			info_agno.meses[mes] += info.prestamo;

			// info de la entidad, para acumular en la tabla anidad
			if (info.entidad != null) {
				if (!info_agno.entidades[info.entidad.codigoEnt]) {
					info_agno.entidades[info.entidad.codigoEnt] = {
						entidad: info.entidad.entidad,
						id: info.entidad.codigoEnt,
						meses: [...Array(12)].map(() => {
							return {
								valor: 0,
								situacion: '00'
							};
						})
					};
				}

				info_agno.entidades[info.entidad.codigoEnt].meses[mes].valor = info.prestamo;
				info_agno.entidades[info.entidad.codigoEnt].meses[mes].situacion = info.situacion;
			}

		});

		// creo los datos para la table pcpal
		const dmib_d = [];
		for (var agno in dmib_t) {
			const info = dmib_t[agno];
			const meses_format = info.meses.map(monto => {
				return TableUtils.ARSFormat(monto, true, true);
			});
			const t = [info.anio, ...meses_format];
			dmib_d.push(t)
		}

		const dmib_ts_h = [
			lstrings.mes_ene,
			lstrings.mes_feb,
			lstrings.mes_mar,
			lstrings.mes_abr,
			lstrings.mes_may,
			lstrings.mes_jun,
			lstrings.mes_jul,
			lstrings.mes_ago,
			lstrings.mes_sep,
			lstrings.mes_oct,
			lstrings.mes_nov,
			lstrings.mes_dic
		];
		// creo los datos para las tablas secundarias
		doc.addText(lstrings.infobcra_pdf_title, 'tableTitle');
		dmib_d.forEach(info => {
			const dmib_table = doc.createSimpleTable(dmib_h, [info], ["auto"]);
			const ref_agno = info[0];
			const ref_entidades = dmib_t[ref_agno].entidades;

			// const ts_d = [];
			for (let entidad_id in ref_entidades) {
				const entidad = ref_entidades[entidad_id];
				const meses_format = entidad.meses.map(mes => {
					return {
						text: TableUtils.ARSFormat(mes.valor, true, true),
						border: [true, true, true, false],
						alignment: 'center'
					};
				});

				const ts_t = doc.createText(entidad.entidad, "tableSubtitle");
				ts_t.colSpan = dmib_h.length;
				dmib_table.table.body.splice(2, 0, [ts_t]);

				// iconos estado
				const imgs_format = entidad.meses.map(mes => {
					const id = parseInt(mes.situacion, 10);
					return {
						image: RefIcons.imgs_refs_morosidad[id],
						fit: [15, 15],
						alignment: 'center',
						border: [true, false, true, true]
					}
				});

				const ts = doc.createSimpleTable(dmib_ts_h, [meses_format, imgs_format], ["*"]);
				dmib_table.table.body.splice(3, 0, [{
					colSpan: dmib_h.length,
					table: ts.table
				}]);
			}

			// console.log(JSON.stringify(dmib_table));
			doc.addRawDef(dmib_table);
		})

		//tabla referencias
		doc.addRefTable(RefIcons.imgs_refs_morosidad, "situacion_");
	}

	// cheques rechazados
	if (infoMorosidad.chequesRechazados != null) {
		const dmcr = infoMorosidad.chequesRechazados.datos;
		const dmcr_h = [
			lstrings.numeroCheque,
			lstrings.fechaRechazo,
			lstrings.monto,
			lstrings.causal,
			lstrings.fechaLevantamiento,
			lstrings.multa,
			lstrings.cuit,
		];
		const dmcr_d = dmcr.map(info => {
			return [
				info.nroCheque,
				TableUtils.dateFormat(info.fechaRechazo),
				TableUtils.ARSFormat(info.monto, false, true),
				info.causal,
				TableUtils.dateFormat(info.fechaLevantamiento),
				info.multa,
				info.cuit,
			]
		})
		const dmcr_w = [
			"*",
			"*",
			"*",
			"10%",
			"20%",
			"*",
			"*",
		];

		doc.addSimpleTable(lstrings.chequesrechazados_title, dmcr_h, dmcr_d, dmcr_w);

		const dmcr_itr = doc.createDL(
			lstrings.importetotalrechazado,
			TableUtils.ARSFormat(
				dmcr.reduce((memo, info) => {
					return memo += parseInt(info.monto, 10);
				}, 0)
			)
		);
		dmcr_itr.width = "*";

		const dmcr_pp = doc.createDL(
			lstrings.pendientespago,
			TableUtils.ARSFormat(
				dmcr.reduce((memo, info) => {
					return (info.fechaPago.length === 0) ? memo++ : memo;
				}, 0)
			)
		);
		dmcr_pp.width = "*";

		const dmcr_itp = doc.createDL(
			lstrings.importetotalpendiente,
			TableUtils.ARSFormat(
				dmcr.reduce((memo, info) => {
					return (info.fechaPago.length === 0) ? memo += parseInt(info.monto, 10) : memo;
				}, 0)
			)
		);
		dmcr_itp.width = "*";

		const dmcr_c = {};
		dmcr_c.columns = [dmcr_itr, dmcr_pp, dmcr_itp];
		doc.addRawDef(dmcr_c);
	}

	// deudores banco central
	const dmdbc = infoMorosidad.deudoresBancoCentral;
	if (dmdbc != null) {
		const dmdbc_h = [lstrings.entidad];
		const dmdbc_d = dmdbc.datos.map(info => {
			return [info.entidad];
		});
		doc.addSimpleTable(lstrings.deudoresbcra_title, dmdbc_h, dmdbc_d, ["100%"]);
	}
}

function tableJuicios(doc, title, data) {
    if (data == null)
        return;

	const dmjd_h = [
		lstrings.demandado,
		lstrings.expediente,
		lstrings.fecha,
		lstrings.actor,
		lstrings.provincia,
		lstrings.personas,
		lstrings.objeto
	];
	const dmjd_d = [];

    data.datos.forEach(info => {
		dmjd_d.push([
			info.demandado,
			info.expediente,
			TableUtils.dateFormat(info.fecha),
			info.actor,
			info.provincia,
			info.personas,
			info.objeto
		]);
        dmjd_d.push([doc.createDL(lstrings.texto, info.texto, {
            colSpan: dmjd_h.length
        })]);
        dmjd_d.push([doc.createDL(lstrings.juzgado, info.juzgado, {
            colSpan: dmjd_h.length
        })]);
    });

    doc.addSimpleTable(title, dmjd_h, dmjd_d);
}

function panelMorosidad(doc, info) {
    doc.addText(lstrings.morosidad_title, 'subheader');


}

function fixDecimals(value) {
    for (let x = value.length; x > 0; x--) {
        if (value[x] === '.') {
            value = value.replace(",", "").replace(".", ",");
            break;
        }
    }
    return value;
}

export default {
    chooseRefIconAportes,
    header,
    tableActividad,
    tableAportes,
    tableParteSociedad,
    tableSueldosPagados,
    tableJubilaciones,
    tableSueldosCobrados,
    tableSegSocial,
    tableImpuestos,
    tableEmpAportes,
    panelContactacion,
    panelMorosidad,
    panelSituacionFinanciera,
    panelBienes
};

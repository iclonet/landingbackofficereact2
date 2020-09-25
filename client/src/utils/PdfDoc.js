import lstrings from './LStrings';
import Session from './Session';

/**
 * Clase helper para facilitar la creacion de pdf
 */
class PdfDoc {

    constructor() {
        this.pdf_doc = {};
        this.setupDoc();
    }

    /**
     * devuelve el doc para pdfmake
     */
    getDoc() {
        return this.pdf_doc;
    }

    /**
     * Crea un texto de tipo header
     * @param {string} texto Texto a agregar
     * @param {string} [estilo] estilo a usar
     * @return {object} texto creado
     */
    createText(texto, estilo) {
        const t = {};
        t.text = (texto === undefined || texto === null) ? "" : texto;

		if (estilo) {
            t.style = estilo;
		}
		
        return t;
    }

    /**
     * Agrega un texto de tipo header
     * @param {string} texto Texto a agregar
     * @param {string} [estilo] estilo a usar
     */
    addText(texto, estilo) {
        const t = this.createText(texto, estilo);
        this.pdf_doc.content.push(t);
    }

    /**
     * Agrega una linea de texto vacia con el estilo estandar
     * @param {Number} [cantidad] cantidad de lineas vacias para agregar
     */
    addEmptyLine(cantidad) {
        if (cantidad === undefined) {
            cantidad = 1;
        }
        for (var i = 0; i < cantidad; i++) {
            this.pdf_doc.content.push(" ");
        }
    }

    /**
     * Formateo basico para headers de tablas
     * @param {Array} headers array de strings
     * @returns {Array} array de objetos formateados
     * @private
     */
    setupTableHeaders(headers) {
        return headers.map((h) => {
            return {
                text: h,
                style: 'tableHeader'
            }
        });
    }

    /**
     * Crea y devuelve la definicion de una tabla simple
     * @param {Array} headers 
     * @param {Array} data 
     * @param {Array} [widths] 
     * @returns {Object} Definicion de la tabla
     */
    createSimpleTable(headers, data, widths) {

        let t = {};
        t.style = "tablePlain";
		t.table = {};

        // si la celda es null, que sea vacia para la tabla
        data.forEach((fila) => {
            fila.forEach((celda, idx) => {
                if (celda == null || celda === undefined || celda === "" || (Object.keys(celda).length === 0 && celda.constructor === Object)) {
                    fila[idx] = " ";
                }
            })
        })

        if (data.length === 0) {
            data.push([{
                colSpan: headers.length,
                text: lstrings.no_data,
                alignment: "center"
            }]);
        }

        if (headers.length > 0) {
			t.table.body = [this.setupTableHeaders(headers)].concat(data);
			t.table.headerRows = 1
        } else {
            t.table.body = data;
        }

        if (widths) {
            if (widths.length < headers.length) {
                const f = new Array(headers.length - widths.length).fill("*");
                widths = [...widths, ...f];
            }
            t.table.widths = widths;
        } else {
            t.table.widths = headers.map(() => {
                return "*";
            });
        }

        return t;
    }

    /**
     * Agrega una tabla simple
     * 
     * @param {Array} title
     * @param {Array} headers
     * @param {Array} data
     * @param {Array} [widths]
     */
    addSimpleTable(title, headers, data, widths) {
        if (title && title !== "" && title !== undefined) {
            this.addText(title, 'tableTitle');
        }
        const t = this.createSimpleTable(headers, data, widths);
        this.pdf_doc.content.push(t);
    }

    /**
     * Agrega una tabla de referencias.
     *
     * @param {Array} imgs_refs colección de imágenes para cada referencia (almacenadas en RefIcons.js)
     * @param {String} prefix_refs colección de las descripciones para cada imagen de referencia
     */
    addRefTable(imgs_refs, prefix_refs) {
        const dm_refs = [];
        for (let i = 0; i < imgs_refs.length; i++) {
            dm_refs.push([{
                    image: imgs_refs[i],
                    fit: [15, 15],
                    alignment: 'center',
                    border: [true, false, true, true]
                },
                lstrings[prefix_refs + i]
            ]);
        }
        this.addSimpleTable(lstrings.referencias_title, [lstrings.situacion_title, lstrings.descripcion_title], dm_refs, ["auto", "*"]);
    }


    /**
     * Crea un texto de definicion, con la primer parte en bold
     * @param {string} def 
     * @param {string} texto 
     * @param {object} extra objeto con propiedades extra para asignar al objeto de respuesta
     */
    createDL(def, texto, extra) {
        let dl = {
            text: [{
                    text: def,
                    style: "dt"
                },
                " ",
                {
                    text: texto,
                    style: "dd"
                },
            ]
        };
        if (extra) {
            dl = {
                ...dl,
                ...extra
            };
        }
        return dl;
    }

    createDLRed(def, texto, extra) {
        let dl = {
            text: [{
                    text: def,
                    style: "dtRed"
                },
                " ",
                {
                    text: texto,
                    style: "ddRed"
                },
            ]
        };
        if (extra) {
            dl = {
                ...dl,
                ...extra
            };
        }
        return dl;
    }

    /**
     * Permite agregar una definicion sin procesamiento.
     * @param {Object} raw_def 
     */
    addRawDef(raw_def) {
        this.pdf_doc.content.push(raw_def);
    }

    /**
     * defaults del doc
     * @private
     */
    setupDoc = () => {
        const ml = 20;
        var logo = "";

        if (Session.isMainSite()) {
            logo = 'data:image/png;base64,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';
        } else {
            logo = Session.getLogo();
        }

        this.pdf_doc = {
            pageSize: 'A4',
			pageMargins: [ml, 60, ml, 30],
			watermark: {
				text: "CONFIDENCIAL – uso interno",
				opacity: 0.2,
				bold: true,
				angle: -60
			},
            content: [],
            images: {
                logo: logo,
            },
            header: () => {
                return [{
                        image: "logo",
                        width: 86,
                        height: 30,
                        margin: [250, 10, 0, 0]
                    },
                    {
                        canvas: [{
                            type: 'line',
                            x1: 40,
                            y1: 10,
                            x2: 595 - 40,
                            y2: 10,
                            lineWidth: 0.5
                        }]
                    }
                ]
            },
            footer: (current_page, page_count) => {
                return [{
                    text: lstrings.formatString(lstrings.footer_pdf, Session.getCompanyName(), current_page, page_count),
                    alignment: "center"
                }]
            },
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 5]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    color: "black",
                    margin: [0, 10, 0, 0]
                },
                h3: {
                    fontSize: 10,
                    margin: [0, 0, 0, 5]
                },
                tablePlain: {
                    fontSize: 7,
                    margin: [0, 0, 0, 2]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 8,
                    fillColor: '#eeeeee',
                    color: 'black'
                },
                tableTitle: {
                    bold: true,
                    fontSize: 11,
                    color: 'black',
                    margin: [0, 8, 0, 5]
                },
                tableSubtitle: {
                    bold: true,
                    fontSize: 8,
                    color: 'black',
                    margin: [0, 2, 0, 2]
                },
                dt: {
                    bold: true,
                    fontSize: 8,
                    color: 'black',
                },
                dd: {
                    fontSize: 8,
                    color: 'black',
                },
                dtRed: {
                    bold: true,
                    fontSize: 8,
                    color: '#FF3333',
                },
                dtGreen: {
                    bold: true,
                    fontSize: 8,
                    color: '#228B22',
                },
                ddRed: {
                    fontSize: 8,
                    color: 'red'
				},
                score: {
                    bold: true,
                    fontSize: 11,
                    margin: [0, 8, 0, 5],
                },
				puntaje: {
					fontSize: 12,
				},
				puntaje1: {
					color: '#ffffff',
					background: '#ff262a',
				},
				puntaje2: {
					background: '#ffb607',
				},
				puntaje3: {
					background: '#ffff2f',
				},
				puntaje4: {
					background: '#00ff55',
				},
				puntaje5: {
					background: '#00bc2a',
				},
            },
            defaultStyle: {
                // alignment: 'justify'
                fontSize: 10
            }
        };
    }
}

export default PdfDoc;

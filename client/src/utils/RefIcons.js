const ancho_img = 36;

/**
 * Crea íconos de referencia para un conjunto de colores y textos
 * Los mismos consisten en un círculo relleno de un color
 * con el texto correspondiente en su centro.
 * 
 * @param {*} colores 
 * @param {*} textos 
 */
function createIcons(colores, textos) {
    let imgs_refs = [];

    // Itero sobre la cantidad de íconos
    for (let i = 0; i < colores.length; i++) {
        let ctx, canvas = document.createElement('canvas');
        canvas.width = ancho_img;
        canvas.height = ancho_img;
        ctx = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.beginPath();

        // Creo el círculo relleno de color
        ctx.arc(centerX, centerY, ancho_img / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = colores[i];
        ctx.fill();

        // Creo el texto que irá dentro del círculo
        ctx.fillStyle = "white";
        ctx.font = "15pt Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(textos[i], centerX, centerY);

        ctx.save();
        imgs_refs.push(canvas.toDataURL());
    }

    return imgs_refs;
}

// Configuración de referencias para Panel Morosidad
const imgs_refs_colores_morosidad = ["#80E4DA", "#C4D79B", "#FFC926", "#B1A0C7", "#DA9694", "#7B6148", "#404040"];
const imgs_refs_texto_morosidad = ["0", "1", "2", "3", "4", "5", "6"];
const imgs_refs_morosidad = createIcons(imgs_refs_colores_morosidad, imgs_refs_texto_morosidad);

// Configuración de referencias para Panel Aportes
const imgs_refs_colores_aportes = ["#8BC34A", "#E5E500", "#808080"];
const imgs_refs_texto_aportes = ["✔", "╍", ""];
const imgs_refs_aportes = createIcons(imgs_refs_colores_aportes, imgs_refs_texto_aportes);


export default {
	imgs_refs_morosidad,
	imgs_refs_aportes
};
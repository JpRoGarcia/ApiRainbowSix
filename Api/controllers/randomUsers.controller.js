const _pg = require("../services/postgres.service"); 

let Rol = ["Entry Fragger", "Support", "Flex ATK", "Roamer", "Ancla", "Flex DEF", "IGL"]
let Arma = ["Cuchillo", "Pistola", "Escopeta", "Subfusil", "Fusil de Asalto", "Francotirador"]

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const saveRandomUsers = async (req, res) => {  

    let idUsuario = RandomInt(1, 1000000);
    let nroPartidas = RandomInt(1, 1000);
    let RolFavorito = Rol[RandomInt(0, 7)];
    let ArmaFavorita = Arma[RandomInt(0, 6)];
    let BajaConfirmada = RandomInt(1, 50);
    let Muerte = RandomInt(1, BajaConfirmada);
    let MunicionGastada = RandomInt(1, 10000);
    let MunicionImpactada = RandomInt(1, MunicionGastada);

    try {
        let user = req.body;
        let sql = `INSERT INTO public.usuarios
        (idusuario, numero_partida, rol_favorito, arma_favorita, 
            baja_confirmada, muerte, municion_gastada, municion_impactada)
        VALUES('${idUsuario}', '${nroPartidas}', '${RolFavorito}', 
        '${ArmaFavorita}', ${BajaConfirmada}, ${Muerte}, 
        ${MunicionGastada}, ${MunicionImpactada});
        `
        await _pg.execute(sql);
  
        return res.send({
            ok: true,
            message: "Usuario Aleatorio Creado",
            info: user,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "El Usuario ya se Encuentra Registrado",
            info: error,
    });
    }
}

module.exports = { saveRandomUsers };
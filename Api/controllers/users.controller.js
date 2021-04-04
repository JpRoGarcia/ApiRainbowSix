const _pg = require("../services/postgres.service"); 

const getUsers = async (req, res) => {
    try {
        let sql = "SELECT * FROM usuarios";
        let response_db = await _pg.execute(sql);
        let rows = response_db.rows;
        return res.send(rows);
    } catch (error) {
        return res.send(error);
    }
}

const saveUsers = async (req, res) => {
    try {
        let user = req.body;
        let sql = `INSERT INTO public.usuarios
        (idusuario, numero_partida, rol_favorito, arma_favorita, 
            baja_confirmada, muerte, municion_gastada, municion_impactada)
        VALUES('${user.idusuario}', '${user.numero_partida}', '${user.rol_favorito}', 
        '${user.arma_favorita}', ${user.baja_confirmada}, ${user.muerte}, 
        ${user.municion_gastada}, ${user.municion_impactada});
        `
        await _pg.execute(sql);

        return res.send({
            ok: true,
            message: "Usuario creado",
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

const deleteUsers = async (req, res) => {
    try {
        let idusuario = req.params.idusuario;
        let sql = `DELETE FROM public.usuarios WHERE idusuario='${idusuario}';`;
        let response_db = await _pg.execute(sql);
        let row_count = response_db.rowCount;
        return res.send({
            ok: row_count == 1 ? true : false,
            message: "Usuario Eliminado",
            info: idusuario,
        });
       } catch (error) {
        return res.send({
          ok: false,
          message: "El Usuario No se Encuentra Registrado",
          info: error,
        });
    }  
}

const updateUsers = async (req, res) => {
    try {
      let idusuario = req.params.idusuario;
      let user = req.body;

      /* numero_partida='${user.numero_partida}', , baja_confirmada=${user.baja_confirmada}, 
      muerte=${user.muerte}, municion_gastada=${user.municion_gastada}, 
      municion_impactada=${user.municion_impactada}
      */

      let sql = `UPDATE public.usuarios
      SET rol_favorito='${user.rol_favorito}', arma_favorita='${user.arma_favorita}'
      WHERE idusuario='${idusuario}';`;

      let response_db = await _pg.execute(sql);
      let row_count = response_db.rowCount;
      return res.send({
        ok: row_count == 1 ? true : false,
        message: "Usuario Actualizado",
        info: idusuario,
      });
    } catch (error) {
      console.error(error);
      return res.send({
        ok: false,
        message: "El Usuario No se Encuentra Registrado",
        info: error,
      });
    }
};


module.exports = { getUsers, saveUsers, deleteUsers, updateUsers };

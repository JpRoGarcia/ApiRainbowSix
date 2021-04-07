const _pg = require("../services/postgres.service");
const mergeSort = require("../services/merge-sort.service");
const createExcel = require("../services/excel.service");
const fs = require("fs");

const getReporPorcenjeKoD = async (req, res) => {
  try {
    let sql = "SELECT * FROM usuarios where rol_favorito='Roamer'";
    let response_db = await _pg.execute(sql);
    let rows = response_db.rows;

    rows = mergeSort.mergeSortKoD(rows);

    let headers = [
      { header: "IdUsuario", key: "idusuario" },
      { header: "Numero Partida", key: "numero_partida" },
      { header: "Rol Favorito", key: "rol_favorito" },
      { header: "Arma Favorita", key: "arma_favorita" },
      { header: "Asesinatos", key: "asesinatos" },
      { header: "Muertes", key: "muertes" },
      { header: "Razon KoD", key: "razon_kod" },
    ];
    let buffer = await createExcel(headers, rows, "Razon KoD");
    fs.writeFileSync("./Api/temp/reportePorcentajeKoD.xlsx", buffer);
    return res.download("./Api/temp/reportePorcentajeKoD.xlsx", "reportePorcentajeKoD.xlsx");
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

const getReporPorcenPrecision = async (req, res) => {
  try {
    let sql = "SELECT * FROM usuarios where arma_favorita='Fusil de Asalto'";
    let response_db = await _pg.execute(sql);
    let rows = response_db.rows;

    rows = mergeSort.mergeSortPrecision(rows);

    let headers = [
      { header: "IdUsuario", key: "idusuario" },
      { header: "Numero Partida", key: "numero_partida" },
      { header: "Rol Favorito", key: "rol_favorito" },
      { header: "Arma Favorita", key: "arma_favorita" },
      { header: "Municion Gastada", key: "municion_gastada" },
      { header: "Municion Acertada", key: "municion_acertada" },
      { header: "Porcentaje Precision", key: "porcentaje_precision" },
    ];
    let buffer = await createExcel(headers, rows, "Precision");
    fs.writeFileSync("./Api/temp/reportePorcentajePrecision.xlsx", buffer);
    return res.download("./Api/temp/reportePorcentajePrecision.xlsx", "reportePorcentajePrecision.xlsx");
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

module.exports = { getReporPorcenjeKoD, getReporPorcenPrecision };

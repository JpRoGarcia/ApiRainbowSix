const porcentajeKOD = (asesinatos, muerte) => {
      return (asesinatos/muerte) * 100;
};

const porcentajePrecision = (Disparedos, Acertados) => {
  return (Acertados/Disparedos) * 100;
};

module.exports = {
  porcentajeKOD,
  porcentajePrecision
};
const model = require("../model/data");

const getAll = async (req, res) => {
  try {
    const data = await model.getAll(req.params.ID);
    return res.status(200).json({
      message: "Lista de data",
      data: data,
      err: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      err: true,
    });
  }
};

const create = async (req, res) => {
  try {
    const data = await model.create(req.body);
    return res.status(200).json({
      message: "Data registrada exitosamente",
      data: data,
      err: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      err: true,
    });
  }
};

const update = async (req, res) => {
  try {
    const data = await model.update(req.params.ID, req.body)
    return res.status(200).json({
      message: "Data actualizando exitosamente",
      data: data,
      err: false,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error,
      err: true,
    });
  }
};

module.exports = { getAll, create, update }
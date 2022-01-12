const entity = require("../entity/data")

const getAll = async (id) => {
    const data = await entity.find({_id: id}).exec()
    return data
}

const create = async (body) => {
    const data = await entity.create(body)
    return data
}

const update = async (id, body) => {
    const data = await entity.findByIdAndUpdate({_id: id}, body, {useFindAndModify: false})
    return data
}

module.exports = { getAll, create, update }
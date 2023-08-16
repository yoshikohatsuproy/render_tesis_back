export function returnJson(res, statusCode,  data = []){
    return res.status(statusCode).json(data)
}

export function errorJson(res, statusCode){
    return res.status(statusCode).json({})
}
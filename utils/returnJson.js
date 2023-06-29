export function returnJson(res, mensaje, statusCode, ok, data = []){
    return res.status(statusCode).json({ok, data, mensaje})
}
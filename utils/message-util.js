export const messageError = "Ha sucedido un error. Comuníquese con el administrador."

export const messageExistByFId = (cadena, id) =>{
    return `No existe ${cadena} con el id ${id}`
}

export const messageCreate = (cadena) =>{
    return `Se ha creado ${cadena} exitosamente`
}

export const messageUpdate = (cadena) =>{
    return `Se ha actualizado ${cadena} exitosamente`
}

export const messageDelete = (cadena) =>{
    return `Se ha eliminado ${cadena} exitosamente`
}

export const messageLogin = (usuario) => {
    return `Bienvenido ${usuario}`
}

export const messageExistByCorreo = ( correo) =>{
    return `Ya existe un usuario con el correo ${correo} `
}

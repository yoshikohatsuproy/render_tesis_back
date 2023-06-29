import bcrypt from "bcryptjs";

export async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
} 

export async function comparePassword(password, passwordEncriptado) {
    return bcrypt.compare(password, passwordEncriptado);
};
  
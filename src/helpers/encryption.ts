import bcrypt from 'bcrypt';

export async function validatePassword ( password: string, hash: string): Promise<Boolean> {
    const isValidPassword = await bcrypt.compare(password,hash);

    if (!isValidPassword) return false;

    return true;
}
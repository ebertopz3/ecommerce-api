import { compare, genSalt, hash } from 'bcrypt'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BcryptService {
  export const cryptPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10)
    return await hash(password, salt)
  }

  export const comparePassword = async (password: string, hashUser: string | Buffer): Promise<boolean> => {
    return await compare(password, hashUser.toString())
  }
}

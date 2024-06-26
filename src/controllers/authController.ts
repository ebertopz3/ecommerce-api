import { AuthService } from '@services/authService'
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthController {
  export const authUser = async (_req: any, _res: any): Promise<void> => {
    const { email, password } = _req.body
    const validUser = await AuthService.authenticate(email, password)
    _res.status(200).json(validUser)
  }
}

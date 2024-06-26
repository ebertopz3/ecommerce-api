export interface IApiResponse<M> {
  success: boolean
  message: string
  statusCode: number
  data: M
  error?: any
}

export interface IJWTRegister {
  token: string,
  expiresIn: number,
  id: object
}

export interface IJWTGet {
  admin?: IBaseJwtGet,
  user?: IBaseJwtGet
}

interface IBaseJwtGet {
  id: string
}
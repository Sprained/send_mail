import { IJWTRegister, IJWTGet } from '../../../src/interfaces/RedisInterface'

describe('Redis Interface', () => {
  it('IJWTRegister', () => {
    const jwtRegister: IJWTRegister = {
      token: 'teste',
      expiresIn: 60,
      id: { user: 'teste' }
    }

    expect(typeof jwtRegister.token).toBe('string')
    expect(typeof jwtRegister.id).toBe('object')
    expect(typeof jwtRegister.expiresIn).toBe('number')
  })

  it('IJWTGet', () => {
    const jwtGet: IJWTGet = {
      admin: {
        id: 'teste'
      },
      user: {
        id: 'teste'
      }
    }

    expect(typeof jwtGet.admin).toBe('object')
    expect(typeof jwtGet.user).toBe('object')
    expect(typeof jwtGet.admin.id).toBe('string')
    expect(typeof jwtGet.user.id).toBe('string')
  })
})
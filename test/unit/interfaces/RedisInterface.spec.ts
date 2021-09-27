import { IJWTRegister } from '../../../src/interfaces/RedisInterface'

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
})
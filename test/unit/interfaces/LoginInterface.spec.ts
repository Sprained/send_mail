import { ILoginCreate, ILoginGet } from '../../../src/interfaces/LoginInterface'

describe('Login interface', () => {

  it('ILoginCreate', () => {
    const loginCreate: ILoginCreate = {
      email: 'email@email.com',
      password: '123'
    }

    expect(typeof loginCreate.email).toBe('string')
    expect(typeof loginCreate.password).toBe('string')
  })

  it('ILoginGet', () => {
    const loginGet: ILoginGet = {
      id: 'jjjjj',
      email: 'email@email.com',
      password: '123'
    }

    expect(typeof loginGet.id).toBe('string')
    expect(typeof loginGet.email).toBe('string')
    expect(typeof loginGet.password).toBe('string')
  })
})
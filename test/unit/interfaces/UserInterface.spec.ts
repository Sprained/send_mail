import { ICreateUSer } from '../../../src/interfaces/UserInterface'

describe('User Interface', () => {

  it('ICreateUSer', () => {
    const createUser: ICreateUSer = {
      name: 'string',
      email: 'string',
      phone: 'string',
      adminId: 'string',
      password: 'string'
    }

    expect(typeof createUser.name).toBe('string')
    expect(typeof createUser.email).toBe('string')
    expect(typeof createUser.phone).toBe('string')
    expect(typeof createUser.adminId).toBe('string')
    expect(typeof createUser.password).toBe('string')
  })
})
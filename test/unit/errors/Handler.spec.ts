import { Handler } from "../../../src/errors/Handler"

describe('Handler error', () => {

  it('new handler error', () => {
    try {
      throw new Handler(123, 'Teste')
    } catch (error: any) {
      expect(error.statusCode).toBe(123)
      expect(error.message).toBe('Teste')
    }
  })
})
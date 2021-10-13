import { IUpdateInfosMail, INodemailerInfosUp, IAWSInfosUp } from '../../../src/interfaces/MailInterface'

describe('Mail Interface', () => {

  it('IUpdateInfosMail', () => {
    const mailUpdateInfos: IUpdateInfosMail = {
      awsAccessKeyId: 'teste',
      awsSecretAccessKey: 'teste',
      host: 'teste',
      port: 999,
      secure: false,
      user: 'teste',
      pass: 'teste'
    }

    expect(typeof mailUpdateInfos.awsAccessKeyId).toBe('string')
    expect(typeof mailUpdateInfos.awsSecretAccessKey).toBe('string')
    expect(typeof mailUpdateInfos.host).toBe('string')
    expect(typeof mailUpdateInfos.pass).toBe('string')
    expect(typeof mailUpdateInfos.port).toBe('number')
    expect(typeof mailUpdateInfos.secure).toBe('boolean')
    expect(typeof mailUpdateInfos.user).toBe('string')
  })

  it('INodemailerInfosUp', () => {
    const nodemailerInfos: INodemailerInfosUp = {
      host: 'teste',
      port: 999,
      secure: false,
      user: 'teste',
      pass: 'teste'
    }

    expect(typeof nodemailerInfos.host).toBe('string')
    expect(typeof nodemailerInfos.pass).toBe('string')
    expect(typeof nodemailerInfos.port).toBe('number')
    expect(typeof nodemailerInfos.secure).toBe('boolean')
    expect(typeof nodemailerInfos.user).toBe('string')
  })

  it('IAWSInfosUp', () => {
    const awsInfos: IAWSInfosUp = {
      awsAccessKeyId: 'teste',
      awsSecretAccessKey: 'teste'
    }

    expect(typeof awsInfos.awsAccessKeyId).toBe('string')
    expect(typeof awsInfos.awsSecretAccessKey).toBe('string')
  })
})
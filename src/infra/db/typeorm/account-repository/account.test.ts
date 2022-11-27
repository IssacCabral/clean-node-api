import { Account } from "../entities/account";
import { AccountTypeOrmRepository } from "./account";
import dataSource from "../data-source";

describe('Account Typeorm Repository', () => {
  beforeAll(async () => {
    await dataSource.initialize()
  })

  afterAll(async () => {
    await dataSource.getRepository(Account).clear()
    await dataSource.destroy()
  })

  beforeEach(async () => {
    await dataSource.getRepository(Account).clear()
  })

  const makeSut = (): AccountTypeOrmRepository => {
    return new AccountTypeOrmRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

})
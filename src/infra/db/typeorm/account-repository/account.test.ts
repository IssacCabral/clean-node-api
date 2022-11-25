import { Account } from "../entities/account";
import { AccountTypeOrmRepository } from "./account";

import env from "../../../config/env";
import { DataSource } from "typeorm";

const dataSourceTest = new DataSource({
  type: "mysql",
  url: env.DB_CONNECTION,
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  entities: [__dirname + "/../entities/*{.ts,.js}"]
});

describe('Account Typeorm Repository', () => {
  beforeAll(async () => {
    await dataSourceTest.initialize()
  })

  afterAll(async () => {
    await dataSourceTest.destroy()
  })

  beforeEach(async () => {
    await dataSourceTest.getRepository(Account).clear()
  })

  const makeSut = (): AccountTypeOrmRepository => {
    const accountRepository = dataSourceTest.getRepository(Account)
    return new AccountTypeOrmRepository(accountRepository)
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
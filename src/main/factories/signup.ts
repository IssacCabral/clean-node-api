import {SignUpController} from '../../presentation/controllers/signup/signup-controller'
import { IController } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountTypeOrmRepository } from '../../infra/db/typeorm/account-repository/account'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): IController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcrypAdapter = new BcryptAdapter(salt)
  const accountTypeOrmRepository = new AccountTypeOrmRepository()
  const dbAddAccount = new DbAddAccount(bcrypAdapter, accountTypeOrmRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
  return signUpController
}
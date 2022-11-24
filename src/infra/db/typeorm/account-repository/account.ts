import { Repository } from "typeorm";
import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { Account } from "../entities/account";
import crypto from 'crypto'

export class AccountTypeOrmRepository implements AddAccountRepository{  
  constructor(
    private readonly accountsRepository: Repository<Account>
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = this.accountsRepository.create(Object.assign({}, accountData, {id: crypto.randomUUID()}))
    await this.accountsRepository.save(account) 
    return account
  }

}
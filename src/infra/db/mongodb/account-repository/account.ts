import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";

export class AccountMongoRepository implements AddAccountRepository{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    throw new Error("Method not implemented.");
  }

}
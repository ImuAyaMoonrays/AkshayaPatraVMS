import { Account } from "../../services/auth/account.model";

export namespace AppActions {

  export class UpdateAllEventsAction {
    static readonly type = '[app] update upcoming events'
  }

  export class UpdateAuthenticatedUserAction {
    static readonly type = '[app] update authenticated user'
    constructor(public authenticatedUser: Account) {
    }
  }
}

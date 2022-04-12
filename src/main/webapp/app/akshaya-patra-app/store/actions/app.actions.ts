import { Account } from "../../services/auth/account.model";

export namespace AppActions {

  export class UpdateAdminFutureEvents {
    static readonly type = '[app] update admin future events'
  }

  export class UpdateAdminPastEvents {
    static readonly type = '[app] update admin past events'
  }

  export class UpdateNormalUserRegisterableEvents {
    static readonly type = '[app] update user registerable events'
  }

  export class UpdateNormalUserRegisteredEvents {
    static readonly type = '[app] update user registered events'
  }

  export class UpdateNormalUserCompletedEvents {
    static readonly type = '[app] update user completed events'
  }

  export class UpdateAllNormalUserEvents {
    static readonly type = '[app] update user all events'
  }

  export class UpdateAllAdminEvents {
    static readonly type = '[app] update admin all events'
  }



  export class UpdateAuthenticatedUserAction {
    static readonly type = '[app] update authenticated user'

    constructor(public authenticatedUser: Account) {
    }
  }
}

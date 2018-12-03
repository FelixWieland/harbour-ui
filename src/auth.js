/*
Auth Object
*/

class Auth {
    constructor(pCookie, pSession_uuid, pUsername, pTTL) {
        this.state = {
            cookie: pCookie,
            session_uuid: pSession_uuid,
            username: pUsername,
            ttl: pTTL
        }
    }
}

export default Auth;
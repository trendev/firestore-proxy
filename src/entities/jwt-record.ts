export default class JWTRecord {
    constructor(
        public token: string, public creationTime: Date, public expirationTime: Date) { }
}

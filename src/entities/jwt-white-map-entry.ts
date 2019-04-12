import JWTRecord from "./jwt-record";

export default class JWTWhiteMapEntry {
    constructor(public email: string, public records: JWTRecord[]) { }
}

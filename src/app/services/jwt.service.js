import jwt from 'jwt-simple';
import moment from 'moment';

export class JwtService {
    private _secret;

    constructor() {
        this._secret = 'Just think of tacos as a gold mine.';
    }

    //@ts-ignorets-ignore
    createToken({ _id, name, surname, email, role }) {
        const payload = {
            sub: _id,
            name,
            surname,
            email,
            role,
            iat: moment().unix(),
            exp: moment()
                .add(30, 'days')
                .unix(),
        };

        return jwt.encode(payload, this._secret);
    }
}

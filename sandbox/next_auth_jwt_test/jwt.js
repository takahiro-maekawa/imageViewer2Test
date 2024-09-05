import { decode } from 'next-auth/jwt';

const SESSION_NAME = 'authjs.session-token';

const TOKEN = 'eyJhbGc...';

const SECRET = 'secret';

const decoded = await decode({
  salt: SESSION_NAME,
  secret: SECRET,
  token: TOKEN,
});

console.log('decoded', decoded);
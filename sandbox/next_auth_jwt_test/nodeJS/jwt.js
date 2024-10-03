import { decode, encode } from 'next-auth/jwt';

const SESSION_NAME = 'authjs.session-token';

const object = { "sample": "data" };

const SECRET = 'secret';
const encoded = await encode({
  salt: SESSION_NAME,
  secret: SECRET,
  token: object,
});

// encoded: sample
// eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiN3g5RFVNVmFFVTZnaWFiMGwwT1dEdDRlNFNzUkhfY2J3TW9mMkV6RXl5Nm9uSzVvOHhTUFBCNzk5UlZvcW0ydjZ6Njc0a1FDdjlqb20yVDhTLWExZFEifQ..ZnnK_5jS-4wIadnKNzjOTw.7-R8orQxsU9p1hgQBdsnIbTN34jtDy-X4FSCr4koK90CpHmpLe4c9h2LZ_BnpmRIeS5I_3atvlv0_PuoO2Usm_apQEMTVgZZTBq4DB8m0NwP5YB964TBt7w0sUuzVzePMaQZ8WsYhzn1iVv0p-j6_A.Pgc_fxWGaaw5053g73PVBFbIZULBSDSxFM4AQcMhITo

console.log('encoded', encoded);
const decoded = await decode({
  salt: SESSION_NAME,
  secret: SECRET,
  token: encoded,
});

/**
 * 
 * decoded {
  sample: 'data',
  iat: 1727963444,
  exp: 1730555444,
  jti: 'ebdcc740-63a2-4087-b2e3-79a37411fdde'
  }
 */
console.log('decoded', decoded);
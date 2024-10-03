import { decode, encode } from 'next-auth/jwt';

const SALT = 'saltdesu';

const object = { "sample": "datumaa" };

const SECRET = 'secret';
const encoded = await encode({
  salt: SALT,
  secret: SECRET,
  token: object,
});

// encoded: sample
// eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiY1B4SGx3MXZGOXA1UXktRzlqSlVsVjBvZ1FZNTNPbzV1UTZwNHlNX0lFcXhnYlNacEJobjVBVnU5bmZMWmJxU0RaN0JMMU5KOFU3SnFfX0pVSHM2eGcifQ..UwJRcX9c9YLlH0_yJww7YQ.IEwxWszN5EkzWnfavqQTpOkviKu5V6PY7U4yzB-ZtP3AlF5TZr8yfO6zpN18Vr7h3ck48ZMVOdqArHL_GZtykzjxRQydSY5J6SDz_eMrWbS_xkoEiKjTUF98IlwgzUmdSRrSt9uA7igrF22Z32Ij7g.natRuwogAWvPhSjCtPicZhRuID72x9khE83RLTK98J8
console.log("******************")
console.log('encoded', encoded);

/**
 * 
 * encryptionSecret: Uint8Array(64) [
  177, 239, 108, 221, 145,  92,  68, 192, 167,  18,  50,
   87,  74, 106, 112,  84, 106,  94,  22, 209,  43, 179,
  141, 244,  99, 142,  59, 150, 189, 211,  32,  37,  19,
   30, 144, 105,  95, 240, 114, 169, 209,  72, 241,  81,
   28, 122,  73, 129, 168,  91,  99, 166,  40,  49,  29,
  161, 250, 124, 207, 196, 156,  71, 194, 187
]
 * 
 */

const decoded = await decode({
  salt: SALT,
  secret: SECRET,
  token: encoded,
});

/**
 * 
 * decoded {
  sample: 'datumaa',
  iat: 1727971115,
  exp: 1730563115,
  jti: '9fd25fec-edd5-4f89-9985-729a70b557e2'
}
 */
console.log('decoded', decoded);
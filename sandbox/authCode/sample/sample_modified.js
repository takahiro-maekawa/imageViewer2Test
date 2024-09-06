// Google OAuth 2.0 クライアントライブラリをインポート
const { OAuth2Client } = require('google-auth-library');

// GoogleのクライアントIDとクライアントシークレットを設定
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

// OAuth2クライアントを作成
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Authorization ヘッダーからアクセストークンを取り出すための正規表現
var BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;

// モジュール群
var async = require('async');

// event.methodArn から HTTP メソッドとリソースパスを取り出す関数
function extract_method_and_path(arn) {
  if (!arn) {
    return [null, null];
  }

  var arn_elements = arn.split(':', 6);
  var resource_elements = arn_elements[5].split('/', 4);
  var http_method = resource_elements[2];
  var resource_path = resource_elements[3];

  return [http_method, resource_path];
}

// Authorization ヘッダーからアクセストークンを取り出す関数
function extract_access_token(authorization) {
  if (!authorization) {
    return null;
  }

  var result = BEARER_TOKEN_PATTERN.exec(authorization);

  if (!result) {
    return null;
  }

  return result[1];
}

// Googleのトークン情報を検証する関数
async function verify_token(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

// Authorizer から API Gateway に返す応答を生成する関数
function generate_policy(principal_id, effect, resource) {
  return {
    principalId: principal_id,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    }
  };
}

// 認証失敗時にGoogleの認証画面にリダイレクトする関数
function redirect_to_google_auth(context) {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  });

  const response = {
    statusCode: 302,
    headers: {
      Location: authUrl,
    },
    body: '',
  };

  context.succeed(response);
}

// Authorizer の実装
exports.handler = async function (event, context) {
  var elements = extract_method_and_path(event.methodArn);
  var http_method = elements[0];
  var resource_path = elements[1];

  var access_token = extract_access_token(event.authorizationToken);

  if (!access_token) {
    console.log("[" + http_method + "] " + resource_path + " -> No access token.");
    redirect_to_google_auth(context);
    return;
  }

  try {
    const payload = await verify_token(access_token);
    console.log("[" + http_method + "] " + resource_path + " -> Token verified: " + JSON.stringify(payload));

    context.succeed(generate_policy(payload.sub, 'Allow', event.methodArn));
  } catch (error) {
    console.log("[" + http_method + "] " + resource_path + " -> Token verification failed: " + error.message);
    redirect_to_google_auth(context);
  }
};
// Authlete から発行された、API キーと API シークレット。 Authlete の
// イントロスペクション API を叩くために必要となる。
var API_KEY = '{あなたのサービスの API キー}';
var API_SECRET = '{あなたのサービスの API シークレット}';

// Authorization ヘッダーからアクセストークンを取り出すための正規表現
var BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;

// モジュール群
var async = require('async');
var request = require('request');


// event.methodArn から HTTP メソッドとリソースパスを取り出す関数
function extract_method_and_path(arn) {
  // 'arn' の値は次のフォーマットとなっている。
  //
  //   arn:aws:execute-api:<リージョンID>:<アカウントID>:<API ID>/<ステージ>/<メソッド>/<リソースパス>"
  //
  // 詳細は 'Enable Amazon API Gateway Custom Authorization' を参照のこと。
  //
  //   http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html
  //

  // 念のため event.methodArn に値が設定されていないケースを処理する。
  if (!arn) {
    // HTTP メソッドもリソースパスも不明
    return [null, null];
  }

  var arn_elements = arn.split(':', 6);
  var resource_elements = arn_elements[5].split('/', 4);
  var http_method = resource_elements[2];
  var resource_path = resource_elements[3];

  // HTTP メソッドとリソースパスを配列として返す。
  return [http_method, resource_path];
}


// Authorization ヘッダーからアクセストークンを取り出す関数
//
// この関数は、引数の値が "RFC 6750, 2.1. Authorization Request Header Field" に
// 従っていることを想定している。 例えば "Bearer 123" という値が渡された場合、"123" を返す。
function extract_access_token(authorization) {
  // Authorization ヘッダーの値がない場合
  if (!authorization) {
    // アクセストークンはない。
    return null;
  }

  // "Bearer {アクセストークン}" というパターンに合致するか調べる。
  var result = BEARER_TOKEN_PATTERN.exec(authorization);

  // パターンにマッチしなかった。
  if (!result) {
    // アクセストークンはない。
    return null;
  }

  // アクセストークンを返す。
  return result[1];
}


// HTTP メソッドとリソースパスの組から、必要となるスコープ群のリストを文字列の配列として返す。
// 例えば ["profile", "email"] など。 空でない配列が返された場合、アクセストークンが
// それらのスコープ群を全てカバーしているかどうかのチェックが Authlete サーバー側で
// (= Authlete のイントロスペクション API の実装内で) 行われる。 この関数が null を
// 返した場合は、スコープ群に関するチェックはおこなわれない。
function get_required_scopes(http_method, resource_path) {
  // 適宜カスタマイズする。
  return null;
}


// Authlete のイントロスペクション API を呼ぶ関数
//
// この関数は async モジュールの waterfall 関数のタスクとして使われる。 waterfall 関数の
// 詳細については https://github.com/caolan/async#user-content-waterfalltasks-callback
// を参照のこと。
//
//   * access_token (文字列) [必須]
//       アクセストークン
//
//   * scopes (文字列の配列) [オプショナル]
//       アクセストークンがカバーすべきスコープ群。 もしもアクセストークンが指定された
//       スコープ群をカバーしていない場合、Authlete のイントロスペクション API の
//       応答に含まれる action の値は FORBIDDEN になる。
//
//   * callback
//       async モジュールの waterfall がタスク関数に渡すコールバック関数
//
function introspect(access_token, scopes, callback) {
  request({
    // Authlete のイントロスペクション API の URL
    url: 'https://api.authlete.com/api/auth/introspection',

    // HTTP メソッド
    method: 'POST',

    // ベーシック認証のための API キーと API シークレット
    auth: {
      username: API_KEY,
      pass: API_SECRET
    },

    // Authlete のイントロスペクション API に渡すリクエストパラメーター群
    json: true,
    body: {
      token: access_token,
      scopes: scopes
    },

    // Authlete のイントロスペクション API からの応答を UTF-8 文字列として解釈する。
    encoding: 'utf8'
  }, function (error, response, body) {
    if (error) {
      // Authlete のイントロスペクション API の呼び出しに失敗した。
      callback(error);
    }
    else if (response.statusCode != 200) {
      // Authlete のイントロスペクション API の応答は、何か良くないことが起こったことを示している。
      callback(response);
    }
    else {
      // waterfall の次のタスクを呼び出す。
      //
      // body は既に JSON オブジェクトになっている。これは、request モジュールによって
      // 行われている。 この JSON オブジェクトが持っているプロパティー群に関しては、
      // authlete-java-common の com.authlete.common.dto.IntrospectionResponse
      // クラスの JavaDoc を参照のこと。
      //
      //   http://authlete.github.io/authlete-java-common/com/authlete/common/dto/IntrospectionResponse.html
      //
      callback(null, body);
    }
  });
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


// Authorizer の実装
exports.handler = function (event, context) {
  // 起動しようとしている関数の情報を取得する。 event.methodArn から
  // リクエストの HTTP メソッドとリソースパスを取り出す。
  var elements = extract_method_and_path(event.methodArn);
  var http_method = elements[0];
  var resource_path = elements[1];

  // event.authorizationToken からクライアントアプリケーションが提示した
  // アクセストークンを取り出す。
  var access_token = extract_access_token(event.authorizationToken);

  // クライアントアプリケーションからのリクエストにアクセストークンが含まれていない場合
  if (!access_token) {
    // ログを出力し、"401 Unauthorized" を返すように API Gateway に指示する。
    console.log("[" + http_method + "] " + resource_path + " -> No access token.");
    context.fail("Unauthorized");
    return;
  }

  // HTTP メソッドとリソースパスの組から、必要となるスコープ群のリストを求める。
  var required_scopes = get_required_scopes(http_method, resource_path);

  async.waterfall([
    function (callback) {
      // Authlete のイントロスペクション API を呼び、アクセストークンのバリデーションを行う。
      introspect(access_token, required_scopes, callback);
    },
    function (response, callback) {
      // アクセストークンのバリデーションの結果をログに書く。
      console.log("[" + http_method + "] " + resource_path + " -> " +
        response.action + ":" + response.resultMessage);

      // Authlete のイントロスペクション API の応答に含まれる action プロパティーは、
      // 保護リソースエンドポイントの実装がクライアントアプリケーションに返すべき HTTP
      // ステータスを示している。 なので、ここでは action の値でディスパッチする。
      switch (response.action) {
        case 'OK':
          // アクセストークンは有効。 API Gateway に、リソースへのアクセスを許可することを伝える。
          // なお、Authlete のイントロスペクション API の応答に含まれる subject プロパティーは、
          // アクセストークンに紐づいているユーザーの一意識別子である。
          context.succeed(generate_policy(response.subject, 'Allow', event.methodArn));
          break;

        case 'BAD_REQUEST':
        case 'FORBIDDEN':
          // API Gateway に、リソースへのアクセスを拒否することを伝える。
          context.succeed(generate_policy(response.subject, 'Deny', event.methodArn));
          break;

        case 'UNAUTHORIZED':
          // "401 Unauthorized" をクライアントアプリケーションに返すようにと API Gateway に伝える。
          context.fail("Unauthorized");
          break;

        case 'INTERNAL_SERVER_ERROR':
        default:
          // Internal Server Error を返す。 context.fail() に渡す値が unauthorized
          // 以外の場合、"500 Internal Server Error" という扱いになる。
          context.fail("Internal Server Error");
          break;
      }

      callback(null);
    }
  ], function (error) {
    if (error) {
      // 何か良くないことが起こった。
      context.fail(error);
    }
  });
};
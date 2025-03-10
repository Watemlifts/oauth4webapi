# Function: processUserInfoResponse

[💗 Help the project](https://github.com/sponsors/panva)

▸ **processUserInfoResponse**(`as`, `client`, `expectedSubject`, `response`, `options?`): `Promise`<[`UserInfoResponse`](../interfaces/UserInfoResponse.md)\>

Validates Response instance to be one coming from the
[`as.userinfo_endpoint`](../interfaces/AuthorizationServer.md#userinfo_endpoint).

**`see`** [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `as` | [`AuthorizationServer`](../interfaces/AuthorizationServer.md) | Authorization Server Metadata. |
| `client` | [`Client`](../interfaces/Client.md) | Client Metadata. |
| `expectedSubject` | `string` \| typeof [`skipSubjectCheck`](../variables/skipSubjectCheck.md) | Expected `sub` claim value. In response to OpenID Connect authentication   requests, the expected subject is the one from the ID Token claims retrieved from   [getValidatedIdTokenClaims](getValidatedIdTokenClaims.md). |
| `response` | [`Response`]( https://developer.mozilla.org/en-US/docs/Web/API/Response ) | Resolved value from [userInfoRequest](userInfoRequest.md). |
| `options?` | [`ProcessUserInfoResponseOptions`](../interfaces/ProcessUserInfoResponseOptions.md) | - |

#### Returns

`Promise`<[`UserInfoResponse`](../interfaces/UserInfoResponse.md)\>

Resolves with an object representing the parsed successful response, or an object
  representing an OAuth 2.0 protocol style error. Use [isOAuth2Error](isOAuth2Error.md) to determine if an
  OAuth 2.0 error was returned.

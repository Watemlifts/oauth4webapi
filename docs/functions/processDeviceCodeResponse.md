# Function: processDeviceCodeResponse

[💗 Help the project](https://github.com/sponsors/panva)

▸ **processDeviceCodeResponse**(`as`, `client`, `response`, `options?`): `Promise`<[`TokenEndpointResponse`](../interfaces/TokenEndpointResponse.md) \| [`OAuth2Error`](../interfaces/OAuth2Error.md)\>

Validates Device Authorization Grant Response instance to be one coming from the
[`as.token_endpoint`](../interfaces/AuthorizationServer.md#token_endpoint).

**`see`** [RFC 8628 - OAuth 2.0 Device Authorization Grant](https://www.rfc-editor.org/rfc/rfc8628.html#section-3.4)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `as` | [`AuthorizationServer`](../interfaces/AuthorizationServer.md) | Authorization Server Metadata. |
| `client` | [`Client`](../interfaces/Client.md) | Client Metadata. |
| `response` | [`Response`]( https://developer.mozilla.org/en-US/docs/Web/API/Response ) | Resolved value from [deviceCodeGrantRequest](deviceCodeGrantRequest.md). |
| `options?` | [`ProcessDeviceCodeResponseOptions`](../interfaces/ProcessDeviceCodeResponseOptions.md) | - |

#### Returns

`Promise`<[`TokenEndpointResponse`](../interfaces/TokenEndpointResponse.md) \| [`OAuth2Error`](../interfaces/OAuth2Error.md)\>

Resolves with an object representing the parsed successful response, or an object
  representing an OAuth 2.0 protocol style error. Use [isOAuth2Error](isOAuth2Error.md) to determine if an
  OAuth 2.0 error was returned.

## Walk Through an Example

`GET /lessons/1` requests a resource, and a `200` response indicates success. The response header `Content-Type: application/json` describes the body format, while `404` means the requested resource was not found. Separating headers from the body makes the roles of status codes and data clear.

const requestURL = "https://jsonplaceholder.typicode.com/users"

function sendRequest(method, url, body = {}) {
  const headers = {
    "Content-Type": "application/json",
  }
  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  }).then((Response) => {
    if (Response.ok) {
      return Response.json()
    }

    return Response.json().then((Error) => {
      const e = new Error("ошибка")
      e.data = Error
      throw e
    })
  })
}

export { requestURL, sendRequest }

function sendRequest(form) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(form)
    }, 2000)
  })
}

function sendRequestWork() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

export { sendRequest, sendRequestWork }

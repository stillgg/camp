//переписать на asyck await
async function sendRequest(form) {
  await wait(2000, form)
  console.log("success")
}

//переписать на asyck await

async function sendRequestWork() {
  await wait(2000)
  console.log("success")
}

// wait return promise
function wait(ms, body = null) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("resolve")
      resolve(body)
    }, ms)
  })
}

export { sendRequest, sendRequestWork }

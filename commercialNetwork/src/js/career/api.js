import { newElement } from "./constants"

async function sendForm(form) {
  await wait(2000, form)
}

async function getVacancies() {
  await wait(2000)
  return [newElement]
}

function wait(ms, body = null) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(body)
    }, ms)
  })
}

export { sendForm, getVacancies }

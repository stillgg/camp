import { v } from "./index"
import {
  fileHandler,
  daysInputHandler,
  daysBlurHandler,
  monthsInputHandler,
  monthsBlurHandler,
  yearsInputHandler,
  telHandler,
} from "./handlers"

const listElements = [
  {
    el: file,
    events: [
      {
        name: "change",
        handler: fileHandler,
      },
      {
        name: "blur",
      },
    ],
  },
  {
    el: job,
    events: [
      {
        name: "input",
      },
      {
        name: "blur",
      },
    ],
  },
  {
    el: years,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
        handler: yearsInputHandler,
      },
    ],
  },
  {
    el: days,
    events: [
      {
        name: "blur",
        handler: daysBlurHandler,
      },
      {
        name: "input",
        handler: daysInputHandler,
      },
    ],
  },
  {
    el: tel,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
        handler: telHandler,
      },
    ],
  },
  {
    el: months,
    events: [
      {
        name: "blur",
        handler: monthsBlurHandler,
      },
      {
        name: "input",
        handler: monthsInputHandler,
      },
    ],
  },
  {
    el: agreements,
    events: [
      {
        name: "blur",
      },
      {
        name: "change",
      },
    ],
  },
  {
    el: city,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
  {
    el: email,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
  {
    el: fio,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
  {
    el: nationality,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
]

function addEvents(elements) {
  elements.forEach((element) => {
    const formElement = element.el
    const events = element.events

    for (const event of events) {
      formElement.addEventListener(event.name, (e) => {
        const id = e.target.getAttribute("id")
        if (typeof event.handler === "function") event.handler(e)
        v.validate(id)
      })
    }
  })
}

addEvents(listElements)

import uuid from "uuid/dist/v4"
import { isEmpty } from "lodash"
import "@fortawesome/fontawesome-free/js/all"

// Task/Todo structure
interface Tasks {
  id: String
  title: String
  completed: Boolean
}

let tasks: Tasks[] = [
  { id: uuid(), title: "Borders program Western Sahara", completed: false },
  { id: uuid(), title: "6th generation", completed: false },
  { id: uuid(), title: "Handcrafted Kyrgyz Republic parsing", completed: true },
]

/**
 * @description generate random id
 *
 * @returns String
 */
function generateID(): String {
  return uuid()
}

/**
 * @description make UL element empty
 *
 * @param element HTML element
 */
function emptyElement(element): void {
  element.innerHTML = ""
}

/**
 * @description task prototype
 *
 * @param id Task id
 * @param title Task title
 * @param status Task status
 */
function task_interface(id, title, status, listEle) {
  // item row
  var li = document.createElement("li")

  // item children
  /// checkbox
  var checkbox = document.createElement("input")
  checkbox.setAttribute("type", "checkbox")
  checkbox.setAttribute("data-check-id", id)
  /// span
  var span = document.createElement("span")
  /// delete btn
  var editBtn = document.createElement("button")
  editBtn.setAttribute("type", "button")
  editBtn.classList.add("edit")
  //// trash icon
  var editIcon = document.createElement("i")
  editIcon.classList.add("fa", "fa-edit")
  editBtn.appendChild(editIcon)
  // editBtn.addEventListener("click", () => {
  //   editBtn.querySelector("i").classList.toggle("fa-edit")
  //   editBtn.querySelector("i").classList.toggle("fa-check")
  //   // editIcon.classList.toggle("fa-edit")
  //   // editIcon.classList.toggle("fa-check")
  //   span.setAttribute("contentEditable", "true")
  // })
  /// delete btn
  var delBtn = document.createElement("button")
  delBtn.setAttribute("type", "button")
  delBtn.classList.add("delete")
  //// trash icon
  var trashIcon = document.createElement("i")
  trashIcon.classList.add("fa", "fa-trash")
  delBtn.appendChild(trashIcon)
  delBtn.addEventListener("click", () => {
    updateList(
      tasks.filter((t) => {
        return t.id !== delBtn.getAttribute("data-delete-task-id")
      }),
      listEle,
    )
  })

  // fill based on params
  li.setAttribute("id", id)
  status ? li.classList.add("complete") : null
  checkbox.checked = status
  checkbox.addEventListener("change", () => {
    for (var index = 0; index < tasks.length; index++) {
      if (tasks[index].id == checkbox.getAttribute("data-check-id")) {
        tasks[index].completed = !tasks[index].completed
        li.classList.toggle("complete")
      }
    }
  })
  span.innerText = title
  delBtn.setAttribute("data-delete-task-id", id)
  editBtn.setAttribute("data-edit-task-id", id)

  // fill & return width all child elements
  li.append(checkbox, span, editBtn, delBtn)
  return li
}

// update UL elements
function updateList(tasksList, listElement) {
  emptyElement(listElement)
  tasks = tasksList
  tasksList.forEach(function (el) {
    listElement.appendChild(
      task_interface(el.id, el.title, el.completed, listElement),
    )
  })
}

window.addEventListener("load", () => {
  // collect DOM elements & create variables
  const list = document.getElementById("task_list")
  const btn = document.getElementById("add_button")
  const input = <HTMLInputElement>document.getElementById("input_task")

  // call one time
  updateList(tasks, list)

  // add new item
  btn.addEventListener("click", () => {
    emptyElement(list)

    var val = input.value
    input.value = null

    if (!isEmpty(val)) {
      tasks.push({ id: generateID(), title: val, completed: false })

      updateList(tasks, list)
    }
  })

  // empty completed tasks
  document.getElementById("empty_completed").addEventListener("click", () => {
    updateList(
      tasks.filter((el) => {
        return el.completed == false
      }),
      list,
    )
  })

  // empty all tasks
  document.getElementById("empty_list").addEventListener("click", () => {
    tasks.length = 0
    updateList(tasks, list)
  })
})

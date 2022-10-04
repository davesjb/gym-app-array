const list = document.querySelector("#list")
const viewSaved = document.querySelector(".view-saved")
const template = document.querySelector("#list-item-template")
const buttonView = document.querySelector("[data-history]")
const reset = document.querySelector("[data-button-reset]")
const savedWorkouts = document.querySelector("[data-saved-workouts]")
const scrollToHistory = document.getElementById("list")

const LOCAL_STORAGE_PREFIX = "12REPS-CIRCUIT"
const EXERCISE12_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-List`

// const storeList = []
let storeList = loadItems()

// Render each item in store list
storeList.forEach((listItem) => renderItem(listItem))

// -- Change listener check boxes
list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return
  const parent = e.target.closest(".list-item")

  const listItemId = parent.dataset.listItemId

  const listItem = storeList.find((t) => t.id === listItemId)

  listItem.complete = e.target.checked

  saveItems()
  if ((listItem.complete = e.target.checked)) {
    parent.classList.add("collapse-card")
  } else {
    parent.classList.remove("collapse-card")
  }
})

// -- View
buttonView.addEventListener("click", (e) => {
  if (!e.target.matches("[data-history]")) return

  if (storeList.length == 0) {
    savedWorkouts.innerHTML = `<span class="warning-text">No workouts saved !</span>`
    setTimeout(function () {
      updateSavedWorkouts()
    }, 2000)
  } else {
    showHistoryButtons()
  }
})

export function showHistoryButtons() {
  const allboxes = document.querySelectorAll(".check-items")
  updateSavedWorkouts()
  setTimeout(function () {
    scrollToHistory.scrollIntoView({ behavior: "smooth" })
  }, 550)

  if (viewSaved.classList.contains("display")) {
    return
  } else {
    viewSaved.classList.add("display")
    reset.classList.add("show")
  }

  allboxes.forEach((allboxes) => {
    if (allboxes.checked == true) {
      allboxes.closest(".list-item").classList.add("collapse-card")
    } else {
      allboxes.closest(".list-item").classList.remove("collapse-card")
    }
  })
}

export function updateSavedWorkouts() {
  savedWorkouts.innerHTML =
    "Saved Workouts" + " " + "(" + storeList.length + ")"
}

// -- Delete
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return

  // Get parent list item
  const parent = e.target.closest(".list-item")

  // Get list item unique id
  const listItemId = parent.dataset.listItemId

  // Remove parent list item from screen
  parent.remove()

  // Create a new list for if not true then remove function
  storeList = storeList.filter((listItem) => listItem.id !== listItemId)

  saveItems()
  updateSavedWorkouts()
})

// -- Reset
reset.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-reset]")) return

  // Remove all children in list
  let child = list.lastElementChild
  while (child) {
    list.removeChild(child)
    child = list.lastElementChild
  }

  // Reset store arrays
  storeList = []
  saveItems()
  console.clear()
  updateSavedWorkouts()
})

// -- Fetch
export function storeExercise(fetchExercises) {
  // Randomly fetch exercise
  const get1 = fetchExercises[0]

  // Add checkbox status and unique id to item
  const newGet1 = {
    name: get1,
    complete: false,
    id: new Date().valueOf().toString(),
  }

  storeList.push(newGet1)

  renderItem(newGet1)

  saveItems()
}

// -- Render
function renderItem(get1) {
  // setup Clone
  const templateClone = template.content.cloneNode(true)

  // Clone list item
  const listItem = templateClone.querySelector(".list-item")

  // Insert unique id

  listItem.dataset.listItemId = get1.id

  // Clone data text
  const textElement = templateClone.querySelector("[data-list-item-text]")

  // Insert Exercises text
  textElement.innerHTML =
    "<p><b>" +
    get1.name[4] +
    "</b></p>" +
    "<ul><li> 1 " +
    " " +
    get1.name[0] +
    "</li>" +
    "<li> 2 " +
    " " +
    get1.name[1] +
    "</li>" +
    "<li> 3 " +
    " " +
    get1.name[2] +
    "</li>" +
    "<li> 4 " +
    " " +
    get1.name[3] +
    "</li></ul>"

  // Clone checkbox
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")

  // Insert checkbox status
  checkbox.checked = get1.complete

  // Append
  list.appendChild(templateClone)
}

// -- Local Save
function saveItems() {
  localStorage.setItem(EXERCISE12_STORAGE_KEY, JSON.stringify(storeList))
}

// -- Local Load
function loadItems() {
  const storeListString = localStorage.getItem(EXERCISE12_STORAGE_KEY)

  // JSON parse creates an array || short circuit if empty
  return JSON.parse(storeListString) || []
}

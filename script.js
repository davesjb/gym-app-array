import {
  storeExercise,
  showHistoryButtons,
  updateSavedWorkouts,
} from "./util/save.js"
import { burgerToggle } from "./util/nav.js"
import { allExercises } from "./util/exercises.js"

// Form options fly out
const programmeForm = document.querySelector("#programme")

// Buttons top
const buttonSkip = document.querySelector("[data-skip]")
const buttonGo = document.querySelector("[data-go]")

// Buttons below
const buttonToggle = document.querySelector("[data-toggle-reps]")
const buttonSetDone = document.querySelector("[data-set-done]")
const buttonOptions = document.querySelector("[data-options]")
const buttonSave = document.querySelector("[data-save]")
const buttonReset = document.querySelector("[data-reset]")
// Text names, reps, stats
const slot1Text = document.querySelector("[data-slot1-text]")
const slot2Text = document.querySelector("[data-slot2-text]")
const slot3Text = document.querySelector("[data-slot3-text]")
const slot4Text = document.querySelector("[data-slot4-text]")
const slot1Reps = document.querySelector("[data-slot1-reps]")
const slot2Reps = document.querySelector("[data-slot2-reps]")
const slot3Reps = document.querySelector("[data-slot3-reps]")
const slot4Reps = document.querySelector("[data-slot4-reps]")
const totalPushups = document.querySelector("[data-pushups-text]")
const totalBack = document.querySelector("[data-back-text]")
const totalLegs = document.querySelector("[data-legs-text]")
const totalArms = document.querySelector("[data-arms-text]")
const totalCore = document.querySelector("[data-core-text]")
const totalRounds = document.querySelector("[data-total-text]")
const targetPushups = document.querySelector("[data-pushups-target]")

const setCounter = document.querySelector("[data-set-counter]")

// Pulse Animate
const animateOnload = document.querySelector(".animate-onload")

// Hide show css
const listView = document.querySelectorAll(".list-view")
const showPushups = document.querySelectorAll(".show-pushups")
const targets = document.querySelectorAll(".hide-goals")
const reps = document.querySelectorAll(".reps")
const exerciseList = document.querySelectorAll(".exercise-list")

const navSide = document.querySelector("[data-nav-side]")
const sideButtonGo = document.querySelector("[data-go-side]")
const sideButtonSkip = document.querySelector("[data-skip-side]")
const sideButtonSet = document.querySelector("[data-set-side]")

// Reset Exercise names
const slotText = document.querySelectorAll(".slot-text")

// Setting parent css styles
const slotContainer = document.querySelector("[data-slot-container]")

// Update programme name
const programmeUpdate = document.querySelector("[data-programme]")

const targetBack = document.querySelector("[data-back-target]")
const targetLegs = document.querySelector("[data-legs-target]")
const targetArms = document.querySelector("[data-arms-target]")
const targetCore = document.querySelector("[data-core-target]")

// Updates box with rep range selected
const selectedReps = document.querySelector("[data-select-reps]")

// Updates Rest and no of sets text
const sets = document.querySelector("[data-sets]")

// Text Rest, Sets, counter
const rest = document.querySelector("[data-rest]")

let pushUpTotal = 100

// Set starting variables
let backCount = 0
let legsCount = 0
let armsCount = 0
let coreCount = 0
let totalCount = 0

let setCount = 1

let repsForExercise = []
let secsForExercise = []

// Interval Times
let short = 20
let medium = 30
let long = 40

// Duplicates History and reps/secs
let slot1 = []
let slot2 = []
let slot3 = []
let slot4 = []
let slot1duplicates = []
let slot2duplicates = []
let slot3duplicates = []
let slot4duplicates = []

// Rep ranges
let enduranceReps = [14, 16, 18, 20, 20]
let hyperReps = [10, 12, 12]
let powerReps = [4, 6, 8, 8]
let strengthReps = [2, 3, 4, 6, 6]

let repsOrTime = null

// Save Exercises temp
let titleSet = ""
let exerciseSet = []
let slot1Exercises = []

let historyCount = 0

// Exercise groups - see exercises.js
const exerciseOptions = {
  pushUps1: {
    type: allExercises["pushUpsAll"],
    history: slot1,
    historyDuplicates: slot1duplicates,
    messageArea: slot1Text,
    repsArea: slot1Reps,
    title: "Push Ups ",
    reps: repsForExercise,
    secs: secsForExercise,
  },
  upper2: {
    type: allExercises["upper2"],
    history: slot2,
    historyDuplicates: slot2duplicates,
    messageArea: slot2Text,
    repsArea: slot2Reps,
    title: `<span class="inprint">  (Upper)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  upper3: {
    type: allExercises["upper3"],
    history: slot3,
    historyDuplicates: slot3duplicates,
    messageArea: slot3Text,
    repsArea: slot3Reps,
    title: `<span class="inprint">  (Upper)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  upperAll2: {
    type: allExercises["upperAll"],
    history: slot2,
    historyDuplicates: slot2duplicates,
    messageArea: slot2Text,
    repsArea: slot2Reps,
    title: `<span class="inprint">  (Upper)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  upperAllHiit2: {
    type: allExercises["upperHiit"],
    history: slot2,
    historyDuplicates: slot2duplicates,
    messageArea: slot2Text,
    repsArea: slot2Reps,
    title: `<span class="inprint">  (Upper)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  legs1: {
    type: allExercises["legs1"],
    history: slot1,
    historyDuplicates: slot1duplicates,
    messageArea: slot1Text,
    repsArea: slot1Reps,
    title: `<span class="inprint">  (Legs)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  legs2: {
    type: allExercises["legs2"],
    history: slot2,
    historyDuplicates: slot2duplicates,
    messageArea: slot2Text,
    repsArea: slot2Reps,
    title: `<span class="inprint">  (Legs)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  legsAll3: {
    type: allExercises["legsAll"],
    history: slot3,
    historyDuplicates: slot3duplicates,
    messageArea: slot3Text,
    repsArea: slot3Reps,
    title: `<span class="inprint">  (Legs)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  core3: {
    type: allExercises["core3"],
    history: slot3,
    historyDuplicates: slot3duplicates,
    messageArea: slot3Text,
    repsArea: slot3Reps,
    title: `<span class="inprint">  (Core)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  core4: {
    type: allExercises["core4"],
    history: slot4,
    historyDuplicates: slot4duplicates,
    messageArea: slot4Text,
    repsArea: slot4Reps,
    title: `<span class="inprint">  (Core)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  coreAll4: {
    type: allExercises["coreAll"],
    history: slot4,
    historyDuplicates: slot4duplicates,
    messageArea: slot4Text,
    repsArea: slot4Reps,
    title: `<span class="inprint">  (Core)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  ideas1: {
    type: allExercises["ideas"],
    history: slot1,
    historyDuplicates: slot1duplicates,
    messageArea: slot1Text,
    repsArea: slot1Reps,
    title: `<span class="inprint">  (Adlib)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
  arms4: {
    type: allExercises["arms"],
    history: slot4,
    historyDuplicates: slot4duplicates,
    messageArea: slot4Text,
    repsArea: slot4Reps,
    title: `<span class="inprint">  (Arms)`,
    reps: repsForExercise,
    secs: secsForExercise,
  },
}

// Goal target base
let backTarget = 0
let legsTarget = 0
let armsTarget = 0
let coreTarget = 0

// Debug
// document.addEventListener("click", (e) => {
//   if (e.target.matches("button")) {
//     console.log("Button clicked")
//   }
// })

// Set target goal based on difficulty and update programme name
function setProgramme(exerciseClass, programmeName) {
  slotContainer.classList.remove("upper", "lower", "fullbody", "fullbodyhiit")
  slotContainer.classList.add(exerciseClass)

  const today = new Date().toISOString().split("T")[0]

  titleSet = programmeName + " " + today
  exerciseSet.push(titleSet)

  console.log("titleSet", titleSet)
  console.log("exerciseSet", exerciseSet)

  if (beginner.checked == true) {
    backTarget = 4
    legsTarget = 4
    armsTarget = 4
    coreTarget = 4
    programmeUpdate.innerHTML =
      "<span>" + programmeName + " " + backTarget + " Rounds</span>"
  } else if (advanced.checked == true) {
    backTarget = 6
    legsTarget = 6
    armsTarget = 6
    coreTarget = 6
    programmeUpdate.innerHTML =
      "<span>" + programmeName + " " + backTarget + " Rounds</span>"
  } else {
    backTarget = 5
    legsTarget = 5
    armsTarget = 5
    coreTarget = 5
    programmeUpdate.innerHTML =
      "<span>" + programmeName + " " + backTarget + " Rounds</span>"
  }
  targetBack.innerHTML = backTarget + " " + "<span>Rounds</span>"
  targetLegs.innerHTML = legsTarget + " " + "<span>Rounds</span>"
  targetArms.innerHTML = armsTarget + " " + "<span>Rounds</span>"
  targetCore.innerHTML = coreTarget + " " + "<span>Rounds</span>"
}

// --------------------------------------------
// --------------------------------------------
// Randomly select exercise with no duplicates
// --------------------------------------------
// --------------------------------------------
function getExerciseType(exerciseCat) {
  exerciseCat.map((exercise) => {
    const options = exerciseOptions[exercise]

    const exerciseResult =
      options["type"][Math.floor(Math.random() * options["type"].length)]

    if (options["history"].length >= options["type"].length) {
      buttonGo.classList.add("opacity")
      buttonSkip.classList.remove("show")
      sideButtonSkip.classList.remove("show")

      return
    }
    // If not in history
    if (!options["history"].includes(exerciseResult)) {
      // Push to history
      options["history"].push(exerciseResult)

      // Push to exercise set for saving
      exerciseSet.push(exerciseResult)

      options["messageArea"].innerHTML = updateMessage(
        options["title"],
        exerciseResult
      )

      // If it is in history but not in duplicates
    } else if (!options["historyDuplicates"].includes(exerciseResult)) {
      // Push it into duplicates
      options["historyDuplicates"].push(exerciseResult)

      // Re run function
      getExerciseType(exerciseCat)
    } else {
      getExerciseType(exerciseCat)
    }
  })
}

// Function takes arguments and spits out html to screen
const updateMessage = (title, history) => {
  return `<span>${history + " " + title}</span>`
}

// Set Exercise Reps or Time and Rest Time
export function checkRepRange() {
  if (endurance.checked == true) {
    setReps(enduranceReps)
    setRestTime(60)
    repsOrTime = "Reps"
    sets.innerHTML = `<span>Rest Time <span class="inprint">(3 Sets)</span></span>`
  } else if (hypertrophy.checked == true) {
    setReps(hyperReps)
    setRestTime(60)
    repsOrTime = "Reps"
    sets.innerHTML = `<span>Rest Time <span class="inprint">(3 Sets)</span></span>`
  } else if (power.checked == true) {
    setReps(powerReps)
    setRestTime(120)
    repsOrTime = "Reps"
    sets.innerHTML = `<span>Rest Time <span class="inprint">(4 Sets)</span></span>`
  } else if (strength.checked == true) {
    setReps(strengthReps)
    setRestTime(120)
    repsOrTime = "Reps"
    sets.innerHTML = `<span>Rest Time <span class="inprint">(5 Sets)</span></span>`
  } else if (time.checked == true) {
    setReps(time)
    repsOrTime = "Secs"
    sets.innerHTML = `<span>Rest Time <span class="inprint">(3 Sets)</span></span>`
  }
}

// Set time for exercise and rest, or randomly push reps into round
export const setReps = (repRange) => {
  if (repRange == time) {
    if (beginner.checked == true) {
      secsForExercise.push(short)
      setRestTime(long)
    } else if (intermediate.checked == true) {
      secsForExercise.push(medium)
      setRestTime(medium)
    } else if (advanced.checked == true) {
      secsForExercise.push(long)
      setRestTime(short)
    }
  } else {
    const selectOne = repRange[Math.floor(Math.random() * repRange.length)]
    repsForExercise.push(selectOne)
  }
}

const setRestTime = (restTime) => {
  if (restTime < 60) {
    rest.innerHTML = `${restTime}` + "<span>Secs</span>"
  } else if (restTime == 60) {
    if (beginner.checked == true) {
      rest.innerHTML = `${restTime + 20}` + "<span>Secs</span>"
    } else if (advanced.checked == true) {
      rest.innerHTML = `${restTime - 20}` + "<span>Secs</span>"
    } else {
      rest.innerHTML = `${restTime / 60}` + "<span>Min</span>"
    }
  } else {
    if (beginner.checked == true) {
      rest.innerHTML = `${restTime + 20}` + "<span>Secs</span>"
    } else if (advanced.checked == true) {
      rest.innerHTML = `${restTime - 20}` + "<span>Secs</span>"
    } else {
      rest.innerHTML = `${restTime / 60}` + "<span>Mins</span>"
    }
  }
}

// Randomly select reps or seconds, if pushups reps update reps
const getRepsSecs = (exerciseCat) => {
  exerciseCat.map((exercise) => {
    const options = exerciseOptions[exercise]

    const exerciseReps =
      options["reps"][Math.floor(Math.random() * options["reps"].length)]

    const exerciseSecs =
      options["secs"][Math.floor(Math.random() * options["secs"].length)]

    if (repsOrTime === "Secs") {
      // Secs
      options["repsArea"].innerHTML =
        exerciseSecs + " " + "<span>" + repsOrTime + "</span>"
    } else {
      // Reps
      options["repsArea"].innerHTML =
        exerciseReps + " " + "<span>" + repsOrTime + "</span>"
    }
    count(exerciseCat, exerciseReps) //452
  })
}

const count = (exerciseCat, exerciseReps) => {
  exerciseCat.map((exercise) => {
    if (exercise === "pushUps1" && time.checked === false) {
      updatePushUps(exerciseReps)
    } else if (exercise !== "pushUps1" && time.checked === false) {
      goalCounter(exerciseCat, exerciseReps)
    }
  })
}

// Add a count for each exercise
const goalCounter = (exerciseCat, exerciseReps) => {
  exerciseCat.map((exercise) => {
    if (
      exercise === "upper2" ||
      exercise === "upperAll2" ||
      exercise === "upperAllHiit2"
    ) {
      backCount = backCount + 1

      totalBack.innerHTML = backCount + " " + "<span>Upper</span>"

      if (backCount >= backTarget) {
        totalBack.classList.add("done")
        targetBack.classList.add("done")
        targetBack.innerHTML = backTarget + " " + "<span>Done!</span>"
      }
    } else if (exercise === "legs1" || exercise === "legsAll3") {
      legsCount = legsCount + 1

      totalLegs.innerHTML = legsCount + " " + "<span>Lower</span>"
      if (legsCount >= legsTarget) {
        totalLegs.classList.add("done")
        targetLegs.classList.add("done")
        targetLegs.innerHTML = legsTarget + " " + "<span>Done!</span>"
      }
    } else if (exercise === "arms4") {
      armsCount = armsCount + 1

      totalArms.innerHTML = armsCount + " " + "<span>Arms</span>"
      if (armsCount >= armsTarget) {
        totalArms.classList.add("done")
        targetArms.classList.add("done")
        targetArms.innerHTML = armsTarget + " " + "<span>Done!</span>"
      }
    } else if (exercise === "core4" || exercise === "coreAll4") {
      coreCount = coreCount + 1

      totalCore.innerHTML = coreCount + " " + "<span>Core</span>"
      if (coreCount >= coreTarget) {
        totalCore.classList.add("done")
        targetCore.classList.add("done")
        targetCore.innerHTML = coreTarget + " " + "<span>Done!</span>"
      }
    } else {
      console.log("Other Count")
    }
  })
}

// Update Push Up total
const updatePushUps = (repsSelected) => {
  // Total reps minus selected reps
  pushUpTotal = pushUpTotal - repsSelected

  if (pushUpTotal < 1) {
    // Completed
    totalPushups.classList.add("done")
    totalPushups.innerHTML = `${pushUpTotal}<span>Done!</span>`
    targetPushups.innerHTML = `${100 - pushUpTotal}<span>Pushups</span>`
  } else {
    // Update
    totalPushups.innerHTML = `${pushUpTotal}<span>Remain</span>`
    targetPushups.innerHTML = `${100 - pushUpTotal}<span>Pushups</span>`
  }
}

// Select muscle groups based on workout selection
function updateProgramme() {
  if (upper.checked == true) {
    setProgramme("upper", "Upper Body") //271
  } else if (lower.checked == true) {
    setProgramme("lower", "Legs & Core")
  } else if (fullbody.checked == true) {
    setProgramme("fullbody", "Full Body")
  } else {
    setProgramme("fullbodyhiit", "High Intensity")
  }
}

// Select muscle groups based on workout selection
function updateRepsSecs() {
  if (upper.checked == true) {
    getRepsSecs(["pushUps1"]) //429
    getRepsSecs(["upper2"])
    getRepsSecs(["upper3"])
    getRepsSecs(["arms4"])
  } else if (lower.checked == true) {
    getRepsSecs(["legs1"])
    getRepsSecs(["legs2"])
    getRepsSecs(["core3"])
    getRepsSecs(["core4"])
  } else if (fullbody.checked == true) {
    getRepsSecs(["pushUps1"])
    getRepsSecs(["upperAll2"])
    getRepsSecs(["legsAll3"])
    getRepsSecs(["core4"])
  } else {
    getRepsSecs(["ideas1"])
    getRepsSecs(["upperAllHiit2"])
    getRepsSecs(["legsAll3"])
    getRepsSecs(["coreAll4"])
  }
}

// Select muscle groups based on workout selection
function getExercise() {
  if (upper.checked == true) {
    getExerciseType(["pushUps1"])
    getExerciseType(["upper2"])
    getExerciseType(["upper3"])
    getExerciseType(["arms4"])
  } else if (lower.checked == true) {
    getExerciseType(["legs1"])
    getExerciseType(["legs2"])
    getExerciseType(["core3"])
    getExerciseType(["core4"])
  } else if (fullbody.checked == true) {
    getExerciseType(["pushUps1"])
    getExerciseType(["upperAll2"])
    getExerciseType(["legsAll3"])
    getExerciseType(["coreAll4"])
  } else {
    getExerciseType(["ideas1"])
    getExerciseType(["upperAllHiit2"])
    getExerciseType(["legsAll3"])
    getExerciseType(["coreAll4"])
  }
}

// -- Save.js

buttonSave.addEventListener("click", (e) => {
  if (!e.target.matches("[data-save]")) return
  slot1Exercises.push(exerciseSet)
  storeExercise(slot1Exercises)
  showHistoryButtons()
})

function openOptions() {
  buttonReset.classList.add("show")
  buttonSkip.classList.add("show", "pulse")
  setCounter.classList.add("show")
  buttonSetDone.classList.add("show", "pulse")
  buttonSave.classList.add("show")
  sideButtonSet.classList.add("show")
  sideButtonSkip.classList.add("show")
}

function resetSlots() {
  slotText.forEach((slotText) => {
    slotText.innerHTML = ""
    slotText.parentElement.classList.remove("close")
  })
}

function resetSets() {
  setCount = 1
  setCounter.innerHTML = setCount + "<span>Set</span>"
}

function updateSets() {
  setCount = setCount + 1
  setCounter.innerHTML = setCount + "<span>Set</span>"
}

function resetTotalRound() {
  totalCount = 1
  totalRounds.innerHTML = totalCount + " " + "<span>Rounds</span>"
}

function updateTotalRound() {
  totalCount = totalCount + 1
  totalRounds.innerHTML = totalCount + " " + "<span>Rounds</span>"
}

function resetAllCats() {
  slot1.length = 0
  slot2.length = 0
  slot3.length = 0
  slot4.length = 0
  slot1duplicates.length = 0
  slot2duplicates.length = 0
  slot3duplicates.length = 0
  slot4duplicates.length = 0
}

// Reset workout
function resetWorkout() {
  backTarget = 5
  legsTarget = 5
  armsTarget = 5
  coreTarget = 5
  backCount = 0
  legsCount = 0
  armsCount = 0
  coreCount = 0
  pushUpTotal = 100
  repsForExercise = []
  repsOrTime = null
  slot1Exercises = []

  totalPushups.classList.remove("done")
  totalPushups.innerHTML = `${100}<span>Remain</span>`
  targetPushups.innerHTML = `${0}<span>Pushups</span>`

  totalBack.innerHTML = backCount + " " + "<span>Upper</span>"
  totalLegs.innerHTML = legsCount + " " + "<span>Lower</span>"
  totalArms.innerHTML = armsCount + " " + "<span>Arms</span>"
  totalCore.innerHTML = coreCount + " " + "<span>Core</span>"

  targetBack.innerHTML = backTarget + " " + "<span>Rounds</span>"
  targetLegs.innerHTML = legsTarget + " " + "<span>Rounds</span>"
  targetArms.innerHTML = armsTarget + " " + "<span>Rounds</span>"
  targetCore.innerHTML = coreTarget + " " + "<span>Rounds</span>"
  resetSets()
  resetTotalRound()
  resetAllCats()
  resetSlots()
  setTimeout(function () {
    buttonGo.classList.remove("opacity")
    buttonSetDone.classList.remove("show", "pulse")
    buttonSkip.classList.remove("show", "pulse")

    sideButtonSet.classList.remove("show")
    sideButtonSkip.classList.remove("show")

    buttonSave.classList.remove("show")
    buttonReset.classList.remove("show")

    slotContainer.classList.remove("upper", "lower", "fullbody", "fullbodyhiit")

    totalBack.classList.remove("done")
    totalLegs.classList.remove("done")
    totalArms.classList.remove("done")
    totalCore.classList.remove("done")
    targetBack.classList.remove("done")
    targetLegs.classList.remove("done")
    targetArms.classList.remove("done")
    targetCore.classList.remove("done")
    targetPushups.classList.remove("done")

    setCounter.classList.remove("show")

    console.clear()
  }, 550)
}

function pulseWide() {
  animateOnload.classList.add("pulse", "wide-anim")
  setTimeout(function () {
    animateOnload.classList.remove("pulse", "wide-anim")
  }, 1000)
}

// -- Start
function go() {
  exerciseSet.length = 0
  titleSet = ""
  checkRepRange() //359
  getExercise() //573  -> 313
  updateProgramme() //535
  updateRepsSecs() //548
  openOptions() //606
  resetSets() //623
  updateTotalRound() //638
}

function skip() {
  exerciseSet.length = 0
  titleSet = ""
  checkRepRange() //359
  getExercise() //573 -> 313
  updateProgramme() //535
}

function changeView() {
  exerciseList.forEach((exerciseList) => {
    exerciseList.classList.remove("close")
  })

  if (buttonToggle.classList.contains("expand") == true) {
    // Expanded View
    targets.forEach((targets) => {
      targets.classList.add("display")
    })
    setTimeout(function () {
      buttonToggle.classList.add("expanded")
      buttonToggle.classList.remove("expand")
      buttonToggle.innerText = "Expanded"
    }, 50)
  } else if (buttonToggle.classList.contains("expanded") == true) {
    // Minimal View
    targets.forEach((targets) => {
      targets.classList.remove("display")
    })
    listView.forEach((listView) => {
      listView.classList.add("hide-view")
    })
    setTimeout(function () {
      buttonToggle.classList.remove("expanded")
      buttonToggle.classList.add("minimal")
      buttonToggle.innerText = "Minimal"
    }, 50)
  } else {
    // Default View
    listView.forEach((listView) => {
      listView.classList.remove("hide-view")
    })
    setTimeout(function () {
      buttonToggle.classList.add("expand")
      buttonToggle.classList.remove("minimal")
      buttonToggle.innerText = "Default"
    }, 50)
  }
}

function setDone() {
  if (upper.checked == true) {
    getRepsSecs(["pushUps1"])
    updateSets()
  } else if (fullbody.checked == true) {
    getRepsSecs(["pushUps1"])
    updateSets()
  } else {
    updateSets()
  }
}

// -- Options
buttonOptions.addEventListener("click", (e) => {
  if (!e.target.matches("[data-options]")) return
  burgerToggle()
})

// -- Form Submit go()
programmeForm.addEventListener("submit", (e) => {
  e.preventDefault()

  burgerToggle()
  resetAllCats()

  setTimeout(function () {
    buttonGo.classList.remove("opacity")
    go()
  }, 550)
})

// -- go!()
buttonGo.addEventListener("click", (e) => {
  if (!e.target.matches("[data-go]")) return
  go()
})

// -- go!()
sideButtonGo.addEventListener("click", (e) => {
  e.preventDefault()
  go()
  console.log("Go")
})

// -- Skip
buttonSkip.addEventListener("click", (e) => {
  if (!e.target.matches("[data-skip]")) return
  skip()
})

// -- Skip
sideButtonSkip.addEventListener("click", (e) => {
  e.preventDefault()
  skip()
  console.log("skip")
})

// -- Toggle Reps Counters
// -- Change View
buttonToggle.addEventListener("click", (e) => {
  if (!e.target.matches("[data-toggle-reps]")) return
  changeView()
})

// -- Toggle Individual Goal Counters
// -- Expanded View
reps.forEach((reps) => {
  reps.addEventListener("click", (e) => {
    reps.parentElement.classList.add("open")
    setTimeout(function () {
      reps.parentElement.classList.remove("open")
    }, 3000)
  })
})

// -- Toggle Individual Text Slots
slotText.forEach((slotText) => {
  slotText.addEventListener("click", (e) => {
    slotText.parentElement.classList.toggle("close")
  })
})

// -- Set +
buttonSetDone.addEventListener("click", (e) => {
  if (!e.target.matches("[data-set-done]")) return
  setDone()
})

// -- Set +
sideButtonSet.addEventListener("click", (e) => {
  e.preventDefault()
  setDone()
  console.log("Set")
})

// -- Reset
buttonReset.addEventListener("click", (e) => {
  if (!e.target.matches("[data-reset]")) return
  resetWorkout()
})

window.onload = function () {
  // - Minimal Button
  pulseWide()

  // -> save.js - Saved Workouts Text (Number)
  updateSavedWorkouts()

  setTimeout(function () {
    buttonGo.classList.remove("opacity")
  }, 500)
}

// Listen for keyboard letters pressed
document.addEventListener("keydown", (e) => {
  const keyboardKey = e.code
  if (keyboardKey == "KeyG") {
    console.log("Go")
    go()
  } else if (keyboardKey == "KeyS") {
    console.log("Skip")
    skip()
  } else if (keyboardKey == "KeyV") {
    console.log("View")
    changeView()
  } else if (keyboardKey == "KeyN") {
    console.log("Next Set")
    setDone()
  } else if (keyboardKey == "KeyO") {
    console.log("Options")
    burgerToggle()
  } else if (keyboardKey == "KeyR") {
    console.log("Reset")
    resetWorkout()
  }
})

const body = document.body
const scrollUp = "scroll-up"
const scrollDown = "scroll-down"
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset
  if (currentScroll <= 220) {
    body.classList.remove(scrollUp)
    return
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp)
    body.classList.add(scrollDown)
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains(scrollDown)
  ) {
    // up
    body.classList.remove(scrollDown)
    body.classList.add(scrollUp)
  }
  lastScroll = currentScroll
})

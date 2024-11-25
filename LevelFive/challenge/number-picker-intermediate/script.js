// Form elements

const numberPickerForm = document.querySelector('form')
const iptPickAmount = document.getElementById('pick-amount')
const iptRangeFrom = document.getElementById('range-from')
const iptRangeTo = document.getElementById('range-to')
const iptToggle = document.getElementById('toggle')

// Result elements

const resultWrapper = document.getElementById('result-wrapper')
const btnDrawAgain = document.getElementById('btn-draw-again')
const counterLabel = document.getElementById('counter-label')

class NumberPicker {
  #counter = 0

  get counter() {
    return this.#counter
  }

  draw({ amount, from, to, isNotRepeat }) {
    const result = []
    const [min, max] = from > to ? [to, from] : [from, to]

    let i = 0

    while (i < amount) {
      const number = Math.round(Math.random() * (max - min) + min)

      if (isNotRepeat && result.includes(number)) {
        continue
      }

      result.push(number)
      i++
    }

    this.#counter++
    return result
  }
}

class DisplayResult {
  #entranceTime = 350
  #textAppearTime = 300
  #growTime = 730
  #rotateTime = 1200
  #shrinkTime = 730

  #animationTime =
    this.#entranceTime +
    this.#textAppearTime +
    this.#growTime +
    this.#rotateTime +
    this.#shrinkTime

  constructor() {
    const animationSetup = `
      --entrance-time: ${this.#entranceTime}ms;
      --text-appear-time: ${this.#textAppearTime}ms;
      --grow-time: ${this.#growTime}ms;
      --rotate-time: ${this.#rotateTime}ms;
      --shrink-time: ${this.#shrinkTime}ms;
    `

    resultWrapper.style = animationSetup
  }

  execute({ counter, values }) {
    btnDrawAgain.parentElement.classList.add('hidden')
    setTimeout(() =>
      btnDrawAgain.parentElement.classList.remove('hidden'),
      this.#animationTime * values.length
    )

    counterLabel.textContent = `${counter}° result`

    values.forEach((value, i) => {
      setTimeout(() => {
        const item = this.#createNumber(value)
        resultWrapper.appendChild(item)

      }, i * this.#animationTime)
    })
  }

  #createNumber(number) {
    const numberContainer = document.createElement('div')
    numberContainer.setAttribute('aria-label', number)
    numberContainer.classList.add('animated-number')

    return numberContainer
  }
}

class ScreenController {
  #entryScreen
  #resultScreen

  #DisplayResult
  #NumberPicker

  constructor() {
    this.#entryScreen = document.getElementById('entry')
    this.#resultScreen = document.getElementById('result')

    this.#DisplayResult = new DisplayResult()
    this.#NumberPicker = new NumberPicker()
  }

  displayEntry() {
    this.#resultScreen.classList.add('hidden')

    resultWrapper.innerHTML = ''
    numberPickerForm.reset()

    this.#entryScreen.classList.remove('hidden')
  }

  displayResult({ amount, from, to, isNotRepeat }) {
    const result = this.#NumberPicker.draw({
      amount,
      from,
      to,
      isNotRepeat,
    })

    this.#entryScreen.classList.add('hidden')
    this.#resultScreen.classList.remove('hidden')

    this.#DisplayResult.execute({
      counter: this.#NumberPicker.counter,
      values: result
    })
  }
}

const screenController = new ScreenController()

// handleInputEntry()
numberPickerForm.oninput = (event) => {
  const { target } = event

  if (target.type === 'checkbox') return

  target.value = target.value.replace(/[^0-9]/g, '')

  const charLength = target.value.length

  if (charLength === 1 && target.id === 'pick-amount') {
    target.value = target.value.replace(/[^1-9]/g, '')
  }

  if (charLength > 1 && target.id === 'pick-amount') {
    target.value = target.value.slice(0, 2)
  }

  if (charLength > 2) {
    target.value = target.value.slice(0, 3)
  }
}

// displayResult()
numberPickerForm.onsubmit = (event) => {
  event.preventDefault()

  const amount = Number(iptPickAmount.value)
  const from = Number(iptRangeFrom.value)
  const to = Number(iptRangeTo.value)
  const isNotRepeat = Boolean(iptToggle.checked)

  const rangeLength = Math.abs(from - to) + 1

  if (isNotRepeat && amount > rangeLength) {
    return alert('Do not repeat a number, you need a number of possibilities greater than the number of numbers to be drawn.')
  }

  screenController.displayResult({
    amount,
    from,
    to,
    isNotRepeat,
  })
}

// displayEntry()
btnDrawAgain.onclick = () => screenController.displayEntry()
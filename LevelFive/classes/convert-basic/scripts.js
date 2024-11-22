// Currency quote of the day
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Getting the form Elements 
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')

// Getting the footer Elements
const footer = document.querySelector('footer')
const description = document.getElementById('description')
const result = document.getElementById('result')

// Handling the amount input to receive only numbers
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Catching the "onsubmit" event of the form
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case 'USD':
      convertCurrency(amount.value, USD, 'US$')
      break

    case 'EUR':
      convertCurrency(amount.value, EUR, '€')
      break

    case 'GBP':
      convertCurrency(amount.value, EUR, '£')
      break

    default:
      throw new Error()
  }
}

// Function to convert the currency
function convertCurrency(amount, price, symbol) {
  try {
    description.innerText = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calculation of the total
    let total = amount * price

    // verify if the result ins't a number
    if (isNaN(total)) {
      return alert("Please, type the value correctly to convert")
    }

    // formats the total value
    total = formatCurrencyBRL(total).replace('R$', "")

    // display the amount result
    result.innerText = `${total} Reais`

    // Apply the class that show the footer to show the result
    footer.classList.add('show-result')
  } catch (error) {
    // Removes the footer class, removing it from the screen
    footer.classList.remove('show-result')

    console.log(error)
    alert('Could not convert; Try again later')
  }
}

// Formats the currency in Brazilian Real
function formatCurrencyBRL(value) {
  // Convert to number to use "toLocalString" to format in BRL standard (R$ 00,00)
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}
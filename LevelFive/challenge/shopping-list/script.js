/* 
  #Execution flow

    user type an value;
    submit triggered;
      eventListener('submit')

    item added to list;
      add new item()
        create item list()
    
    item removed to list;
      remove item()
    
    alert is shown;
      shown alert()
*/

const form = document.querySelector('form')
const input = document.querySelector('#ipt-add-item')

const list = document.querySelector('ul')

form.onsubmit = (event) => {
  event.preventDefault()

 const newItem = createItemList(input.value)
 addNewItem(newItem)
}

function addNewItem(item) {
  list.appendChild(item)
}

function createItemList(value) {
  const li = document.createElement('li')
  const span = document.createElement('span')
  span.innerHTML = value.trim()
  
  li.append(
    createCheckbox(),
    span,
    createTrashIconBtn()
  )

  return li
}

function createCheckbox() {
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  return checkbox
}

function createTrashIconBtn() {
  const btnIcon = document.createElement('button')
  const svgTrashIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m16.25 4.583-.516 8.355c-.132 2.134-.198 3.201-.733 3.969a3.35 3.35 0 0 1-1 .94c-.8.486-1.868.486-4.007.486-2.141 0-3.212 0-4.011-.487a3.3 3.3 0 0 1-1-.942c-.536-.769-.6-1.837-.73-3.975L3.75 4.583m-1.25 0h15m-4.12 0-.57-1.173c-.377-.78-.566-1.17-.892-1.413a2 2 0 0 0-.229-.143c-.36-.187-.794-.187-1.66-.187-.888 0-1.332 0-1.7.195a2 2 0 0 0-.231.15c-.33.252-.514.656-.882 1.464L6.71 4.583m1.207 9.167v-5m4.166 5v-5" stroke="#080B12" stroke-width="1.25" stroke-linecap="round"/></svg>`

  btnIcon.innerHTML = svgTrashIcon
  btnIcon.classList.add('btn-icon')
  return btnIcon
}
import { checkEnd, checkWinVars } from './gameArrays.js'

const { user1, user2, whoStart } = sessionStorage;
const forUsers = document.getElementsByClassName('tic-tac-toe__for-users-text')[0]
const boardItems = document.getElementsByClassName('tic-tac-toe__board-item')
const helpBoardTitle = document.getElementsByClassName('tic-tac-toe__for-users-board-title')[0]
const helpBoard = document.getElementsByClassName('tic-tac-toe__for-users-board')[0]
const helpBoardItems = document.getElementsByClassName('tic-tac-toe__for-users-board-item')
const popup = document.getElementsByClassName('popup')[0]
const popupTitle = document.getElementsByClassName('popup__title')[0]


forUsers.innerHTML = `Первым ходит: ${whoStart}`
let stage = 1
let whoMove = whoStart
let xOrO = 'o'

for (let i = 0; i < boardItems.length; i++) {
  boardItems[i].addEventListener('click', () => {
    deleteHelpMove(xOrO, boardItems[i])

    boardItems[i].classList.add(`tic-tac-toe__board-item_active-${xOrO}`);
    boardItems[i].setAttribute("data-active", `${stage % 2 ? 'o' : 'x'}`);

    helpBoardItems[i].classList.add(`tic-tac-toe__for-users-board-item_active-${xOrO}`);
    helpBoardItems[i].setAttribute("data-active", `${stage % 2 ? 'o' : 'x'}`);


    if (isGameEnd(xOrO)) {
      popupTitle.innerHTML = `${whoMove} выиграл! Поздравляем!`
      popup.classList.remove('hidden')
    } else if (isNobodyWin()) {
      popupTitle.innerHTML = `Ничья!`
      popup.classList.remove('hidden')
    } else {
      stage++;
      xOrO = stage % 2 ? 'o' : 'x';
      checkWin(xOrO)
      whoMove = stage % 2 === 0 ? user2 : user1
      forUsers.innerHTML = `Сейчас ходит: ${whoMove}`
    }

  })
}


const isGameEnd = (xOrO) => {
  for (let i = 0; i < checkEnd.length; i++) {
    const row = checkEnd[i]
    if (getDataActive(boardItems[row[0]]) == xOrO && getDataActive(boardItems[row[1]]) == xOrO && getDataActive(boardItems[row[2]]) == xOrO) {
      return 1
    }
  }

  return 0
}

const isNobodyWin = () => {
  const dataActiveEls = Array.from(document.querySelectorAll('[data-active]'))
  const isAllBoardItemsFull = dataActiveEls.filter(item => item.getAttribute('data-active') === 'x' || item.getAttribute('data-active') === 'o')
  return isAllBoardItemsFull.length == 18 ? 1 : 0
}

const checkWin = (xOrO) => {
  for (let i = 0; i < checkWinVars.length; i++) {
    const row = checkWinVars[i]
    if (
      (getDataActive(helpBoardItems[row[0]]) == 'x' && getDataActive(helpBoardItems[row[1]]) == 'x' && !boardItems[row[2]].classList.contains(`tic-tac-toe__board-item_active-o`)) ||
      (getDataActive(helpBoardItems[row[0]]) == 'o' && getDataActive(helpBoardItems[row[1]]) == 'o' && !boardItems[row[2]].classList.contains(`tic-tac-toe__board-item_active-x`))
    ) {
      setHelpMove(helpBoardItems[row[2]])
      helpBoardTitle.classList.remove('hidden')
      helpBoard.classList.remove('hidden')
    }
  }
}

const getDataActive = (el) => {
  return el.getAttribute('data-active')
}

const setHelpMove = (el) => {
  el.classList.add(`tic-tac-toe__for-users-board-item_active-${xOrO}`);
  el.classList.add(`tic-tac-toe__for-users-board-item_active-help`);
  el.setAttribute("data-activehelp", `1`);
}

const deleteHelpMove = (xOrO, elBoard) => {
  helpBoardTitle.classList.add('hidden')
  helpBoard.classList.add('hidden')

  const helpBoardItem = document.querySelector('[data-activehelp="1"]')
  helpBoardItem?.classList.remove(`tic-tac-toe__for-users-board-item_active-${xOrO}`);
  helpBoardItem?.classList.remove(`tic-tac-toe__for-users-board-item_active-help`);
  helpBoardItem?.setAttribute("data-activehelp", `0`);
}
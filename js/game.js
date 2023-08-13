import { checkEnd, checkWinVars } from './gameArrays.js'
import { BOARD_ITEM_ACTIVE, HELP_BOARD_ITEM_ACTIVE_HELP, HELP_BOARD_ITEM_ACTIVE,  ALL_BOARD_ITEMS_LENGHT} from './constans.js'

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
    if (getDataActive(boardItems[i]) === '') {
      deleteHelpMove(xOrO)

      boardItems[i].classList.add(`${BOARD_ITEM_ACTIVE}-${xOrO}`);
      boardItems[i].setAttribute("data-active", `${stage % 2 ? 'o' : 'x'}`);

      helpBoardItems[i].classList.add(`${HELP_BOARD_ITEM_ACTIVE}-${xOrO}`);
      helpBoardItems[i].setAttribute("data-active", `${stage % 2 ? 'o' : 'x'}`);


      if (isGameEnd(xOrO)) {
        poopupVisible(`Пользователь с именем ${whoMove} выиграл! Поздравляем!`)
      } else if (isNobodyWin()) {
        poopupVisible(`Ничья!`)
      } else {
        stage++;
        xOrO = stage % 2 ? 'o' : 'x';

        if (whoStart === user1) {
          whoMove = stage % 2 === 0 ? user2 : user1
        } else {
          whoMove = stage % 2 === 0 ? user1 : user2
        }

        forUsers.innerHTML = `Сейчас ходит: ${whoMove}`
        checkWin()
      }
    }
  })
}


const isGameEnd = (xOrO) => {
  for (let i = 0; i < checkEnd.length; i++) {
    const row = checkEnd[i]
    if (getDataActive(boardItems[row[0]]) === xOrO && getDataActive(boardItems[row[1]]) === xOrO && getDataActive(boardItems[row[2]]) === xOrO) {
      return true
    }
  }

  return false
}

const isNobodyWin = () => {
  const dataActiveEls = Array.from(document.querySelectorAll('[data-active]'))
  const isAllBoardItemsFull = dataActiveEls.filter(item => {
    const attribute = getDataActive(item)
    return attribute === 'x' || attribute === 'o'
  })
  return isAllBoardItemsFull.length === ALL_BOARD_ITEMS_LENGHT
}

const checkWin = () => {
  for (let i = 0; i < checkWinVars.length; i++) {
    const row = checkWinVars[i]
    const attribute1 = getDataActive(helpBoardItems[row[0]]);
    const attribute2 = getDataActive(helpBoardItems[row[1]]);
    if (
      ((attribute1 === 'x' && attribute2 === 'x') ||
        (attribute1 === 'o' && attribute2 === 'o')) && getDataActive(boardItems[row[2]]) === ''
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
  el.classList.add(`${HELP_BOARD_ITEM_ACTIVE}-${xOrO}`);
  el.classList.add(`${HELP_BOARD_ITEM_ACTIVE_HELP}`);
  el.setAttribute("data-activehelp", `1`);
}

const deleteHelpMove = (xOrO) => {
  helpBoardTitle.classList.add('hidden')
  helpBoard.classList.add('hidden')

  const helpBoardItemsData = document.querySelectorAll('[data-activehelp="1"]')
  for (let i = 0; i < helpBoardItemsData.length; i++) {
    helpBoardItemsData[i].classList.remove(`${HELP_BOARD_ITEM_ACTIVE}-${xOrO}`);
    helpBoardItemsData[i].classList.remove(`${HELP_BOARD_ITEM_ACTIVE_HELP}`);
    helpBoardItemsData[i].setAttribute("data-activehelp", `0`);
  }
}

const poopupVisible = (text) => {
  popupTitle.innerHTML = text
  popup.classList.remove('hidden')
}
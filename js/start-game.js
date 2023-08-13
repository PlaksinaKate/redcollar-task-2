const error = document.getElementsByClassName('welcome__start-game-error')[0]

const startGame = () => {
  const usersName = document.querySelectorAll('input[type=text]')
  const firstUserName = usersName[0].value
  const secondUserName = usersName[1].value

  if (firstUserName === '' || secondUserName === '') {
    error.classList.remove('hidden')
    return 0
  }

  const whoStartIndex = document.querySelector('input[type="radio"]:checked').value
  const whoStart = usersName[whoStartIndex-1].value
  error.classList.add('hidden')

  sessionStorage.setItem('user1', firstUserName)
  sessionStorage.setItem('user2', secondUserName)
  sessionStorage.setItem('whoStart', whoStart)

  window.location.href = 'tic-tac-toe.html';
  console.log(sessionStorage)
}

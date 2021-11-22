document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  console.log(cardArray)

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  //create your board
  const createBoard= () => {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  const checkForMatch = async () => {
    console.log('checking for match...')
    await sleep(500)

    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosenId) // replaced cardsChosen with cardsChosenId
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //sleep
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
 }

  //flip your card
  const flipCard = async ({target}) => {
    // console.log(target['attributes']['data-id'].value)
    // let cardId = getAttribute('data-id')
    let cardId = target['attributes']['data-id'].value

    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)

    // this.setAttribute('src', cardArray[cardId].img)
    target.setAttribute('src', cardArray[cardId].img)

    if (cardsChosen.length === 2) {
      // setTimeout(checkForMatch, 500)
      await removeClicks()
      await checkForMatch()
      await reAddClicks()
    }
  }

  // remove click events
  const removeClicks = async () => {
    console.log('removing clicks...')
    const cards = document.querySelectorAll('img')

    for (let i = 0; i < cardArray.length; i++) {
      cards[i].removeEventListener('click', flipCard)
    }
    // await sleep(1000)
    console.log('clicks removed...')
  }

  // re-add click events
  const reAddClicks = async () => {
    console.log('re-adding clicks...')
    // await sleep(1000)

    const cards = document.querySelectorAll('img')

    const cardsWon_flat = cardsWon.flat()
    const cardsWon_number = cardsWon_flat.map((item) => {
      return Number(item)
    })

    for (let i = 0; i < cardArray.length; i++) {
      const cardsWon_filter = cardsWon_number.filter((value) => value == i )

      if (cardsWon_filter.length == 0 ) {
        cards[i].addEventListener('click', flipCard)
      } else {
        console.log(`${i} was found in ${cardsWon_number}`)
      }
    }
    console.log('clicks re-added...')
  }

  createBoard()
})

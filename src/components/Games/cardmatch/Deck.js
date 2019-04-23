function shuffle(array) {
  const _array = array.slice(0)
  for (var i = _array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = _array[i]
    _array[i] = _array[j]
    _array[j] = temp
  }

  return _array
}

export default function initializeDeck(questionSet) {
  let id = 0
  console.log(questionSet)
  // const cards = questionSet.slice(0)
  console.log(Array.isArray(questionSet))
  // const cards = ['1_1', '1_2', '1_3', '1_4',
  //   '1_5', '1_6', '2_2', '2_3'
  // ]
  const cards = questionSet.slice(0)
  .reduce((acc, type) => {
    acc.push(...[{
      id: id++,
      type
    }, {
      id: id++,
      type:"n"+ type
    }])
    return acc
  }, [])

  return shuffle(cards)
}

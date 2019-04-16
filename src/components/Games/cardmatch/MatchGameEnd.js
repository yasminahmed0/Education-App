import React from 'react'

export default function MatchGameEnd({
  sendData
}){
  return(
    <div>
      <h3 className="descriptionOperation">Finished</h3>
      <button className="matchGameButton" name="Well Done!" onClick={sendData} >DONE!
      </button>
      <h5 className="scoreBoardMatchGame">Final Score: 100%</h5>
    </div>
  )
}

import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

export class adventureGame extends React.Component {
  constructor(props) {
    super(props);

    // Next up create a new Unity Content object to 
    // initialise and define your WebGL build. The 
    // paths are relative from your index file.

    this.unityContent = new UnityContent(
      "unityEnglish/Build/test2.json",
      "unityEnglish/Build/UnityLoader.js"
    );

    // Create a new listener for our Unity Events.
    // We're going to call this event "GameOver" and
    // pass the score to the listener. The second
    // parameter will be a function.

    this.unityContent.on("GameOver", score => {

      // Now we can use the score to for example
      // display it on our React app.

      this.setState({
        gameOver: true,
        score: score
      });
    });
  }

  render() {

    // Finally render the Unity component and pass 
    // the Unity content through the props.

    return <Unity unityContent={this.unityContent} />;
  }
}

export default adventureGame;
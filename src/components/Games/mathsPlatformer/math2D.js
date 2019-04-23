import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
//import './mathsPlatformer/mathsGame/TemplateData/style.css';
//import './mathsPlatformer/mathsGame/TemplateData/favicon.ico';

 
export class math2D extends React.Component {
  constructor(props) {
    super(props);
 
    this.state={
      score: 0
    }

    this.unityContent = new UnityContent(
      "unityMaths/Build/mathsGameP3.json",
      "unityMaths/Build/UnityLoader.js"
    );

    this.unityContent.on("GameOver", ScorePercentage => {
      // Now we can use the score to for example
      // display it on our React app.
      console.log("inside top")
      this.setState({
        gameOver: true,
        score: ScorePercentage
      });
      console.log("inside bottom")
    });
  }
 
  

  render() {
    return (
      <div>
      {/* <button onClick={this.onClick.bind(this)}>Spawn!</button> */}
      {console.log("react score: "+this.state.score)}
      <Unity unityContent={this.unityContent} />
    </div>
   
    )
  }
}

export default math2D;
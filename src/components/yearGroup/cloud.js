import React from 'react';


class Cloud extends React.Component {
    render(){
        return(<div className={"col span 1-of-3 c" + this.props.num}> <img className="cloud hvr-bob button" src={"images/tempcloud" + this.props.num + ".png"} width={this.props.width + "em"} height="auto"alt={"year " + this.props.num}></img> </div>)
    }
}
export default Cloud
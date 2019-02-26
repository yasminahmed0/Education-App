 "use strict";
import React from 'react';
import Cloud from './cloud';
import rswan from '../resources/css/img/swanleft.png'
class yearGroups extends React.Component {

    render(){
        const a1 = ["240", "250","245"];
        const a2 = ["260", "250","245"];
        const arr = [a1, a2];
        let counter = 0;
        const clouds = arr.map((item) => {
            return <div className="row"> 
                    {
                        item.map((ele) => {
                        counter++;
                        return (<Cloud className={"cloud c"+ counter} num={counter} width={ele}/>)
                        })
                    }
                    </div>
        })
        return <main>
        <div className="row cloudswan" >
            
              <div className="cloudc wrappe skyr">
                {clouds}
             </div>
             <div className="swanright">
                <img className="swans" src={rswan} alt="swanr"></img>

             </div>
        </div>
        </main>
    }
}
export default yearGroups
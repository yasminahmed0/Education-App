// "use strict";
import React from 'react';
import Cloud from './cloud';
class yearGroups extends React.Component {

    render(){
        const a1 = ["290", "300"];
        const a2 = ["295", "310"];
        const a3 = ["300", "295"];
        const arr = [a1, a2, a3];
        let counter = 0;
        
        const clouds = arr.map((item) => {
            return <div className="row"> 
                    {
                        item.map((ele) => {
                        counter++;
                        return (<Cloud num={counter} width={ele}/>)
                        })
                    }
                    </div>
        })
        return <main>
        <div className="wrapper">
            {clouds}
        </div>
        </main>
    }
}
export default yearGroups
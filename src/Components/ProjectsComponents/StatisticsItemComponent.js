import React from "react";
import Media from 'react-bootstrap/Media';
import stat from "./Images/Group143.png"

const StatisticsItemComponent=()=>{
    return(

        <Media>
    <img
    width={ 592}
    height={ 419}
    className="mr-3"
    src={stat}
    alt="Generic placeholder"
    />
    <Media.Body>
    </Media.Body>
    </Media>
)
}
export default StatisticsItemComponent;
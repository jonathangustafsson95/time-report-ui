import React from 'react';
import {useParams} from "react-router-dom"

const ProjectDetail = () => {
  const { missionId } = useParams()
  console.log(missionId)
    return ( 
                
            <text> Mission Details Here </text>
       
          );
}
 
export default ProjectDetail;
import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const LeftSideBar = () => {  
    return (  
            <MenuHolder>
                <TopNavBarItem>
                    <Icon src={require("./Images/dashboard.png")}/>
                    <NavBarText to='/' >Dashboard</NavBarText>
                </TopNavBarItem>

                <NavBarItem>
                    <Icon src={require("./Images/timereport.png")}/>
                    <NavBarText to='/timereport' >Time Report</NavBarText>
                </NavBarItem>

                <NavBarItem>
                    <Icon src={require("./Images/projects.png")}/>
                    <NavBarText to='/projects' >Projects</NavBarText>
                </NavBarItem>
            </MenuHolder>
    )  
}
    
const MenuHolder = styled.div`
    margin-left: 5%;
    width: 200px;
    display: flex;
    flex-direction: column;
`;

const TopNavBarItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const NavBarItem = styled.div`
    display: flex;
    align-items: center;
`;

const NavBarText = styled(NavLink)`
font-family: Roboto;
font-weight: 50;
    margin:0;
    color: #585656;
    text-decoration: none;
    font-size: 20px;
    transition-duration: 0.4s;
    &.active {
        text-decoration: none;
      }
    &:hover {
    opacity: 0.7;
    text-decoration: none;
    }
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 6px;
`;

export default LeftSideBar

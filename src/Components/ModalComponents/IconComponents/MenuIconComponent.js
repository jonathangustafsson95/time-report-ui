import React from "react";
import styled from "styled-components";

const MenuIcon = () => {
  return (
    <IconStyling
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
    >
      <g
        id="Group_285"
        data-name="Group 285"
        transform="translate(-211 -22.485)"
      >
        <g
          id="Ellipse_94"
          data-name="Ellipse 94"
          transform="translate(211 22.485)"
          fill="none"
          stroke="#707070"
          strokeWidth="1"
          opacity="0.6"
        >
          <circle cx="8.5" cy="8.5" r="8.5" stroke="none" />
          <circle cx="8.5" cy="8.5" r="8" fill="none" />
        </g>
        <g
          id="Ellipse_97"
          data-name="Ellipse 97"
          transform="translate(217 28.485)"
          fill="#707070"
          stroke="#707070"
          strokeWidth="1"
          opacity="0.6"
        >
          <circle cx="2.5" cy="2.5" r="2.5" stroke="none" />
          <circle cx="2.5" cy="2.5" r="2" fill="none" />
        </g>
      </g>
    </IconStyling>
  );
};

const IconStyling = styled.svg`
  transform: scale(1.4);
`;

export default MenuIcon;

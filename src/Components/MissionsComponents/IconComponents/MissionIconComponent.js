import React from "react";
import styled from "styled-components";

const MissionIcon = () => {
  return (
      <Root
        xmlns="http://www.w3.org/2000/Root"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <g
          id="Group_156"
          data-name="Group 156"
          transform="translate(-381 -238)"
        >
          <rect
            id="Rectangle_225"
            data-name="Rectangle 225"
            width="48"
            height="48"
            rx="10"
            transform="translate(381 238)"
            fill="#ff2366"
            opacity="0.17"
          />
          <g
            id="Icon_feather-archive"
            data-name="Icon feather-archive"
            transform="translate(389.415 245.331)"
          >
            <path
              id="Path_3"
              data-name="Path 3"
              d="M28.119,12V29.058H4.5V12"
              transform="translate(-0.376 -0.939)"
              fill="none"
              stroke="#f00a6b"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              
            />
            <path
              id="Path_4"
              data-name="Path 4"
              d="M1.5,4.5H30.367v6.561H1.5Z"
              transform="translate(0)"
              fill="none"
              stroke="#f00a6b"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              id="Path_5"
              data-name="Path 5"
              d="M15,18h5.249"
              transform="translate(-1.691 -1.691)"
              fill="none"
              stroke="#f00a6b"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
        </g>
      </Root>
  );
};

const Root = styled.svg`
  transform: scale(0.85);
`;

export default MissionIcon;

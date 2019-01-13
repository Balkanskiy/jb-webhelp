import React from "react";

const SvgArrow = props => (
  <svg width="8px" height="5px" {...props}>
    <defs>
      <clipPath id="arrow_svg__a">
        <path clipRule="evenodd" d="M-149.52-246.48H905.6v367.84H-149.52z" />
      </clipPath>
    </defs>
    <g clipPath="url(#arrow_svg__a)">
      <path
        fill="#343434"
        d="M7.821 1.37a.237.237 0 0 0-.069-.158L7.41.87A.224.224 0 0 0 7.25.8a.237.237 0 0 0-.159.069L4.391 3.57 1.689.869A.237.237 0 0 0 1.53.8a.237.237 0 0 0-.159.069l-.343.343a.237.237 0 0 0-.069.159c0 .055.027.116.069.158l3.203 3.203a.237.237 0 0 0 .159.07.237.237 0 0 0 .158-.07L7.752 1.53a.237.237 0 0 0 .07-.158z"
      />
    </g>
  </svg>
);

export default SvgArrow;

import { SVGProps } from 'react';

export const FacebookIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="fill-[#D1D8E0] transition-all duration-300 hover:fill-primary"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_48_1499)">
        <path
          d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
          fill=""
        />
      </g>
      <defs>
        <clipPath id="clip0_48_1499">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

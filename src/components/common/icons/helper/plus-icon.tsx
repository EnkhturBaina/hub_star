import { SVGProps } from 'react';

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_34_17)">
        <path
          d="M12.8333 12.8334V5.83337H15.1666V12.8334H22.1666V15.1667H15.1666V22.1667H12.8333V15.1667H5.83331V12.8334H12.8333Z"
          fill="#181C31"
        />
      </g>
      <defs>
        <clipPath id="clip0_34_17">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

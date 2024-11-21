import { SVGProps } from 'react';

export const SupplierIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      {...props}
    >
      <defs>
        <style>
          {`
          .cls-1, .cls-2, .cls-3, .cls-4 {
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .cls-1, .cls-2, .cls-3 {
            stroke-width: 6.17px;
          }
          .cls-1 {
            stroke: url(#linear-gradient);
          }
          .cls-2 {
            stroke: url(#linear-gradient-2);
          }
          .cls-3 {
            stroke: url(#linear-gradient-3);
          }
          .cls-4 {
            stroke: #212529;
            stroke-width: 4.11px;
          }
          `}
        </style>
        <linearGradient
          id="linear-gradient"
          x1="-125.94"
          y1="608.74"
          x2="-163.69"
          y2="608.74"
          gradientTransform="matrix(1, 0, 0, -1, 194, 633.3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e38b21" />
          <stop offset="1" stopColor="#ea5838" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="-145.45"
          y1="591.9"
          x2="-146.62"
          y2="591.9"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-3"
          x1="-124.23"
          y1="603.98"
          x2="-165.47"
          y2="603.98"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <path className="cls-1" d="M69.58,18.5l-21,12.14L27.75,18.57" />
      <path className="cls-2" d="M48.6,52.18V30.62" />
      <path
        className="cls-3"
        d="M53.51,6.71l12.7,7a11.25,11.25,0,0,1,5.23,8.87V36a11.25,11.25,0,0,1-5.23,8.87L53.51,52a11.43,11.43,0,0,1-9.86,0L31,44.91A11.23,11.23,0,0,1,25.73,36V22.61A11.23,11.23,0,0,1,31,13.74l12.69-7A11.3,11.3,0,0,1,53.51,6.71Z"
      />
      <path
        className="cls-4"
        d="M23.73,69.6a21.39,21.39,0,0,1,27.33-6,5.83,5.83,0,0,0,3,.58c26.49-1.94,17.62,12.82-2,9"
      />
      <path
        className="cls-4"
        d="M70.73,68.79,79,60.51a4.51,4.51,0,0,1,1.4-1,4.29,4.29,0,0,1,4.77.91,4.32,4.32,0,0,1,0,6.1L72.78,78.93A15.2,15.2,0,0,1,62,83.38H37.51"
      />
      <path
        className="cls-4"
        d="M18.91,69.34l-4.39,4.39a3.21,3.21,0,0,0,0,4.55L29.73,93.49a3.21,3.21,0,0,0,4.55,0l4.39-4.39a3.21,3.21,0,0,0,0-4.55L23.46,69.34A3.21,3.21,0,0,0,18.91,69.34Z"
      />
    </svg>
  );
};

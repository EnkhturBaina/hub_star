import { SVGProps } from 'react';

export const SubscriberIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      {...props} // Spread props for extensibility
    >
      <defs>
        <style>
          {`
          .cls-1, .cls-2, .cls-3 {
            fill: none;
          }
          .cls-1 {
            stroke: #212529;
          }
          .cls-1, .cls-2 {
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 4.28px;
          }
          .cls-2 {
            stroke: #000;
            stroke-opacity: 0.5;
          }
          .cls-3 {
            stroke-width: 6.43px;
            stroke: url(#linear-gradient);
          }
          .cls-4 {
            fill: url(#linear-gradient-2);
          }
          `}
        </style>
        <linearGradient
          id="linear-gradient"
          x1="-171.23"
          y1="1076.5"
          x2="-120.88"
          y2="1076.5"
          gradientTransform="matrix(1, 0, 0, -1, 194, 1106)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e38b21" />
          <stop offset="1" stopColor="#ea5838" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="-157.24"
          y1="1075.49"
          x2="-133.12"
          y2="1075.49"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <path
        className="cls-1"
        d="M24,70.64a21.18,21.18,0,0,1,27-5.91,5.82,5.82,0,0,0,2.93.58C80.17,63.39,71.4,78,52,74.22"
      />
      <path
        className="cls-2"
        d="M24,70.64a21.18,21.18,0,0,1,27-5.91,5.82,5.82,0,0,0,2.93.58C80.17,63.39,71.4,78,52,74.22"
      />
      <path
        className="cls-1"
        d="M70.5,69.83l8.17-8.18a4.28,4.28,0,0,1,1.38-1,4.14,4.14,0,0,1,1.65-.35,4.26,4.26,0,0,1,1.66.31,4.36,4.36,0,0,1,1.41.94,4.26,4.26,0,0,1,0,6L72.53,79.87a15.07,15.07,0,0,1-10.63,4.4H37.64"
      />
      <path
        className="cls-2"
        d="M70.5,69.83l8.17-8.18a4.28,4.28,0,0,1,1.38-1,4.14,4.14,0,0,1,1.65-.35,4.26,4.26,0,0,1,1.66.31,4.36,4.36,0,0,1,1.41.94,4.26,4.26,0,0,1,0,6L72.53,79.87a15.07,15.07,0,0,1-10.63,4.4H37.64"
      />
      <path
        className="cls-1"
        d="M19.26,70.38l-4.35,4.34a3.19,3.19,0,0,0,0,4.5L30,94.26a3.17,3.17,0,0,0,4.5,0l4.34-4.34a3.19,3.19,0,0,0,0-4.5l-15-15A3.17,3.17,0,0,0,19.26,70.38Z"
      />
      <path
        className="cls-2"
        d="M19.26,70.38l-4.35,4.34a3.19,3.19,0,0,0,0,4.5L30,94.26a3.17,3.17,0,0,0,4.5,0l4.34-4.34a3.19,3.19,0,0,0,0-4.5l-15-15A3.17,3.17,0,0,0,19.26,70.38Z"
      />
      <circle className="cls-3" cx="48.64" cy="29.5" r="24.69" />
      <path
        className="cls-4"
        d="M44.83,45.8V40.58l-3.64,2.48-1.76-2.61,5.4-3.69V33l-3.6,2.49-1.8-2.62,5.4-3.68V20.62H36.65v-5.4H59.44v5.4H51.21v4.15l3.9-2.7,1.8,2.61-5.7,3.9v3.81l3.86-2.65,1.8,2.61-5.66,3.86V45.8Z"
      />
    </svg>
  );
};

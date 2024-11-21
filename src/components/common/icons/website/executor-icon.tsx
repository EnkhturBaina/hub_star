import { SVGProps } from 'react';

export const ExecutorIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      {...props} // Spread props for flexibility
    >
      <defs>
        <style>
          {`
          .cls-1 {
            fill: none;
            stroke: #212529;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 4.1px;
          }
          .cls-2 {
            fill: url(#linear-gradient);
          }
          .cls-3 {
            fill: url(#linear-gradient-2);
          }
          `}
        </style>
        <linearGradient
          id="linear-gradient"
          x1="1.68"
          y1="730.57"
          x2="46.02"
          y2="730.57"
          gradientTransform="matrix(1, 0, 0, -1, 24.94, 760.71)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e38b21" />
          <stop offset="1" stopColor="#ea5838" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="38.17"
          y1="28.04"
          x2="60.63"
          y2="28.04"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <path
        className="cls-1"
        d="M25.16,71A20.25,20.25,0,0,1,51,65.31a5.63,5.63,0,0,0,2.8.55C78.84,64,70.46,78,51.87,74.38"
      />
      <path
        className="cls-1"
        d="M69.6,70.19l7.81-7.82a4.1,4.1,0,0,1,1.33-.93,4,4,0,0,1,1.57-.33,3.91,3.91,0,0,1,1.59.3,4.19,4.19,0,0,1,1.34.89,4.07,4.07,0,0,1,0,5.77L71.54,79.78A14.4,14.4,0,0,1,61.38,84H38.19"
      />
      <path
        className="cls-1"
        d="M20.61,70.71l-4.16,4.15a3.05,3.05,0,0,0,0,4.3L30.84,93.54a3,3,0,0,0,4.3,0l4.15-4.15a3,3,0,0,0,0-4.3L24.91,70.71A3,3,0,0,0,20.61,70.71Z"
      />
      <path
        className="cls-2"
        d="M59.7,5.57H39.11c-8.95,0-14.28,5.32-14.28,14.27V40.43c0,6.91,3.17,11.64,8.76,13.44a16.67,16.67,0,0,0,5.52.84H59.7a16.79,16.79,0,0,0,5.54-.84C70.81,52.07,74,47.34,74,40.43V19.84C74,10.89,68.65,5.57,59.7,5.57ZM70.29,40.43c0,5.25-2.05,8.58-6.22,10-2.38-4.7-8-8-14.66-8s-12.26,3.32-14.67,8h0c-4.1-1.32-6.2-4.67-6.2-9.92V19.84c0-6.93,3.66-10.59,10.59-10.59H59.7c6.93,0,10.59,3.66,10.59,10.59Z"
      />
      <path
        className="cls-3"
        d="M60.63,25.93a1.39,1.39,0,0,1-1.39,1.4h0c0,.25,0,.51,0,.75v.66a9.83,9.83,0,1,1-19.66,0v-.66a6.39,6.39,0,0,1,0-.75h0a1.4,1.4,0,0,1-1.41-1.4,1.41,1.41,0,0,1,1.41-1.41h.72A9.15,9.15,0,0,1,48,19V18.9a1.4,1.4,0,1,1,2.8,0V19a9.15,9.15,0,0,1,7.71,5.57h.73A1.4,1.4,0,0,1,60.63,25.93Z"
      />
    </svg>
  );
};

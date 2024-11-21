import { SVGProps } from 'react';

export const TransportationIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      {...props} // Spread props for dynamic attributes
    >
      <defs>
        <style>
          {`
          .cls-1 {
            fill: none;
            stroke: #212529;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 4.33px;
          }
          .cls-2 {
            fill: url(#linear-gradient);
          }
          .cls-3 {
            fill: url(#linear-gradient-2);
          }
          .cls-4 {
            fill: url(#linear-gradient-3);
          }
          .cls-5 {
            fill: url(#linear-gradient-4);
          }
          .cls-6 {
            fill: url(#linear-gradient-5);
          }
          .cls-7 {
            fill: url(#linear-gradient-6);
          }
          `}
        </style>
        <linearGradient
          id="linear-gradient"
          x1="15.87"
          y1="42.21"
          x2="27.74"
          y2="42.21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e38b21" />
          <stop offset="1" stopColor="#ea5838" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="44.22"
          y1="42.21"
          x2="56.09"
          y2="42.21"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-3"
          x1="68.3"
          y1="42.21"
          x2="80.17"
          y2="42.21"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-4"
          x1="12.31"
          y1="24.96"
          x2="59.4"
          y2="24.96"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-5"
          x1="61.53"
          y1="19.63"
          x2="80.35"
          y2="19.63"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-6"
          x1="61.53"
          y1="33.59"
          x2="85.07"
          y2="33.59"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <path
        className="cls-1"
        d="M22.32,64.93a22.55,22.55,0,0,1,28.79-6.29,6.36,6.36,0,0,0,3.12.62c27.91-2,18.57,13.5-2.15,9.49"
      />
      <path
        className="cls-1"
        d="M71.84,64.08l8.71-8.72A4.48,4.48,0,0,1,83.78,54a4.64,4.64,0,0,1,1.77.33,4.44,4.44,0,0,1,1.49,1,4.53,4.53,0,0,1,0,6.43l-13,13a16,16,0,0,1-11.32,4.69H36.84"
      />
      <path
        className="cls-1"
        d="M17.24,64.65l-4.62,4.63a3.39,3.39,0,0,0,0,4.8l16,16a3.39,3.39,0,0,0,4.8,0l4.63-4.62a3.4,3.4,0,0,0,0-4.8l-16-16A3.4,3.4,0,0,0,17.24,64.65Z"
      />
      <path className="cls-2" d="M27.74,42.22a6,6,0,1,1-.13-1.2A5.25,5.25,0,0,1,27.74,42.22Z" />
      <path className="cls-3" d="M56.09,42.22A6,6,0,1,1,56,41,5.25,5.25,0,0,1,56.09,42.22Z" />
      <path
        className="cls-4"
        d="M80.17,42.22a5.93,5.93,0,1,1-.12-1.2A5.93,5.93,0,0,1,80.17,42.22Z"
      />
      <path
        className="cls-5"
        d="M55.87,8.9h-40a3.54,3.54,0,0,0-3.53,3.53V37.49a3.58,3.58,0,0,0,1.31,2.75A8.41,8.41,0,0,1,30.13,41H41.82a8.41,8.41,0,0,1,16.46-1,3.52,3.52,0,0,0,1.12-2.57V12.43A3.53,3.53,0,0,0,55.87,8.9ZM50.62,29.46H29.39a1.21,1.21,0,0,1-1.22-1.2,1.22,1.22,0,0,1,1.22-1.21H50.62a1.22,1.22,0,0,1,1.2,1.21A1.2,1.2,0,0,1,50.62,29.46Zm0-5.31H19.28a1.2,1.2,0,0,1,0-2.4H50.62a1.2,1.2,0,1,1,0,2.4Zm0-5.44H33a1.19,1.19,0,0,1-1.2-1.2A1.21,1.21,0,0,1,33,16.3H50.62a1.22,1.22,0,0,1,1.2,1.21A1.2,1.2,0,0,1,50.62,18.71Z"
      />
      <polygon
        className="cls-6"
        points="80.35 23.76 61.53 23.76 61.53 15.51 73.62 15.51 80.35 23.76"
      />
      <path
        className="cls-7"
        d="M85.07,29.56v9.23A2.22,2.22,0,0,1,82.85,41h-.28a8.41,8.41,0,0,0-16.66,0H63.75a2.22,2.22,0,0,1-2.22-2.23V26.16H82.31Z"
      />
    </svg>
  );
};

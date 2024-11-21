import { SVGProps } from 'react';

export const MachineIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      {...props} // Spread props for customization
    >
      <title>Machine Icon</title>
      <defs>
        <style>
          {`
            .cls-1, .cls-2, .cls-4 { fill: none; }
            .cls-1, .cls-2, .cls-3, .cls-4 {
              stroke-linecap: round;
              stroke-linejoin: round;
            }
            .cls-1, .cls-2 { stroke-width: 5.86px; }
            .cls-1 { stroke: url(#linear-gradient); }
            .cls-2 { stroke: url(#linear-gradient-2); }
            .cls-3 { fill: #fafafa; }
            .cls-3, .cls-4 { stroke: #212529; stroke-width: 3.9px; }
          `}
        </style>
        <linearGradient
          id="linear-gradient"
          x1="-157.16"
          y1="121.3"
          x2="-141.85"
          y2="121.3"
          gradientTransform="matrix(1, 0, 0, -1, 194, 154.35)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e38b21" />
          <stop offset="1" stopColor="#ea5838" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="-175.52"
          y1="121.3"
          x2="-124.45"
          y2="121.3"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <path
        className="cls-1"
        d="M44.71,41.53a8.49,8.49,0,1,0-8.49-8.48A8.47,8.47,0,0,0,44.71,41.53Z"
      />
      <path
        className="cls-2"
        d="M16.42,35.53v-5a5.39,5.39,0,0,1,5.38-5.38c5.11,0,7.21-3.62,4.63-8.06a5.37,5.37,0,0,1,2-7.32L33.31,7a4.72,4.72,0,0,1,6.45,1.69l.31.54c2.54,4.44,6.73,4.44,9.3,0l.31-.54A4.72,4.72,0,0,1,56.13,7L61,9.8a5.37,5.37,0,0,1,2,7.32c-2.58,4.44-.49,8.06,4.63,8.06A5.39,5.39,0,0,1,73,30.56v5a5.39,5.39,0,0,1-5.38,5.38c-5.12,0-7.21,3.62-4.63,8.06a5.36,5.36,0,0,1-2,7.32l-4.9,2.81a4.74,4.74,0,0,1-6.45-1.7l-.31-.54c-2.54-4.44-6.73-4.44-9.3,0l-.31.54a4.74,4.74,0,0,1-6.45,1.7l-4.9-2.81a5.37,5.37,0,0,1-2-7.32c2.58-4.44.48-8.06-4.63-8.06A5.39,5.39,0,0,1,16.42,35.53Z"
      />
      <path
        className="cls-3"
        d="M81.92,62.14a3.87,3.87,0,0,0-2-.59,3.86,3.86,0,0,0-4,3.85V61.46a3.86,3.86,0,0,0-7.71,0V58a3.85,3.85,0,0,0-7.7,0V43.91a3.86,3.86,0,1,0-7.71,0V70.07h0l-7.23-7.22a3.71,3.71,0,0,0-1.17-1A3.76,3.76,0,0,0,43,61.47a3.82,3.82,0,0,0-1.5.15,4,4,0,0,0-1.32.72A3.8,3.8,0,0,0,38.82,65a3.79,3.79,0,0,0,.16,1.5,3.93,3.93,0,0,0,.71,1.32L52.46,87.16a14.42,14.42,0,0,0,25.91-3.93l5-16.8a3.76,3.76,0,0,0,0-2.39A3.9,3.9,0,0,0,81.92,62.14Z"
      />
      <path className="cls-4" d="M60.59,58v5.15" />
      <path className="cls-4" d="M68.29,61.46v4.67" />
      <path className="cls-4" d="M76,65.4v3.26" />
    </svg>
  );
};

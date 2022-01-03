import React from "react";

interface Props {
  className?: string;
}

export const SunnyIcon = ({ ...rest }: Props) => {
  return (
    <svg
      {...rest}
      width="128"
      height="128"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M126.715 64.4451C126.715 99.3755 98.3889 127.702 63.4585 127.702C28.528 127.702 0.201836 99.3755 0.201836 64.4451C0.201836 29.5147 28.528 1.18854 63.4585 1.18854C98.3889 1.18854 126.715 29.5147 126.715 64.4451V64.4451Z"
        fill="#F8FF00"
      />
    </svg>
  );
};


 export const NightIcon = ({ ...rest }: Props) => {
  return (
    <svg
      {...rest}
      width={128}
      height={128}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M128 92.31C116.43 113.57 93.96 128 68.08 128C30.46 128 0 97.54 0 59.92C0 34.04 14.43 11.57 35.69 0C30.51 9.64 27.54 20.65 27.54 32.39C27.54 70 58 100.46 95.61 100.46C107.35 100.46 118.36 97.49 128 92.31V92.31Z"
        fill="white"
      />
    </svg>
  );
};

import { ReactNode } from "react";

export const CustomButton = ({
  children,
  disabled,
  onClick,
  bgColor,
}: {
  children: ReactNode | JSX.Element;
  disabled: boolean;
  onClick: () => void;
  bgColor?: string;
}) => (
  <button
    className={`px-2 py-1 ${
      bgColor ?? "bg-yellow-500"
    } text-white rounded mr-2 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

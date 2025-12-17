import {ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary-green"
    | "primary-black"
    | "secondary-outline"
    | "secondary-green-border";
  fullWidth?: boolean;
  wide?: boolean;
  xl?: boolean;
  xxl?: boolean;
}

export default function Button({
  children,
  variant = "primary-green",
  fullWidth = false,
  wide = false,
  xl = false,
  xxl = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    fullWidth && "btn-full",
    wide && "btn-wide",
    xl && "btn-xl",
    xxl && "btn-xxl",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      <div className="btn-base">{children}</div>
    </button>
  );
}

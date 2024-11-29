"use client";
import { Button } from "./ui/button";
type Props = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  onClick?: () => {};
  classes?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function CustomBtn({
  variant,
  size,
  classes,
  onClick,
  children,
  disabled,
}: Props) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`${classes}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
    // <AnimatedBorderButton>Book now</AnimatedBorderButton>
  );
}

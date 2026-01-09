import classNames from "classnames";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function Button({ fullWidth = false, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={
        classNames(
          "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          { "w-full": fullWidth },
          className
        )}
      {...props}
    />
  );
}
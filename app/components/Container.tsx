import classNames from "classnames";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
  fluid?: boolean;
}

export default function Container({ children, fluid = false, className, ...rest }: ContainerProps) {
  return (
    <div className={
      classNames(
        fluid
          ? "container-fluid"
          : "container mx-auto",
          "px-16",
        className
      )}
      {...rest}>
      {children}
    </div>
  );
}
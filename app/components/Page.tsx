import classNames from "classnames";
import React from "react";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  shouldSnap?: boolean;
  snapEnd?: boolean;
}

const Page = ({ children, className = "", shouldSnap = true, snapEnd = false, ...rest }: PageProps) => {
  return (
    <div
      data-page
      className={classNames(
        'min-h-screen w-full py-20',
        {
          'snap-start': shouldSnap && !snapEnd,
          'snap-end': shouldSnap && snapEnd,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Page;
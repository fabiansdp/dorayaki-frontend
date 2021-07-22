import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

interface Props {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = ({
  children,
  title,
}) => {

  if (!title) {
    title = "Dorayaki";
  } else {
    title = title + " | Dorayaki";
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <div className="p-5">
        {children}
      </div>
    </>
  );
};

export default Layout;
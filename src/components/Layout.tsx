import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-indigo-50 py-6 text-center text-sm text-indigo-600">
        <div className="container-custom">
          <p>
            * Rates and terms depend on credit score and other factors.
            <br />† While next day funding is available for most loans, timing may vary.
            <br />¹ Checking your rate generates a soft credit inquiry, which doesn't affect your credit score.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} PeakLoan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

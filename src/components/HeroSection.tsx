import React from "react";
import { LockIcon } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Personal loans with
              <br />
              <span className="relative">
                low fixed rates
                <span className="text-xl absolute top-0 -right-6">*</span>
              </span>
            </h1>
            <p className="text-lg mb-6">
              Next day funding
              <span className="text-sm align-top">†</span> with no hidden fees.{" "}
              <span className="italic">Ever.</span>
            </p>
            <Link
              to="/check-rate"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded transition-colors w-full md:w-auto text-center"
            >
              Check your rate
            </Link>
            <p className="mt-4 flex items-center text-sm text-gray-600">
              <LockIcon className="h-4 w-4 mr-2" />
              Won't affect your credit score
              <span className="text-xs align-top">1</span>
            </p>
            <div className="mt-6">
              <a
                href="#trustpilot"
                className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors underline"
              >
                Trustpilot rating.
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-indigo-100 rounded-xl p-4 relative">
              <img
                src="/lovable-uploads/loan2.jpg"
                alt="Person using phone for loans"
                className="w-full h-auto object-contain rounded-lg"
              />
              <div className="absolute top-8 right-12">
                <div className="bg-white rounded-lg p-2 shadow-md border border-gray-100">
                  <div className="flex items-center">
                    <div className="bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-1">
                      1
                    </div>
                    <div className="text-xs font-semibold text-indigo-600">
                      PERSONAL
                      <br />
                      LOAN
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    lendingTree
                    <span className="text-xs">®</span>
                  </div>
                  <div className="text-[10px] text-gray-400">Q2 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

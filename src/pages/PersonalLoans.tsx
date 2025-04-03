
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LockIcon, User } from "lucide-react";

const PersonalLoans = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                Personal loans to help you
                <br />
                <span className="relative">
                  meet your goals
                  <span className="text-xl absolute top-0 -right-6">*</span>
                </span>
              </h1>
              <p className="text-lg mb-6">
                Borrow $1,000 - $50,000 with fixed rates from 7.99% - 35.99% APR
                <span className="text-sm align-top">*</span>
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
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Why choose PeakLoan for a personal loan?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-indigo-600 mr-3 mt-1">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <strong>Fast funding</strong>
                      <p className="text-sm text-gray-600">
                        Most loans receive same-day or next-day funding after approval†
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-indigo-600 mr-3 mt-1">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <strong>No hidden fees</strong>
                      <p className="text-sm text-gray-600">
                        No prepayment penalties or hidden fees
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-indigo-600 mr-3 mt-1">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <strong>Simple online process</strong>
                      <p className="text-sm text-gray-600">
                        Apply online and get your funds quickly
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalLoans;

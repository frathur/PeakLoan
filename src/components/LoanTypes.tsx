
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, User, Car, Clock, Home } from "lucide-react";

interface LoanCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const LoanCard = ({ title, description, icon, link }: LoanCardProps) => {
  return (
    <div className="loan-card">
      <div className="text-teal-600 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
      <Link
        to={link}
        className="flex items-center text-teal-600 font-medium mt-2 text-sm"
      >
        Learn more <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

const LoanTypes = () => {
  return (
    <div className="bg-teal-600 py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">
            Explore more loan types
          </h2>
          <div>
            <Link
              to="/mail-offer"
              className="text-white hover:underline font-medium"
            >
              Have a mail offer code?
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LoanCard
            title="Personal loans"
            description="Consolidate debt and more"
            icon={<User className="h-6 w-6" />}
            link="/personal-loans"
          />
          <LoanCard
            title="Car loan refinance"
            description="Swap your car loan and save"
            icon={<Car className="h-6 w-6" />}
            link="/car-loan-refinance"
          />
          <LoanCard
            title="Short-term relief"
            description="For everyday bills & expenses"
            icon={<Clock className="h-6 w-6" />}
            link="/short-term-relief"
          />
          <LoanCard
            title="HELOC"
            description="Home equity line of credit"
            icon={<Home className="h-6 w-6" />}
            link="/heloc"
          />
        </div>
      </div>
    </div>
  );
};

export default LoanTypes;

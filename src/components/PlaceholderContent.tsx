
import React from "react";
import { Link } from "react-router-dom";

interface PlaceholderContentProps {
  title: string;
  description: string;
  linkText?: string;
  linkTo?: string;
}

const PlaceholderContent = ({ 
  title, 
  description, 
  linkText = "Check your rate", 
  linkTo = "/check-rate" 
}: PlaceholderContentProps) => {
  return (
    <div className="py-16">
      <div className="container-custom text-center">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
        <Link
          to={linkTo}
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded transition-colors"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default PlaceholderContent;

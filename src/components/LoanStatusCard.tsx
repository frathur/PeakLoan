import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LoanStatusCard = ({ status, onClose }) => {
  const isApproved = status === "Approved";
  
  return (
    <Card 
      className="w-full max-w-md mx-auto shadow-lg border-t-4 overflow-hidden transition-all duration-300 transform hover:scale-105"
      style={{ borderTopColor: isApproved ? '#4f46e5' : '#ef4444' }} // Approved: indigo-600, Rejected: red
    >
      <CardHeader className={`text-center ${isApproved ? 'bg-indigo-50' : 'bg-red-50'}`}>
        <CardTitle className="flex flex-col items-center justify-center space-y-2">
          {isApproved ? (
            <CheckCircle size={64} className="text-indigo-500" />
          ) : (
            <AlertCircle size={64} className="text-red-500" />
          )}
          <span className={`text-2xl font-bold ${isApproved ? 'text-indigo-700' : 'text-red-700'}`}>
            Loan {status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="text-center mb-6">
          {isApproved ? (
            <div className="space-y-3">
              <p className="text-gray-700">Congratulations! Your loan application has been approved.</p>
              <p className="text-sm text-gray-600">Our representative will contact you shortly with the next steps.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-700">We're sorry, your loan application was not approved at this time.</p>
              <p className="text-sm text-gray-600">Consider improving your credit score or adjusting your loan requirements.</p>
            </div>
          )}
        </div>
        <div className="flex justify-center space-x-3">
          {isApproved && (
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Continue Application
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={onClose}
            className={`border ${isApproved ? 'border-indigo-200 text-indigo-700' : 'border-red-200 text-red-700'}`}
          >
            {isApproved ? "View Details" : "Try Again"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanStatusCard;

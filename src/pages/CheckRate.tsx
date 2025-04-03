import React, { useState, useEffect, KeyboardEvent } from "react";
import Layout from "../components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";  // Added this import
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  no_of_dependents: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid number of dependents")),
  education: z.preprocess((val) => Number(val), z.number()),
  self_employed: z.preprocess((val) => Number(val), z.number()),
  income_annum: z.preprocess((val) => Number(val) || 0, z.number().positive("Income must be positive")),
  loan_amount: z.preprocess((val) => Number(val) || 0, z.number().positive("Loan amount must be positive")),
  loan_term: z.preprocess((val) => Number(val) || 1, z.number().min(1, "Minimum term is 1 month").max(12, "Maximum term is 12 months")),
  cibil_score: z.preprocess((val) => Number(val) || 300, z.number().min(300, "Invalid CIBIL score").max(900, "Invalid CIBIL score")),
  residential_assets_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
  commercial_assets_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
  luxury_assets_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
  bank_asset_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
});

// Function to convert score to probability
const calculateProbability = (score) => {
  let probability = 0;
  
  if (score >= 750 && score <= 850) {
    // Excellent: 0.95 - 0.99
    probability = 0.95 + (score - 750) * (0.04 / 100);
  } else if (score >= 700 && score < 750) {
    // Good: 0.80 - 0.94
    probability = 0.80 + (score - 700) * (0.14 / 50);
  } else if (score >= 650 && score < 700) {
    // Fair: 0.50 - 0.79
    probability = 0.50 + (score - 650) * (0.29 / 50);
  } else if (score >= 300 && score < 650) {
    // Poor: 0.00 - 0.49
    probability = Math.max(0, (score - 300) * (0.49 / 350));
  }
  
  return Number(probability.toFixed(2));
};

// Function to normalize values to 0-1 range
const normalizeValue = (value, max = 100000) => {
  return Math.min(Number((value / max).toFixed(4)), 1);
};

// Function to normalize loan term (1-12 months) to 0-1 range
const normalizeLoanTerm = (months) => {
  return Number(((months - 1) / 11).toFixed(4));
};

// Loan Status Card Component with Modal Overlay
const LoanStatusCard = ({ status, onClose }) => {
  const isApproved = status === "Approved";
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 50);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Add delay for animation to complete before actual removal
    setTimeout(onClose, 300);
  };
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Blurred white background overlay */}
      <div 
        className="absolute inset-0 bg-white/80 backdrop-blur-sm" 
        onClick={handleClose}
      ></div>
      
      {/* Close button */}
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <X size={24} />
      </button>
      
      {/* Card content */}
      <Card 
        className={`w-full max-w-md mx-auto shadow-xl border-t-4 overflow-hidden transition-all duration-300 transform ${isVisible ? 'scale-100' : 'scale-90'} relative z-10`}
        style={{ borderTopColor: isApproved ? '#10b981' : '#ef4444' }}
      >
        <CardHeader className={`text-center ${isApproved ? 'bg-green-50' : 'bg-red-50'}`}>
          <CardTitle className="flex flex-col items-center justify-center space-y-2">
            {isApproved ? (
              <CheckCircle size={64} className="text-green-500" />
            ) : (
              <AlertCircle size={64} className="text-red-500" />
            )}
            <span className={`text-2xl font-bold ${isApproved ? 'text-green-700' : 'text-red-700'}`}>
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
              <Button className="bg-green-600 hover:bg-green-700">
                Continue Application
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={handleClose}
              className={`border ${isApproved ? 'border-green-200 text-green-700' : 'border-red-200 text-red-700'}`}>
              {isApproved ? "View Details" : "Try Again"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CheckRate = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayProbability, setDisplayProbability] = useState(0);
  const [displayValues, setDisplayValues] = useState({
    income: 0,
    loan: 0,
    term: 0,
    residential: 0,
    commercial: 0,
    luxury: 0,
    bank: 0
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_of_dependents: 0,  // Fixed the typo here from a0 to 0
      education: 0,
      self_employed: 0,
      income_annum: 0,
      loan_amount: 0,
      loan_term: 1,
      cibil_score: 300,
      residential_assets_value: 0,
      commercial_assets_value: 0,
      luxury_assets_value: 0,
      bank_asset_value: 0,
    },
  });

  // Update display values when form values change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'cibil_score') {
        const score = Number(value.cibil_score);
        setDisplayProbability(calculateProbability(score));
      }
      
      setDisplayValues({
        income: normalizeValue(value.income_annum),
        loan: normalizeValue(value.loan_amount),
        term: normalizeLoanTerm(value.loan_term),
        residential: normalizeValue(value.residential_assets_value),
        commercial: normalizeValue(value.commercial_assets_value),
        luxury: normalizeValue(value.luxury_assets_value),
        bank: normalizeValue(value.bank_asset_value)
      });
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Handle Enter key to move to next step
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    try {
      // Create a copy of values and normalize all numeric fields
      const formattedValues = {
        ...values,
        cibil_score: calculateProbability(values.cibil_score),
        income_annum: normalizeValue(values.income_annum),
        loan_amount: normalizeValue(values.loan_amount),
        loan_term: normalizeLoanTerm(values.loan_term),
        residential_assets_value: normalizeValue(values.residential_assets_value),
        commercial_assets_value: normalizeValue(values.commercial_assets_value),
        luxury_assets_value: normalizeValue(values.luxury_assets_value),
        bank_asset_value: normalizeValue(values.bank_asset_value)
      };
      
      console.log("Original values:", values);
      console.log("Normalized Payload:", formattedValues);
      
      const response = await axios.post("https://upstart01.onrender.com/predict", JSON.stringify(formattedValues), {
        headers: { "Content-Type": "application/json" },
      });
      setPrediction(response.data.loan_status);
      toast({ title: "Prediction Success", description: `Loan: ${response.data.loan_status}` });
    } catch (error) {
      console.error("Prediction failed", error);
      setError("Failed to get prediction. Try again.");
    }
    setLoading(false);
  };

  const steps = [
    { name: "no_of_dependents", label: "Number of Dependents", type: "number" },
    { 
      name: "education", 
      label: "Education Level", 
      options: [
        { label: "Not Graduate", value: "0" },
        { label: "Graduate", value: "1" }
      ], 
      type: "number" 
    },
    { 
      name: "self_employed", 
      label: "Self Employed", 
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "1" }
      ], 
      type: "number"
    },
    { 
      name: "income_annum", 
      label: "Annual Income ($)", 
      type: "number",
      max: 100000,
      info: "Will be normalized to a 0-1 scale (max: $100,000)"
    },
    { 
      name: "loan_amount", 
      label: "Loan Amount ($)", 
      type: "number",
      max: 100000,
      info: "Will be normalized to a 0-1 scale (max: $100,000)"
    },
    { 
      name: "loan_term", 
      label: "Loan Term (1-12 months)", 
      type: "number",
      min: 1,
      max: 12,
      info: "Will be normalized to a 0-1 scale"
    },
    { 
      name: "cibil_score", 
      label: "Credit Score (300-900)", 
      type: "number",
      min: 300,
      max: 900,
      info: "750-850: Excellent, 700-749: Good, 650-699: Fair, Below 650: Poor"
    },
    { 
      name: "residential_assets_value", 
      label: "Residential Assets Value ($)", 
      type: "number",
      max: 100000,
      info: "Will be normalized to a 0-1 scale (max: $100,000)"
    },
    { 
      name: "commercial_assets_value", 
      label: "Commercial Assets Value ($)", 
      type: "number",
      max: 100000,
      info: "Will be normalized to a 0-1 scale (max: $100,000)"
    },
    { 
      name: "luxury_assets_value", 
      label: "Luxury Assets Value ($)", 
      type: "number",
      max: 100000,
      info: "Will be normalized to a 0-1 scale (max: $100,000)"
    },
    { 
      name: "bank_asset_value", 
      label: "Bank Asset Value ($)", 
      type: "number",
      max: 100000,
      info: "Will be normalized to a 0-1 scale (max: $100,000)"
    },
  ];

  return (
    <Layout>
      <div className="py-8 md:py-16">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Check your loan rate</h1>
          <div className="bg-white shadow-md rounded-xl p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-6">
                {steps.filter((_, index) => index === step).map((stepItem) => (
                  <FormField
                    key={stepItem.name}
                    control={form.control}
                    name={stepItem.name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{stepItem.label}</FormLabel>
                        {stepItem.options ? (
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(Number(value));
                            }} 
                            value={String(field.value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {stepItem.options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <>
                            <Input 
                              type={stepItem.type} 
                              {...field} 
                              min={stepItem.min} 
                              max={stepItem.max}
                            />
                            {stepItem.name === 'cibil_score' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayProbability.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                            {stepItem.name === 'income_annum' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayValues.income.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                            {stepItem.name === 'loan_amount' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayValues.loan.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                            {stepItem.name === 'loan_term' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayValues.term.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                            {stepItem.name === 'residential_assets_value' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayValues.residential.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                            {stepItem.name === 'commercial_assets_value' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayValues.commercial.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                            {stepItem.name === 'luxury_assets_value' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayValues.luxury.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                            {stepItem.name === 'bank_asset_value' && (
                              <div className="mt-2 text-sm">
                                <div className="font-medium">Normalized Value: {displayValues.bank.toFixed(4)}</div>
                                <div className="text-gray-500">{stepItem.info}</div>
                              </div>
                            )}
                          </>
                        )}
                      </FormItem>
                    )}
                  />
                ))}
                <div className="flex justify-between">
                  {step > 0 && <Button type="button" onClick={() => setStep(step - 1)}>Previous</Button>}
                  {step < steps.length - 1 ? (
                    <Button type="button" onClick={() => setStep(Math.min(step + 1, steps.length - 1))} className="bg-teal-500">Next</Button>
                  ) : (
                    <Button type="submit" disabled={loading} className="bg-teal-500">{loading ? "Loading..." : "Check Rate"}</Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {/* Modal renders at the portal root level */}
      {prediction && (
        <LoanStatusCard 
          status={prediction} 
          onClose={() => {
            setPrediction(null);
            setStep(0);
            form.reset();
          }} 
        />
      )}
    </Layout>
  );
};

export default CheckRate;
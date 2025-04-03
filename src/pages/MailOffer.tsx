import React, { useState } from "react";
import Layout from "../components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  no_of_dependents: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid number of dependents")),
  education: z.preprocess((val) => Number(val), z.number()),
  self_employed: z.preprocess((val) => Number(val), z.number()),
  income_annum: z.preprocess((val) => Number(val) || 0, z.number().positive("Income must be positive")),
  loan_amount: z.preprocess((val) => Number(val) || 0, z.number().positive("Loan amount must be positive")),
  loan_term: z.preprocess((val) => Number(val) || 12, z.number().positive("Loan term must be positive")),
  cibil_score: z.preprocess((val) => Number(val) || 300, z.number().min(300, "Invalid CIBIL score").max(900, "Invalid CIBIL score")),
  residential_assets_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
  commercial_assets_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
  luxury_assets_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
  bank_asset_value: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Invalid asset value")),
});

const CheckRate = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       no_of_dependents: 0,
       education: 0,
       self_employed: 0,
       income_annum: 0,
       loan_amount: 0,
       loan_term: 12,
       cibil_score: 300,
       residential_assets_value: 0,
       commercial_assets_value: 0,
       luxury_assets_value: 0,
       bank_asset_value: 0,
     },
   });
 

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://upstart01.onrender.com/predict",
        values,
        { headers: { "Content-Type": "application/json" } }
      );
      setPrediction(response.data.loan_status);
      toast({ title: "Prediction Success", description: `Prediction: ${response.data.loan_status}` });
    } catch (error) {
      console.error("Prediction failed", error);
      setError("Failed to get prediction. Try again.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="py-8 md:py-16">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Check your loan rate</h1>
          <div className="bg-white shadow-md rounded-xl p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {Object.keys(formSchema.shape).map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{field.name.replace(/_/g, " ")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={`Enter ${field.name.replace(/_/g, " ")}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit" disabled={loading} className="bg-indigo-500 text-white w-full">
                  {loading ? "Processing..." : "Check Your Rate"}
                </Button>
              </form>
            </Form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {prediction && <p className="text-lg font-semibold text-center mt-4">Prediction: {prediction}</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckRate;

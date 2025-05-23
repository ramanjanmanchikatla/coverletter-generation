import React from "react";
import { cn } from "@/lib/utils";

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  // Generate an array from 1 to totalSteps
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center w-full mb-6">
      {steps.map((step) => (
        <div key={step} style={{ display: 'contents' }}>
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                step < currentStep
                  ? "bg-primary text-primary-foreground" // Completed step
                  : step === currentStep
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20" // Current step
                  : "bg-secondary text-secondary-foreground" // Future step
              )}
            >
              {step < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            <span className="text-xs font-medium mt-1">
              {step === 1
                ? "Name"
                : step === 2
                ? "Company"
                : step === 3
                ? "Role"
                : "Details"}
            </span>
          </div>

          {/* Connector line */}
          {step < totalSteps && (
            <div
              className={cn(
                "flex-1 h-1 mx-2",
                step < currentStep
                  ? "bg-primary" // Completed connector
                  : "bg-secondary" // Future connector
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormStepIndicator;

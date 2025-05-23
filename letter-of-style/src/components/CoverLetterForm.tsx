import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import FormStepIndicator from "./FormStepIndicator";
import { ArrowLeft, ArrowRight, FileText, Send, Download, Eye } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import jsPDF from "jspdf";

interface FormData {
  name: string;
  company: string;
  role: string;
  additionalInfo: string;
}

interface CoverLetterResponse {
  coverLetter: string;
  output?: string;
}

const CoverLetterForm: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    role: "",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [coverLetterResult, setCoverLetterResult] = useState<string | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  
  // Updated webhook URL
  const WEBHOOK_URL = "https://n8n-bnap.onrender.com/webhook/0fca86f4-685d-4de3-be7e-b1dbfb22659b";
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Name is required";
          isValid = false;
        }
        break;
      case 2:
        if (!formData.company.trim()) {
          newErrors.company = "Company name is required";
          isValid = false;
        }
        break;
      case 3:
        if (!formData.role.trim()) {
          newErrors.role = "Role is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for this field when user types
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    setIsSubmitting(true);
    
    try {
      // Send data to n8n webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Try to parse the response as JSON
      let coverLetterContent = "";
      try {
        const responseData = await response.json() as CoverLetterResponse;
        
        // Check for different response formats - either coverLetter or output property
        if (responseData.coverLetter) {
          coverLetterContent = responseData.coverLetter;
        } else if (responseData.output) {
          coverLetterContent = responseData.output;
        } else {
          // If neither expected property exists
          coverLetterContent = "Thank you for your submission. Your cover letter is being generated and will be available shortly.";
        }
        
        setCoverLetterResult(coverLetterContent);
      } catch (parseError) {
        // If response is not JSON, use the text
        const textResponse = await response.text();
        setCoverLetterResult(textResponse || "Cover letter request received. Processing your request.");
      }
      
      toast({
        title: "Cover letter request submitted!",
        description: "View your generated cover letter.",
      });
      
      // Open the result sheet
      setIsResultOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseResult = () => {
    setIsResultOpen(false);
  };

  const handleNewLetter = () => {
    setCoverLetterResult(null);
    setIsResultOpen(false);
    // Reset form
    setFormData({
      name: "",
      company: "",
      role: "",
      additionalInfo: "",
    });
    setStep(1);
  };

  const handleDownload = () => {
    if (!coverLetterResult) return;
    
    // Create PDF document
    const doc = new jsPDF();
    
    // Get the actual cover letter content
    const coverLetterText = coverLetterResult;
    
    // Add the cover letter content
    const splitText = doc.splitTextToSize(coverLetterText, 180);
    
    // Add header with user and job details
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.setFontSize(12);
    doc.text(formData.name, 20, 20);
    doc.text(currentDate, 20, 30);
    doc.text(`Application for ${formData.role} position at ${formData.company}`, 20, 40);
    doc.text("", 20, 50); // Empty line as spacer
    
    // Add the main content with proper spacing
    doc.setFontSize(11);
    doc.text(splitText, 20, 60);
    
    // Save the PDF
    const fileName = `Cover_Letter_${formData.company}_${formData.role}.pdf`;
    doc.save(fileName);
    
    toast({
      title: "Cover letter downloaded",
      description: `Saved as ${fileName}`,
    });
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-2">
              <Label htmlFor="name">Your Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                )}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              This will be used in your cover letter signature and header.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Corporation"
                value={formData.company}
                onChange={handleChange}
                className={cn(
                  errors.company ? "border-destructive focus-visible:ring-destructive" : ""
                )}
              />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              The company you're applying to work at.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-2">
              <Label htmlFor="role">Job Role</Label>
              <Input
                id="role"
                name="role"
                placeholder="Software Engineer"
                value={formData.role}
                onChange={handleChange}
                className={cn(
                  errors.role ? "border-destructive focus-visible:ring-destructive" : ""
                )}
              />
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              The position you're applying for.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Share relevant experience, skills, or why you're interested in this role..."
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={6}
                className="resize-none"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Include any specific achievements, skills, or information you'd like to highlight in your cover letter.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Cover Letter Generator</CardTitle>
          </div>
          <CardDescription>
            Fill in the details to generate a personalized cover letter for your job application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormStepIndicator currentStep={step} totalSteps={4} />
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {renderStep()}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1 || isSubmitting}
            className="w-28"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {step < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="w-28"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e as any)}
              className="w-28"
            >
              {isSubmitting ? (
                <div className="animate-pulse">Processing...</div>
              ) : (
                <>
                  Submit <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Cover Letter Result Sheet */}
      <Sheet open={isResultOpen} onOpenChange={setIsResultOpen}>
        <SheetContent className="w-full md:max-w-xl overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Your Cover Letter</SheetTitle>
            <SheetDescription>
              Generated for {formData.role} at {formData.company}
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={togglePreviewMode}
              className="flex items-center"
            >
              <Eye className="mr-2 h-4 w-4" />
              {isPreviewMode ? "View Raw Text" : "View Preview"}
            </Button>
          </div>
          
          {isPreviewMode ? (
            <div className="bg-white border rounded-md shadow-sm p-6 max-w-none">
              <div className="mb-8">
                <p className="font-semibold">{formData.name}</p>
                <p className="text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="mt-2">Application for {formData.role} position at {formData.company}</p>
              </div>
              
              <div className="prose prose-sm dark:prose-invert max-w-none font-serif">
                {coverLetterResult ? (
                  <div className="whitespace-pre-line">
                    {coverLetterResult}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p>Loading your cover letter...</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <p className="font-semibold">Sincerely,</p>
                <p className="mt-4">{formData.name}</p>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {coverLetterResult ? (
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                  {coverLetterResult}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p>Loading your cover letter...</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-end">
            <Button 
              variant="outline" 
              onClick={handleNewLetter}
              className="w-full sm:w-auto"
            >
              Create New Letter
            </Button>
            <Button 
              onClick={handleDownload} 
              disabled={!coverLetterResult}
              className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CoverLetterForm;

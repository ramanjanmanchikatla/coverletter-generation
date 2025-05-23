
import React from "react";
import { ArrowRight, Edit, Clock, Sparkles, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Edit className="h-10 w-10 text-primary" />,
      title: "Custom Content",
      description: "Personalized cover letters tailored to your specific skills, experience, and the job you're applying for.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Save Time",
      description: "Generate a professional cover letter in minutes, not hours. Focus on your job search, not writing.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Professional Results",
      description: "Stand out with perfectly formatted, compelling cover letters that highlight your strengths.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "ATS Friendly",
      description: "Our cover letters are designed to pass through Applicant Tracking Systems with flying colors.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Why Use Our Generator?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional, customized cover letters that make you stand out from the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#generate-now"
            className="inline-flex items-center text-primary hover:text-primary/90 font-medium"
          >
            Generate your cover letter now
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

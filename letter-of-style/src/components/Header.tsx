
import React from "react";
import { FileText } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-white bg-opacity-10 rounded-full backdrop-blur-sm">
            <FileText className="h-10 w-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Cover Letter Generator
          </h1>
          <p className="max-w-2xl text-lg text-white/90">
            Create a professional, personalized cover letter in minutes. Simply fill in your details and let us do the rest.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from "react";
import Header from "@/components/Header";
import CoverLetterForm from "@/components/CoverLetterForm";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section id="generate-now" className="py-12">
          <div className="container mx-auto px-4">
            <CoverLetterForm />
          </div>
        </section>
        
        <FeatureSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

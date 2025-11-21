import { Leaf } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-in fade-in zoom-in duration-500">
          <Leaf className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
          AI Plant Disease Detector
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Upload an image of your plant and get instant AI-powered disease detection with comprehensive treatment recommendations
        </p>
      </div>
    </section>
  );
};
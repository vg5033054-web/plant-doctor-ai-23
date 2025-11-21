import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { DiseaseResults } from "@/components/DiseaseResults";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DiseaseData {
  disease_detected: boolean;
  disease_name?: string;
  confidence?: number;
  description?: string;
  causes?: string;
  symptoms?: string;
  treatments?: string;
  home_remedies?: string;
  chemical_solutions?: string;
  prevention?: string;
  fertilizer_recommendations?: string;
  weather_precautions?: string;
  message?: string;
  general_care?: string;
  error?: string;
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiseaseData | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (imageData: string) => {
    setIsAnalyzing(true);
    setResults(null);

    try {
      console.log('Starting plant analysis...');
      
      const { data, error } = await supabase.functions.invoke('analyze-plant', {
        body: { image: imageData }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Analysis complete:', data);
      setResults(data);

      if (data.disease_detected) {
        toast({
          title: "Disease Detected",
          description: `Found: ${data.disease_name}`,
          variant: "destructive",
        });
      } else if (!data.error) {
        toast({
          title: "Analysis Complete",
          description: "Your plant looks healthy!",
        });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
      
      setResults({
        disease_detected: false,
        error: "Failed to analyze the image. Please try again or upload a different image."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ImageUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      {results && <DiseaseResults data={results} />}
      
      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by AI • Built with Lovable Cloud</p>
          <p className="mt-2">For educational purposes. Consult agricultural experts for serious plant health issues.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
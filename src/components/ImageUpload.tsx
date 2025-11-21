import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onAnalyze: (imageData: string) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onAnalyze, isAnalyzing }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setPreview(null);
  }, []);

  const startAnalysis = useCallback(() => {
    if (preview) {
      onAnalyze(preview);
    }
  }, [preview, onAnalyze]);

  return (
    <section className="max-w-2xl mx-auto px-4 py-8">
      <div
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
          isDragging
            ? 'border-primary bg-primary/5 scale-105'
            : preview
            ? 'border-border bg-card'
            : 'border-border hover:border-primary/50 bg-card'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="p-6">
            <div className="relative rounded-xl overflow-hidden bg-muted">
              <img
                src={preview}
                alt="Plant preview"
                className="w-full h-auto max-h-96 object-contain"
              />
              <button
                onClick={clearImage}
                className="absolute top-3 right-3 p-2 bg-background/90 rounded-full hover:bg-background transition-colors shadow-medium"
                disabled={isAnalyzing}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Button
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className="w-full mt-6 h-12 text-base font-semibold"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing plant...
                </>
              ) : (
                'Analyze Plant'
              )}
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-16 px-6 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Upload Plant Image
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Drag and drop or click to select
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG, WEBP (Max 10MB)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              disabled={isAnalyzing}
            />
          </label>
        )}
      </div>
    </section>
  );
};
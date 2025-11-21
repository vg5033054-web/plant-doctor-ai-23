import { AlertCircle, CheckCircle, Sprout, Droplets, Sun, Shield, FlaskConical, Home, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

interface DiseaseResultsProps {
  data: DiseaseData;
}

export const DiseaseResults = ({ data }: DiseaseResultsProps) => {
  if (data.error) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive mb-1">Error</h3>
                <p className="text-sm text-muted-foreground">{data.error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!data.disease_detected) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-success/50 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-success mb-2">Plant Appears Healthy!</h3>
                <p className="text-sm text-muted-foreground mb-3">{data.message}</p>
                {data.general_care && (
                  <div className="bg-background/50 p-4 rounded-lg border border-border">
                    <p className="text-sm">{data.general_care}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Disease Header */}
      <Card className="bg-gradient-accent shadow-large">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-8 h-8 text-accent-foreground" />
                <h2 className="text-3xl font-bold text-accent-foreground">
                  {data.disease_name}
                </h2>
              </div>
              {data.confidence && (
                <Badge variant="secondary" className="bg-background/20 text-accent-foreground">
                  {data.confidence}% Confidence
                </Badge>
              )}
            </div>
          </div>
          {data.description && (
            <>
              <Separator className="my-4 bg-accent-foreground/20" />
              <p className="text-accent-foreground/90 leading-relaxed">{data.description}</p>
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Causes & Spread */}
        {data.causes && (
          <Card className="shadow-medium hover:shadow-large transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Droplets className="w-5 h-5" />
                Causes & Spread
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.causes}</p>
            </CardContent>
          </Card>
        )}

        {/* Symptoms */}
        {data.symptoms && (
          <Card className="shadow-medium hover:shadow-large transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Leaf className="w-5 h-5" />
                Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.symptoms}</p>
            </CardContent>
          </Card>
        )}

        {/* Treatments */}
        {data.treatments && (
          <Card className="shadow-medium hover:shadow-large transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Sprout className="w-5 h-5" />
                Recommended Treatments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.treatments}</p>
            </CardContent>
          </Card>
        )}

        {/* Home Remedies */}
        {data.home_remedies && (
          <Card className="shadow-medium hover:shadow-large transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Home className="w-5 h-5" />
                Home Remedies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.home_remedies}</p>
            </CardContent>
          </Card>
        )}

        {/* Chemical Solutions */}
        {data.chemical_solutions && (
          <Card className="shadow-medium hover:shadow-large transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <FlaskConical className="w-5 h-5" />
                Chemical Solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.chemical_solutions}</p>
            </CardContent>
          </Card>
        )}

        {/* Prevention */}
        {data.prevention && (
          <Card className="shadow-medium hover:shadow-large transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-info">
                <Shield className="w-5 h-5" />
                Prevention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.prevention}</p>
            </CardContent>
          </Card>
        )}

        {/* Fertilizer Recommendations */}
        {data.fertilizer_recommendations && (
          <Card className="shadow-medium hover:shadow-large transition-shadow md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sprout className="w-5 h-5" />
                Fertilizer Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.fertilizer_recommendations}</p>
            </CardContent>
          </Card>
        )}

        {/* Weather Precautions */}
        {data.weather_precautions && (
          <Card className="shadow-medium hover:shadow-large transition-shadow md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <Sun className="w-5 h-5" />
                Weather-Based Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.weather_precautions}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
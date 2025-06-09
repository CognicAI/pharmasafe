
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, AlertTriangle, CheckCircle, XCircle, Search } from "lucide-react";
import { toast } from "sonner";

interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  description: string;
  clinicalEffects: string[];
  recommendations: string[];
  mechanism: string;
}

const DrugAnalysis = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [drugInput, setDrugInput] = useState("");
  const [patientId, setPatientId] = useState("");
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock drug database
  const drugDatabase = [
    "Lisinopril", "Metformin", "Atorvastatin", "Amlodipine", "Warfarin",
    "Aspirin", "Ibuprofen", "Omeprazole", "Levothyroxine", "Metoprolol",
    "Hydrochlorothiazide", "Simvastatin", "Losartan", "Gabapentin", "Sertraline"
  ];

  // Mock interaction data
  const mockInteractions: DrugInteraction[] = [
    {
      id: "1",
      drug1: "Lisinopril",
      drug2: "Amlodipine",
      severity: "moderate",
      description: "Both medications can lower blood pressure, potentially causing additive hypotensive effects.",
      clinicalEffects: ["Hypotension", "Dizziness", "Fainting"],
      recommendations: ["Monitor blood pressure closely", "Start with lower doses", "Educate patient on symptoms"],
      mechanism: "Additive pharmacodynamic effect on blood pressure reduction"
    },
    {
      id: "2",
      drug1: "Warfarin",
      drug2: "Aspirin",
      severity: "high",
      description: "Increased risk of bleeding when used together due to anticoagulant and antiplatelet effects.",
      clinicalEffects: ["Increased bleeding risk", "Bruising", "GI bleeding"],
      recommendations: ["Monitor INR closely", "Consider alternative therapy", "Educate on bleeding signs"],
      mechanism: "Synergistic anticoagulant and antiplatelet effects"
    },
    {
      id: "3",
      drug1: "Metformin",
      drug2: "Atorvastatin",
      severity: "low",
      description: "Generally safe combination but monitor for muscle-related side effects.",
      clinicalEffects: ["Muscle pain", "Weakness"],
      recommendations: ["Monitor creatine kinase", "Educate on muscle symptoms"],
      mechanism: "Potential additive muscle toxicity risk"
    }
  ];

  const addDrug = () => {
    if (drugInput && !selectedDrugs.includes(drugInput)) {
      setSelectedDrugs([...selectedDrugs, drugInput]);
      setDrugInput("");
    }
  };

  const removeDrug = (drug: string) => {
    setSelectedDrugs(selectedDrugs.filter(d => d !== drug));
  };

  const analyzeInteractions = async () => {
    if (selectedDrugs.length < 2) {
      toast.error("Please select at least 2 medications to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    // Mock analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock interaction detection
    const foundInteractions = mockInteractions.filter(interaction =>
      selectedDrugs.includes(interaction.drug1) && selectedDrugs.includes(interaction.drug2)
    );

    setInteractions(foundInteractions);
    setIsAnalyzing(false);
    
    if (foundInteractions.length === 0) {
      toast.success("No significant drug interactions detected");
    } else {
      toast.warning(`${foundInteractions.length} potential interaction(s) detected`);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'moderate': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drug Interaction Analysis</h1>
          <p className="text-gray-600">Analyze potential drug-drug interactions for patient safety</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analysis Input */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Medication Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="patient">Patient (Optional)</Label>
                  <Select value={patientId} onValueChange={setPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">John Doe (MRN001)</SelectItem>
                      <SelectItem value="2">Jane Smith (MRN002)</SelectItem>
                      <SelectItem value="3">Robert Johnson (MRN003)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="drug-input">Add Medication</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="drug-input"
                      value={drugInput}
                      onChange={(e) => setDrugInput(e.target.value)}
                      placeholder="Type medication name..."
                      list="drug-suggestions"
                    />
                    <Button onClick={addDrug} size="sm">
                      Add
                    </Button>
                  </div>
                  <datalist id="drug-suggestions">
                    {drugDatabase.map((drug) => (
                      <option key={drug} value={drug} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <Label>Selected Medications ({selectedDrugs.length})</Label>
                  <div className="space-y-2 mt-2">
                    {selectedDrugs.map((drug) => (
                      <div key={drug} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{drug}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeDrug(drug)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={analyzeInteractions}
                  disabled={isAnalyzing || selectedDrugs.length < 2}
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Interactions"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Analyzing drug interactions...</p>
                      <p className="text-sm text-gray-500 mt-2">Checking DrugBank database</p>
                    </div>
                  </div>
                ) : interactions.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {selectedDrugs.length < 2 ? "Ready to Analyze" : "No Interactions Found"}
                    </h3>
                    <p className="text-gray-600">
                      {selectedDrugs.length < 2 
                        ? "Add at least 2 medications to begin analysis"
                        : "No significant drug interactions detected for the selected medications"
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {interactions.map((interaction) => (
                      <div key={interaction.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getSeverityIcon(interaction.severity)}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {interaction.drug1} + {interaction.drug2}
                              </h3>
                              <Badge variant={getSeverityColor(interaction.severity)} className="mt-1">
                                {interaction.severity.toUpperCase()} Severity
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                            <p className="text-gray-700">{interaction.description}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Clinical Effects</h4>
                            <div className="flex flex-wrap gap-2">
                              {interaction.clinicalEffects.map((effect, index) => (
                                <Badge key={index} variant="outline">
                                  {effect}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {interaction.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Mechanism</h4>
                            <p className="text-gray-700">{interaction.mechanism}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DrugAnalysis;

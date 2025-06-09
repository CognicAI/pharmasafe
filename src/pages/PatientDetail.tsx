
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, User, Activity, AlertTriangle, Plus } from "lucide-react";

const PatientDetail = () => {
  const { id } = useParams();

  // Mock patient data
  const patient = {
    id: "1",
    name: "John Doe",
    age: 65,
    gender: "Male",
    mrn: "MRN001",
    dateOfBirth: "1959-03-15",
    address: "123 Main St, Anytown, NY 12345",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    conditions: ["Hypertension", "Type 2 Diabetes", "Hyperlipidemia"],
    allergies: ["Penicillin", "Sulfa drugs"],
    riskLevel: "high" as const,
    medications: [
      {
        id: "1",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        prescribedDate: "2024-01-15",
        prescribedBy: "Dr. Smith"
      },
      {
        id: "2",
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        prescribedDate: "2024-02-01",
        prescribedBy: "Dr. Johnson"
      },
      {
        id: "3",
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        prescribedDate: "2024-02-15",
        prescribedBy: "Dr. Smith"
      },
      {
        id: "4",
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        prescribedDate: "2024-03-01",
        prescribedBy: "Dr. Smith"
      }
    ],
    recentInteractions: [
      {
        id: "1",
        date: "2024-06-08",
        drugs: ["Lisinopril", "Amlodipine"],
        severity: "Moderate",
        description: "Potential additive hypotensive effects"
      },
      {
        id: "2",
        date: "2024-06-07",
        drugs: ["Metformin", "Atorvastatin"],
        severity: "Low",
        description: "Monitor for muscle-related side effects"
      }
    ]
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'destructive';
      case 'moderate': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/patients">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Patients
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <p className="text-gray-600">{patient.mrn}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link to="/analysis">
              <Button variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                Analyze Interactions
              </Button>
            </Link>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Patient Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                  <p className="text-gray-900">{patient.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Age</p>
                  <p className="text-gray-900">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Gender</p>
                  <p className="text-gray-900">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-gray-900">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{patient.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Risk Level</p>
                  <Badge variant={getSeverityColor(patient.riskLevel)} className="mt-1">
                    {patient.riskLevel} risk
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="mr-2 mb-2">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medications and Interactions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.medications.map((medication) => (
                    <div key={medication.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                          <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Prescribed: {medication.prescribedDate}</span>
                            </div>
                            <span>By: {medication.prescribedBy}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Recent Drug Interactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.recentInteractions.map((interaction) => (
                    <div key={interaction.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={getSeverityColor(interaction.severity)}>
                          {interaction.severity} Severity
                        </Badge>
                        <span className="text-sm text-gray-500">{interaction.date}</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-gray-900">Interacting Drugs:</p>
                          <p className="text-gray-600">{interaction.drugs.join(", ")}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Description:</p>
                          <p className="text-gray-600">{interaction.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetail;

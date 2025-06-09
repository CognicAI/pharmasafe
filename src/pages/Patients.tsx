
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Search, Plus, Users, Calendar, MapPin } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  conditions: string[];
  lastVisit: string;
  riskLevel: 'low' | 'medium' | 'high';
  medicationCount: number;
}

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockPatients: Patient[] = [
    {
      id: "1",
      name: "John Doe",
      age: 65,
      gender: "Male",
      mrn: "MRN001",
      conditions: ["Hypertension", "Diabetes"],
      lastVisit: "2024-06-08",
      riskLevel: "high",
      medicationCount: 8
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 42,
      gender: "Female",
      mrn: "MRN002",
      conditions: ["Anxiety", "Asthma"],
      lastVisit: "2024-06-07",
      riskLevel: "medium",
      medicationCount: 4
    },
    {
      id: "3",
      name: "Robert Johnson",
      age: 78,
      gender: "Male",
      mrn: "MRN003",
      conditions: ["Heart Disease", "COPD", "Arthritis"],
      lastVisit: "2024-06-06",
      riskLevel: "high",
      medicationCount: 12
    },
    {
      id: "4",
      name: "Mary Wilson",
      age: 35,
      gender: "Female",
      mrn: "MRN004",
      conditions: ["Migraine"],
      lastVisit: "2024-06-05",
      riskLevel: "low",
      medicationCount: 2
    },
    {
      id: "5",
      name: "David Brown",
      age: 58,
      gender: "Male",
      mrn: "MRN005",
      conditions: ["Depression", "High Cholesterol"],
      lastVisit: "2024-06-04",
      riskLevel: "medium",
      medicationCount: 6
    }
  ];

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-600">Manage patient profiles and medication histories</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add New Patient</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients by name, MRN, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{filteredPatients.length} patients</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <p className="text-sm text-gray-600">{patient.mrn}</p>
                    </div>
                  </div>
                  <Badge variant={getRiskColor(patient.riskLevel)}>
                    {patient.riskLevel} risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-medium">{patient.age} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="font-medium">{patient.gender}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Conditions</p>
                  <div className="flex flex-wrap gap-1">
                    {patient.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Last visit: {patient.lastVisit}</span>
                  </div>
                  <div className="text-gray-600">
                    {patient.medicationCount} medications
                  </div>
                </div>

                <Link to={`/patients/${patient.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Patients;


import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, Filter, Search, Eye } from "lucide-react";

interface Report {
  id: string;
  title: string;
  patient: string;
  mrn: string;
  generatedBy: string;
  generatedDate: string;
  type: 'interaction' | 'patient-summary' | 'audit' | 'medication-review';
  interactions: number;
  severity: 'low' | 'medium' | 'high';
  status: 'completed' | 'pending' | 'archived';
}

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const mockReports: Report[] = [
    {
      id: "RPT001",
      title: "Drug Interaction Analysis - Cardiovascular Medications",
      patient: "John Doe",
      mrn: "MRN001",
      generatedBy: "Dr. Sarah Smith",
      generatedDate: "2024-06-08",
      type: "interaction",
      interactions: 3,
      severity: "high",
      status: "completed"
    },
    {
      id: "RPT002",
      title: "Monthly Medication Review",
      patient: "Jane Smith",
      mrn: "MRN002",
      generatedBy: "Jennifer Jones",
      generatedDate: "2024-06-07",
      type: "medication-review",
      interactions: 1,
      severity: "medium",
      status: "completed"
    },
    {
      id: "RPT003",
      title: "Patient Safety Audit Report",
      patient: "Robert Johnson",
      mrn: "MRN003",
      generatedBy: "Dr. Sarah Smith",
      generatedDate: "2024-06-06",
      type: "audit",
      interactions: 5,
      severity: "high",
      status: "completed"
    },
    {
      id: "RPT004",
      title: "Comprehensive Patient Summary",
      patient: "Mary Wilson",
      mrn: "MRN004",
      generatedBy: "Jennifer Jones",
      generatedDate: "2024-06-05",
      type: "patient-summary",
      interactions: 0,
      severity: "low",
      status: "completed"
    },
    {
      id: "RPT005",
      title: "Drug Interaction Analysis - Psychiatric Medications",
      patient: "David Brown",
      mrn: "MRN005",
      generatedBy: "Dr. Sarah Smith",
      generatedDate: "2024-06-04",
      type: "interaction",
      interactions: 2,
      severity: "medium",
      status: "completed"
    }
  ];

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesSeverity = filterSeverity === "all" || report.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interaction': return 'default';
      case 'patient-summary': return 'secondary';
      case 'audit': return 'destructive';
      case 'medication-review': return 'outline';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'interaction': return 'Drug Interaction';
      case 'patient-summary': return 'Patient Summary';
      case 'audit': return 'Safety Audit';
      case 'medication-review': return 'Medication Review';
      default: return type;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and manage interaction analysis reports</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search reports by title, patient, MRN, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="interaction">Drug Interaction</SelectItem>
                    <SelectItem value="patient-summary">Patient Summary</SelectItem>
                    <SelectItem value="audit">Safety Audit</SelectItem>
                    <SelectItem value="medication-review">Medication Review</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span>{filteredReports.length} reports found</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <Badge variant={getTypeColor(report.type)}>
                        {getTypeLabel(report.type)}
                      </Badge>
                      <Badge variant={getSeverityColor(report.severity)}>
                        {report.severity.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Patient</p>
                        <p className="font-medium">{report.patient}</p>
                        <p className="text-gray-500">{report.mrn}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Generated By</p>
                        <p className="font-medium">{report.generatedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium">{report.generatedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Interactions Found</p>
                        <p className="font-medium">{report.interactions}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-gray-600 mb-4">
                No reports match your current search criteria.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterSeverity("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Reports;

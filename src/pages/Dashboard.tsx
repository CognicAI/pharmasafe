
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Activity, AlertTriangle, FileText, TrendingUp, Clock } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Patients",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Interactions Analyzed",
      value: "3,456",
      change: "+8%",
      icon: Activity,
      color: "text-green-600"
    },
    {
      title: "Critical Alerts",
      value: "23",
      change: "-15%",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Reports Generated",
      value: "892",
      change: "+25%",
      icon: FileText,
      color: "text-purple-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Drug interaction analysis completed",
      patient: "John Doe",
      time: "2 minutes ago",
      severity: "moderate"
    },
    {
      id: 2,
      action: "Critical interaction detected",
      patient: "Jane Smith",
      time: "15 minutes ago",
      severity: "high"
    },
    {
      id: 3,
      action: "Report generated",
      patient: "Robert Johnson",
      time: "1 hour ago",
      severity: "low"
    },
    {
      id: 4,
      action: "New patient registered",
      patient: "Mary Wilson",
      time: "2 hours ago",
      severity: "info"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50";
      case "moderate": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100 mt-2">
            {user?.role === 'doctor' ? 'Monitor drug interactions and patient safety' : 
             user?.role === 'nurse' ? 'Support patient care and medication management' :
             'Oversee system operations and user management'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">{stat.change}</span>
                      </div>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>
                Latest system activities and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${getSeverityColor(activity.severity)}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">Patient: {activity.patient}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used system functions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Analyze Drug Interactions</p>
                      <p className="text-sm text-gray-600">Check medications for potential DDIs</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Add New Patient</p>
                      <p className="text-sm text-gray-600">Register a new patient profile</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Generate Report</p>
                      <p className="text-sm text-gray-600">Create interaction analysis reports</p>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

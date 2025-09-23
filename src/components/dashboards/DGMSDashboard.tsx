import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  FileText, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Download,
  Calendar,
  Activity
} from "lucide-react";
import MineMap from "../MineMap";

const DGMSDashboard = () => {
  const safetyMetrics = [
    { label: "Safety Score", value: "94.2%", trend: "up", change: "+2.1%" },
    { label: "Incidents This Month", value: "3", trend: "down", change: "-40%" },
    { label: "Compliance Rate", value: "98.7%", trend: "up", change: "+0.5%" },
    { label: "Training Completion", value: "96.3%", trend: "up", change: "+1.2%" },
  ];

  const productivityMetrics = [
    { label: "Daily Output", value: "847 tons", trend: "up", change: "+5.2%" },
    { label: "Equipment Efficiency", value: "89.4%", trend: "down", change: "-1.8%" },
    { label: "Worker Productivity", value: "92.1%", trend: "up", change: "+3.4%" },
    { label: "Downtime Hours", value: "2.3h", trend: "down", change: "-15%" },
  ];

  const complianceReports = [
    { id: 1, title: "Monthly Safety Audit Report", type: "Safety", date: "2024-01-15", status: "Ready" },
    { id: 2, title: "Environmental Compliance Report", type: "Environmental", date: "2024-01-10", status: "Ready" },
    { id: 3, title: "Worker Training Records", type: "Training", date: "2024-01-08", status: "Ready" },
    { id: 4, title: "Equipment Maintenance Log", type: "Maintenance", date: "2024-01-05", status: "Pending" },
  ];

  const recentIncidents = [
    { id: 1, type: "Minor Injury", location: "Tunnel B-7", severity: "Low", status: "Resolved" },
    { id: 2, type: "Equipment Failure", location: "Shaft A-2", severity: "Medium", status: "Investigating" },
    { id: 3, type: "Gas Detection", location: "Tunnel C-1", severity: "High", status: "Resolved" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'High': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-success text-success-foreground';
      case 'Pending': return 'bg-warning text-warning-foreground';
      case 'Resolved': return 'bg-success text-success-foreground';
      case 'Investigating': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="map">Mine Map</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {/* Safety Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Safety Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {safetyMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-success'}`}>
                      {metric.change} from last period
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Productivity Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Productivity Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {productivityMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-warning" />
                      )}
                    </div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-warning'}`}>
                      {metric.change} from last period
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <span>Recent Incidents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{incident.type}</span>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{incident.location}</p>
                    </div>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Compliance Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{report.title}</span>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{report.date}</span>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {report.status === 'Ready' && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <h3 className="font-semibold text-lg mb-2">Mine Safety Act</h3>
                  <div className="text-3xl font-bold text-success mb-1">✓</div>
                  <p className="text-sm text-muted-foreground">Fully Compliant</p>
                </div>
                
                <div className="p-4 border rounded-lg text-center">
                  <h3 className="font-semibold text-lg mb-2">Environmental Regs</h3>
                  <div className="text-3xl font-bold text-success mb-1">✓</div>
                  <p className="text-sm text-muted-foreground">Compliant</p>
                </div>
                
                <div className="p-4 border rounded-lg text-center">
                  <h3 className="font-semibold text-lg mb-2">Labor Standards</h3>
                  <div className="text-3xl font-bold text-warning mb-1">!</div>
                  <p className="text-sm text-muted-foreground">Minor Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Visual Mine Map - Government Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MineMap role="dgms" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DGMSDashboard;
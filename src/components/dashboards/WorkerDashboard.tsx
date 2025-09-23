import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Upload, 
  Phone, 
  Clock,
  HardHat,
  Wrench
} from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'done';
  priority: 'low' | 'medium' | 'high';
}

interface HazardReport {
  id: number;
  description: string;
  location: string;
  status: 'pending' | 'done' | 'rejected';
  timestamp: string;
}

const WorkerDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete daily safety check", status: 'pending', priority: 'high' },
    { id: 2, title: "Inspect tunnel ventilation system", status: 'pending', priority: 'medium' },
    { id: 3, title: "Report equipment maintenance needs", status: 'done', priority: 'low' },
    { id: 4, title: "Attend safety briefing", status: 'pending', priority: 'high' },
  ]);

  const [hazardReports, setHazardReports] = useState<HazardReport[]>([
    { id: 1, description: "Loose rocks in tunnel B-7", location: "Tunnel B-7, Section 3", status: 'done', timestamp: "2024-01-15 09:30" },
    { id: 2, description: "Gas leak detected", location: "Shaft A-2", status: 'pending', timestamp: "2024-01-14 14:20" },
  ]);

  const [newHazard, setNewHazard] = useState({ description: '', location: '' });
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'pending' ? 'done' : 'pending';
        toast.success(`Task ${newStatus === 'done' ? 'completed' : 'reopened'}`);
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const submitHazardReport = () => {
    if (!newHazard.description.trim() || !newHazard.location.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const report: HazardReport = {
      id: Date.now(),
      description: newHazard.description,
      location: newHazard.location,
      status: 'pending',
      timestamp: new Date().toLocaleString(),
    };

    setHazardReports([report, ...hazardReports]);
    setNewHazard({ description: '', location: '' });
    toast.success("Hazard report submitted successfully");
  };

  const handleEmergencySOS = () => {
    toast.error("🚨 EMERGENCY ALERT SENT! Supervisor notified immediately!", {
      duration: 5000,
    });
  };

  const markAttendance = () => {
    setAttendanceMarked(true);
    toast.success("Attendance marked for today");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-success';
      case 'rejected': return 'bg-destructive';
      case 'pending': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tasks Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>My Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-lg ${
                    task.status === 'done' ? 'bg-success/10 border-success' : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTask(task.id)}
                      className="p-0 h-6 w-6"
                    >
                      {task.status === 'done' ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </Button>
                    <span className={task.status === 'done' ? 'line-through text-muted-foreground' : ''}>
                      {task.title}
                    </span>
                  </div>
                  <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance & Equipment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Daily Check-in</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={markAttendance}
              disabled={attendanceMarked}
              className={`w-full ${attendanceMarked ? 'bg-success hover:bg-success' : ''}`}
            >
              <HardHat className="w-4 h-4 mr-2" />
              {attendanceMarked ? 'Attendance Marked ✓' : 'Mark Attendance'}
            </Button>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Equipment Status</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Safety Helmet</span>
                  <Badge className="bg-success text-success-foreground">OK</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Gas Detector</span>
                  <Badge className="bg-success text-success-foreground">OK</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Communication Radio</span>
                  <Badge className="bg-warning text-warning-foreground">Check</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hazard Reporting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Report Hazard</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Hazard location (e.g., Tunnel B-7, Section 3)"
              value={newHazard.location}
              onChange={(e) => setNewHazard({...newHazard, location: e.target.value})}
            />
            <Textarea
              placeholder="Describe the hazard in detail..."
              value={newHazard.description}
              onChange={(e) => setNewHazard({...newHazard, description: e.target.value})}
              rows={3}
            />
            <div className="flex space-x-2">
              <Button onClick={submitHazardReport} className="flex-1">
                Submit Report
              </Button>
              <Button variant="outline" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency SOS */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <Phone className="w-5 h-5" />
              <span>Emergency Response</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleEmergencySOS}
              className="w-full h-16 text-xl font-bold bg-gradient-danger hover:opacity-90 emergency-pulse"
            >
              <Phone className="w-6 h-6 mr-3" />
              EMERGENCY SOS
            </Button>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Use only in case of immediate danger
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-primary" />
            <span>My Reports Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hazardReports.map((report) => (
              <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{report.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{report.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{report.timestamp}</p>
                </div>
                <Badge className={`${getStatusColor(report.status)} text-white ml-4`}>
                  {report.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerDashboard;
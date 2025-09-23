import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MapPin, 
  ClipboardCheck, 
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Wifi,
  WifiOff
} from "lucide-react";
import MineMap from "../MineMap";
import { toast } from "sonner";

interface Worker {
  id: number;
  name: string;
  status: 'active' | 'offline' | 'emergency';
  location: string;
  attendance: boolean;
  lastSeen: string;
}

interface Task {
  id: number;
  workerId: number;
  workerName: string;
  title: string;
  status: 'pending' | 'completed';
  timestamp: string;
}

interface Resource {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  status: 'adequate' | 'low' | 'critical';
  team: string;
}

const SupervisorDashboard = () => {
  const [workers, setWorkers] = useState<Worker[]>([
    { id: 1, name: "John Smith", status: 'active', location: "Tunnel A-5", attendance: true, lastSeen: "5 min ago" },
    { id: 2, name: "Maria Garcia", status: 'active', location: "Shaft B-2", attendance: true, lastSeen: "2 min ago" },
    { id: 3, name: "David Chen", status: 'offline', location: "Surface", attendance: false, lastSeen: "45 min ago" },
    { id: 4, name: "Sarah Johnson", status: 'active', location: "Tunnel C-1", attendance: true, lastSeen: "1 min ago" },
    { id: 5, name: "Mike Wilson", status: 'emergency', location: "Tunnel B-7", attendance: true, lastSeen: "Just now" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, workerId: 1, workerName: "John Smith", title: "Complete daily safety check", status: 'completed', timestamp: "2024-01-15 09:30" },
    { id: 2, workerId: 2, workerName: "Maria Garcia", title: "Inspect ventilation system", status: 'pending', timestamp: "2024-01-15 10:15" },
    { id: 3, workerId: 4, workerName: "Sarah Johnson", title: "Equipment maintenance check", status: 'pending', timestamp: "2024-01-15 08:45" },
  ]);

  const [resources, setResources] = useState<Resource[]>([
    { id: 1, name: "Safety Helmets", quantity: 25, unit: "units", status: 'adequate', team: "Team A" },
    { id: 2, name: "Gas Detectors", quantity: 3, unit: "units", status: 'low', team: "Team B" },
    { id: 3, name: "Emergency Oxygen", quantity: 1, unit: "tanks", status: 'critical', team: "Team C" },
    { id: 4, name: "Communication Radios", quantity: 15, unit: "units", status: 'adequate', team: "All Teams" },
  ]);

  const toggleAttendance = (workerId: number) => {
    setWorkers(workers.map(worker => 
      worker.id === workerId 
        ? { ...worker, attendance: !worker.attendance }
        : worker
    ));
    toast.success("Attendance updated");
  };

  const validateTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed' as const }
        : task
    ));
    toast.success("Task validated");
  };

  const rejectTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.error("Task rejected");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      case 'emergency': return 'bg-destructive text-destructive-foreground emergency-pulse';
      default: return 'bg-muted';
    }
  };

  const getResourceStatusColor = (status: string) => {
    switch (status) {
      case 'adequate': return 'bg-success text-success-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="workers" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="tasks">Task Log</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="map">Mine Map</TabsTrigger>
        </TabsList>

        <TabsContent value="workers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Worker Attendance & Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {workers.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {worker.status === 'active' ? (
                          <Wifi className="w-4 h-4 text-success" />
                        ) : (
                          <WifiOff className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="font-medium">{worker.name}</span>
                      </div>
                      <Badge className={getStatusColor(worker.status)}>
                        {worker.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{worker.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{worker.lastSeen}</span>
                      </div>
                      <Button
                        variant={worker.attendance ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleAttendance(worker.id)}
                      >
                        {worker.attendance ? 'Present' : 'Absent'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <span>Digital Task Log</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{task.workerName}</span>
                        <Badge variant="outline">{task.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.timestamp}</p>
                    </div>
                    
                    {task.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => validateTask(task.id)}
                          className="bg-success hover:bg-success/80"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Validate
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => rejectTask(task.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>Resource Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{resource.name}</span>
                        <Badge className={getResourceStatusColor(resource.status)}>
                          {resource.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Team: {resource.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{resource.quantity}</p>
                      <p className="text-xs text-muted-foreground">{resource.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Visual Mine Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MineMap role="supervisor" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupervisorDashboard;
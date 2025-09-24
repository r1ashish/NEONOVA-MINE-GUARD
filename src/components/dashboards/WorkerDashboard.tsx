import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  User, 
  Calendar as CalendarIcon, 
  Heart, 
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  Activity
} from "lucide-react";
import { toast } from "sonner";

interface LeaveRequest {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

interface HealthEvent {
  id: number;
  title: string;
  date: string;
  type: 'checkup' | 'wellness' | 'vaccination' | 'training';
  description: string;
}

const WorkerDashboard = () => {
  // Employee Profile Data
  const [employeeProfile] = useState({
    userId: "EMP-2024-001",
    name: "John Smith",
    department: "Mining Operations",
    jobTitle: "Senior Miner",
    email: "john.smith@neonova.com",
    phone: "+1 (555) 123-4567",
    profilePicture: "/api/placeholder/150/150"
  });

  // Leave Management
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 1, type: "Vacation", startDate: "2024-02-15", endDate: "2024-02-17", reason: "Family trip", status: 'approved', timestamp: "2024-01-10 09:30" },
    { id: 2, type: "Sick Leave", startDate: "2024-01-20", endDate: "2024-01-20", reason: "Medical appointment", status: 'pending', timestamp: "2024-01-18 14:20" },
  ]);

  const [newLeaveRequest, setNewLeaveRequest] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Health Information
  const [healthInfo] = useState({
    lastCheckup: "2024-01-05",
    nextCheckup: "2024-04-05",
    wellnessScore: 85,
    vaccinations: "Up to date"
  });

  const [healthEvents, setHealthEvents] = useState<HealthEvent[]>([
    { id: 1, title: "Annual Health Checkup", date: "2024-04-05", type: 'checkup', description: "Mandatory annual health screening" },
    { id: 2, title: "Wellness Workshop", date: "2024-02-20", type: 'wellness', description: "Stress management and mental health" },
    { id: 3, title: "Safety Training", date: "2024-02-10", type: 'training', description: "Updated mining safety protocols" },
  ]);

  const submitLeaveRequest = () => {
    if (!newLeaveRequest.type || !newLeaveRequest.startDate || !newLeaveRequest.endDate || !newLeaveRequest.reason.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const request: LeaveRequest = {
      id: Date.now(),
      type: newLeaveRequest.type,
      startDate: newLeaveRequest.startDate,
      endDate: newLeaveRequest.endDate,
      reason: newLeaveRequest.reason,
      status: 'pending',
      timestamp: new Date().toLocaleString(),
    };

    setLeaveRequests([request, ...leaveRequests]);
    setNewLeaveRequest({ type: '', startDate: '', endDate: '', reason: '' });
    toast.success("Leave request submitted successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getHealthEventColor = (type: string) => {
    switch (type) {
      case 'checkup': return 'bg-primary text-primary-foreground';
      case 'wellness': return 'bg-success text-success-foreground';
      case 'vaccination': return 'bg-warning text-warning-foreground';
      case 'training': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>My Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {employeeProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-semibold">{employeeProfile.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold">{employeeProfile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-semibold">{employeeProfile.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Job Title</p>
                  <p className="font-semibold">{employeeProfile.jobTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leave" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="health">Health & Wellness</TabsTrigger>
        </TabsList>

        <TabsContent value="leave" className="space-y-6">
          {/* Request Leave Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span>Request Leave</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Leave Type</label>
                  <select
                    className="w-full p-2 border rounded-lg bg-background"
                    value={newLeaveRequest.type}
                    onChange={(e) => setNewLeaveRequest({...newLeaveRequest, type: e.target.value})}
                  >
                    <option value="">Select leave type</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Time">Personal Time</option>
                    <option value="Emergency">Emergency Leave</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={newLeaveRequest.startDate}
                    onChange={(e) => setNewLeaveRequest({...newLeaveRequest, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={newLeaveRequest.endDate}
                    onChange={(e) => setNewLeaveRequest({...newLeaveRequest, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <Textarea
                  placeholder="Please provide a reason for your leave request..."
                  value={newLeaveRequest.reason}
                  onChange={(e) => setNewLeaveRequest({...newLeaveRequest, reason: e.target.value})}
                  rows={3}
                />
              </div>
              <Button onClick={submitLeaveRequest} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Submit Leave Request
              </Button>
            </CardContent>
          </Card>

          {/* Leave History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Leave History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium">{request.type}</p>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {request.startDate} to {request.endDate}
                      </p>
                      <p className="text-sm text-muted-foreground">{request.reason}</p>
                      <p className="text-xs text-muted-foreground mt-1">Requested: {request.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-primary" />
                <span>Health Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Activity className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Wellness Score</p>
                  <p className="text-2xl font-bold text-success">{healthInfo.wellnessScore}%</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Last Checkup</p>
                  <p className="font-semibold">{healthInfo.lastCheckup}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Next Checkup</p>
                  <p className="font-semibold">{healthInfo.nextCheckup}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Vaccinations</p>
                  <p className="font-semibold text-success">{healthInfo.vaccinations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span>Upcoming Health Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthEvents.map((event) => (
                  <div key={event.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium">{event.title}</p>
                        <Badge className={getHealthEventColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <CalendarIcon className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkerDashboard;
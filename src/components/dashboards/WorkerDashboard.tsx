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
  Activity,
  UserCheck,
  TrendingUp
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

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  checkIn?: string;
  checkOut?: string;
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

  // Attendance Data
  const [attendanceData] = useState({
    daily: {
      today: { date: "2024-02-15", status: 'present' as const, checkIn: "08:00 AM", checkOut: "05:00 PM" },
      thisWeek: [
        { date: "2024-02-15", status: 'present' as const, checkIn: "08:00 AM", checkOut: "05:00 PM" },
        { date: "2024-02-14", status: 'present' as const, checkIn: "08:15 AM", checkOut: "05:00 PM" },
        { date: "2024-02-13", status: 'late' as const, checkIn: "08:30 AM", checkOut: "05:00 PM" },
        { date: "2024-02-12", status: 'present' as const, checkIn: "08:00 AM", checkOut: "05:00 PM" },
        { date: "2024-02-11", status: 'half-day' as const, checkIn: "08:00 AM", checkOut: "01:00 PM" },
      ]
    },
    weekly: {
      currentWeek: { present: 4, absent: 0, late: 1, halfDays: 1 },
      lastWeek: { present: 5, absent: 0, late: 0, halfDays: 0 },
    },
    monthly: {
      currentMonth: { present: 18, absent: 1, late: 2, halfDays: 2, totalDays: 23 },
      lastMonth: { present: 20, absent: 1, late: 1, halfDays: 0, totalDays: 22 },
    }
  });

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

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-success text-success-foreground';
      case 'absent': return 'bg-destructive text-destructive-foreground';
      case 'late': return 'bg-warning text-warning-foreground';
      case 'half-day': return 'bg-accent text-accent-foreground';
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

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="health">Health & Wellness</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          {/* Daily Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-primary" />
                <span>Today's Attendance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold">Present</p>
                    <p className="text-sm text-muted-foreground">{attendanceData.daily.today.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Check In: {attendanceData.daily.today.checkIn}</p>
                  <p className="text-sm text-muted-foreground">Check Out: {attendanceData.daily.today.checkOut}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span>This Week's Attendance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="p-4 border rounded-lg text-center">
                  <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-success">{attendanceData.weekly.currentWeek.present}</p>
                  <p className="text-sm text-muted-foreground">Present</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-warning">{attendanceData.weekly.currentWeek.late}</p>
                  <p className="text-sm text-muted-foreground">Late</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Activity className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-accent">{attendanceData.weekly.currentWeek.halfDays}</p>
                  <p className="text-sm text-muted-foreground">Half Days</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                  <p className="text-2xl font-bold text-destructive">{attendanceData.weekly.currentWeek.absent}</p>
                  <p className="text-sm text-muted-foreground">Absent</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Daily Breakdown</h4>
                {attendanceData.daily.thisWeek.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge className={getAttendanceStatusColor(day.status)}>
                        {day.status}
                      </Badge>
                      <span className="font-medium">{day.date}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {day.checkIn} - {day.checkOut}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Monthly Attendance Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Current Month</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Total Working Days</span>
                      <span className="font-bold">{attendanceData.monthly.currentMonth.totalDays}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-success/10">
                      <span className="text-sm">Present Days</span>
                      <span className="font-bold text-success">{attendanceData.monthly.currentMonth.present}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-destructive/10">
                      <span className="text-sm">Absent Days</span>
                      <span className="font-bold text-destructive">{attendanceData.monthly.currentMonth.absent}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-warning/10">
                      <span className="text-sm">Late Days</span>
                      <span className="font-bold text-warning">{attendanceData.monthly.currentMonth.late}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold text-primary">
                      {Math.round((attendanceData.monthly.currentMonth.present / attendanceData.monthly.currentMonth.totalDays) * 100)}%
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Last Month Comparison</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Total Working Days</span>
                      <span className="font-bold">{attendanceData.monthly.lastMonth.totalDays}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Present Days</span>
                      <span className="font-bold">{attendanceData.monthly.lastMonth.present}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Absent Days</span>
                      <span className="font-bold">{attendanceData.monthly.lastMonth.absent}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">Late Days</span>
                      <span className="font-bold">{attendanceData.monthly.lastMonth.late}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Previous Attendance Rate</p>
                    <p className="text-2xl font-bold">
                      {Math.round((attendanceData.monthly.lastMonth.present / attendanceData.monthly.lastMonth.totalDays) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
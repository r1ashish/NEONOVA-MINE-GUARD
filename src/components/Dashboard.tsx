import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";
import WorkerDashboard from "./dashboards/WorkerDashboard";
import SupervisorDashboard from "./dashboards/SupervisorDashboard";
import DGMSDashboard from "./dashboards/DGMSDashboard";
import { toast } from "sonner";

type UserRole = 'worker' | 'supervisor' | 'dgms';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole') as UserRole;
    if (!role) {
      navigate('/');
    } else {
      setUserRole(role);
      toast.success(`Welcome to NEONOVA ${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.info("Logged out successfully");
    navigate('/');
  };

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'worker': return 'Worker Dashboard';
      case 'supervisor': return 'Supervisor Control Center';
      case 'dgms': return 'DGMS Analytics Hub';
      default: return 'Dashboard';
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary animate-neon-glow" />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {getRoleTitle(userRole)}
              </h1>
              <p className="text-sm text-muted-foreground">NEONOVA Mining Platform</p>
            </div>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {userRole === 'worker' && <WorkerDashboard />}
        {userRole === 'supervisor' && <SupervisorDashboard />}
        {userRole === 'dgms' && <DGMSDashboard />}
      </main>
    </div>
  );
};

export default Dashboard;
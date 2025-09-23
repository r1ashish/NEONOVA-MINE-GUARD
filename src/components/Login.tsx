import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, HardHat, Building2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role: string) => {
    localStorage.setItem('userRole', role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Card className="w-full max-w-md relative z-10 neon-border bg-card/80 backdrop-blur-sm animate-fade-in">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-8 h-8 text-primary animate-neon-glow" />
            <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              NEONOVA
            </h1>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Mine Safety & Productivity Platform
            </h2>
            <p className="text-muted-foreground text-sm">
              Advanced monitoring and safety management for modern mining operations
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            onClick={() => handleLogin('worker')}
            className="w-full h-14 text-lg font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transition-all duration-300 group"
            size="lg"
          >
            <HardHat className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            Login as Worker
          </Button>

          <Button
            onClick={() => handleLogin('supervisor')}
            className="w-full h-14 text-lg font-medium bg-gradient-warning text-warning-foreground hover:opacity-90 transition-all duration-300 group"
            size="lg"
          >
            <Shield className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Login as Supervisor
          </Button>

          <Button
            onClick={() => handleLogin('dgms')}
            className="w-full h-14 text-lg font-medium bg-gradient-success text-success-foreground hover:opacity-90 transition-all duration-300 group"
            size="lg"
          >
            <Building2 className="w-5 h-5 mr-3 group-hover:bounce transition-transform" />
            Login as DGMS
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
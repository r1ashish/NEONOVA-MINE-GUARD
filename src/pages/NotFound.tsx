import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Shield className="w-8 h-8 text-primary animate-neon-glow" />
          <h1 className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            NEONOVA
          </h1>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-6xl font-bold text-primary">404</h2>
          <h3 className="text-2xl font-semibold text-foreground">Page Not Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            The mine shaft you're looking for doesn't exist. Let's get you back to safety.
          </p>
        </div>

        <Button
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-lg px-8 py-3"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Base
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

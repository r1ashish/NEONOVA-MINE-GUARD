import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface Incident {
  id: number;
  x: number;
  y: number;
  type: 'hazard' | 'emergency' | 'maintenance' | 'completed';
  description: string;
  location: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

interface MineMapProps {
  role: 'supervisor' | 'dgms';
}

const MineMap = ({ role }: MineMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const incidents: Incident[] = [
    {
      id: 1,
      x: 150,
      y: 120,
      type: 'hazard',
      description: 'Loose rocks detected',
      location: 'Tunnel B-7, Section 3',
      timestamp: '2024-01-15 09:30',
      severity: 'high'
    },
    {
      id: 2,
      x: 300,
      y: 200,
      type: 'emergency',
      description: 'Gas leak alert',
      location: 'Shaft A-2',
      timestamp: '2024-01-15 14:20',
      severity: 'high'
    },
    {
      id: 3,
      x: 450,
      y: 150,
      type: 'maintenance',
      description: 'Equipment maintenance required',
      location: 'Processing Area C',
      timestamp: '2024-01-14 16:45',
      severity: 'medium'
    },
    {
      id: 4,
      x: 200,
      y: 280,
      type: 'completed',
      description: 'Ventilation system repaired',
      location: 'Tunnel A-5',
      timestamp: '2024-01-14 11:20',
      severity: 'low'
    },
    {
      id: 5,
      x: 380,
      y: 320,
      type: 'hazard',
      description: 'Structural concern reported',
      location: 'Support Beam Zone 7',
      timestamp: '2024-01-13 08:15',
      severity: 'medium'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Draw mine layout background
    ctx.fillStyle = 'hsl(222, 20%, 12%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw mine tunnels and structures
    ctx.strokeStyle = 'hsl(195, 100%, 50%)';
    ctx.lineWidth = 3;
    
    // Main tunnel network
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(550, 100);
    ctx.moveTo(50, 200);
    ctx.lineTo(550, 200);
    ctx.moveTo(50, 300);
    ctx.lineTo(550, 300);
    
    // Vertical connectors
    ctx.moveTo(150, 50);
    ctx.lineTo(150, 350);
    ctx.moveTo(300, 50);
    ctx.lineTo(300, 350);
    ctx.moveTo(450, 50);
    ctx.lineTo(450, 350);
    ctx.stroke();

    // Draw tunnel labels
    ctx.fillStyle = 'hsl(210, 40%, 98%)';
    ctx.font = '12px Inter';
    ctx.fillText('Tunnel A', 60, 95);
    ctx.fillText('Tunnel B', 60, 195);
    ctx.fillText('Tunnel C', 60, 295);
    ctx.fillText('Shaft 1', 120, 70);
    ctx.fillText('Shaft 2', 270, 70);
    ctx.fillText('Shaft 3', 420, 70);

    // Draw entrance
    ctx.fillStyle = 'hsl(142, 76%, 36%)';
    ctx.fillRect(25, 180, 20, 40);
    ctx.fillStyle = 'hsl(210, 40%, 98%)';
    ctx.fillText('Entrance', 15, 175);

    // Draw incidents
    incidents.forEach((incident) => {
      const colors = {
        hazard: { bg: 'hsl(38, 92%, 50%)', border: 'hsl(25, 95%, 53%)' },
        emergency: { bg: 'hsl(0, 100%, 50%)', border: 'hsl(340, 100%, 50%)' },
        maintenance: { bg: 'hsl(195, 100%, 50%)', border: 'hsl(220, 100%, 60%)' },
        completed: { bg: 'hsl(142, 76%, 36%)', border: 'hsl(158, 64%, 52%)' }
      };

      const color = colors[incident.type];
      
      // Draw marker shadow/glow
      ctx.shadowColor = color.bg;
      ctx.shadowBlur = incident.type === 'emergency' ? 15 : 8;
      
      // Draw marker
      ctx.fillStyle = color.bg;
      ctx.beginPath();
      ctx.arc(incident.x, incident.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = color.border;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
      
      // Draw severity indicator for high priority items
      if (incident.severity === 'high') {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px Inter';
        ctx.fillText('!', incident.x - 2, incident.y + 3);
      }
    });

  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is near any incident
    const clickedIncident = incidents.find(incident => {
      const distance = Math.sqrt(
        Math.pow(x - incident.x, 2) + Math.pow(y - incident.y, 2)
      );
      return distance <= 12; // Click tolerance
    });

    setSelectedIncident(clickedIncident || null);
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'hazard': return <AlertTriangle className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <MapPin className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hazard': return 'bg-warning text-warning-foreground';
      case 'emergency': return 'bg-destructive text-destructive-foreground';
      case 'maintenance': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="mine-map">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Real-time Mine Status</span>
                <div className="flex space-x-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Emergency</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>Hazard</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Maintenance</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>Completed</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full h-auto border border-border rounded cursor-pointer hover:border-primary transition-colors"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Click on markers to view incident details
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedIncident ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {getIncidentIcon(selectedIncident.type)}
                    <span className="font-medium">{selectedIncident.description}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <Badge className={getTypeColor(selectedIncident.type)}>
                        {selectedIncident.type}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Severity:</span>
                      <Badge className={getSeverityColor(selectedIncident.severity)}>
                        {selectedIncident.severity}
                      </Badge>
                    </div>
                    
                    <div className="border-t pt-2 mt-2">
                      <p className="text-sm"><strong>Location:</strong> {selectedIncident.location}</p>
                      <p className="text-sm"><strong>Reported:</strong> {selectedIncident.timestamp}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Click on a marker to view details</p>
                </div>
              )}
            </CardContent>
          </Card>

          {role === 'dgms' && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Mine Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Incidents:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Hazards:</span>
                    <span className="font-medium text-warning">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Alerts:</span>
                    <span className="font-medium text-destructive">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Actions:</span>
                    <span className="font-medium text-success">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MineMap;
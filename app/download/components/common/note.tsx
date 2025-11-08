'use client'

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, LightbulbIcon } from "lucide-react";

interface NoteProps {
  type: 'info' | 'warning' | 'success' | 'tip';
  children: React.ReactNode;
  className?: string;
}

export default function Note({ type, children, className }: NoteProps) {
  // Select icon and variant based on type
  const getIconAndVariant = (type: NoteProps['type']) => {
    switch (type) {
      case 'info':
        return {
          icon: <InfoIcon />,
          variant: 'default' as const
        };
      case 'warning':
        return {
          icon: <AlertTriangleIcon />,
          variant: 'destructive' as const
        };
      case 'success':
        return {
          icon: <CheckCircleIcon />,
          variant: 'default' as const
        };
      case 'tip':
        return {
          icon: <LightbulbIcon />,
          variant: 'default' as const
        };
      default:
        return {
          icon: <InfoIcon />,
          variant: 'default' as const
        };
    }
  };

  const { icon, variant } = getIconAndVariant(type);

  // Render as regular Alert
  return (
    <Alert variant={variant} className={className}>
      {icon}
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  );
}

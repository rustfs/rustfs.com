'use client'

import { Alert, AlertDescription } from "@/components/ui/alert";
import { type Note } from "@/data/platforms";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon, CheckCircleIcon, ExternalLinkIcon, InfoIcon, LightbulbIcon } from "lucide-react";

interface NotesSectionProps {
  notes: Note[];
  className?: string;
}

export default function NotesSection({ notes, className }: NotesSectionProps) {
  const { tw } = useI18n();

  if (!notes || notes.length === 0) {
    return null;
  }

  // Select icon and variant based on type
  const getIconAndVariant = (type: Note['type']) => {
    switch (type) {
      case 'info':
        return {
          icon: <InfoIcon />,
          variant: 'default' as const,
          className: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
        };
      case 'warning':
        return {
          icon: <AlertTriangleIcon />,
          variant: 'destructive' as const,
          className: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
        };
      case 'success':
        return {
          icon: <CheckCircleIcon />,
          variant: 'default' as const,
          className: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 text-green-800 dark:text-green-200'
        };
      case 'tip':
        return {
          icon: <LightbulbIcon />,
          variant: 'default' as const,
          className: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
        };
      default:
        return {
          icon: <InfoIcon />,
          variant: 'default' as const,
          className: ''
        };
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {notes.map((note, noteIndex) => {
        const { icon, variant, className } = getIconAndVariant(note.type);

        // If there's a URL, render as clickable link
        if (note.url) {
          return (
            <a
              key={noteIndex}
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "block transition-all duration-200 hover:scale-[1.01] hover:shadow-md",
                className
              )}
            >
              <Alert variant={variant} className={cn("cursor-pointer border-2 hover:border-primary/50", className)}>
                {icon}
                <AlertDescription className="flex items-center justify-between">
                  <span>{tw(note.content.zh, note.content.en, note.content.tr || note.content.en)}</span>
                  <ExternalLinkIcon className="w-4 h-4 ml-2 opacity-60" />
                </AlertDescription>
              </Alert>
            </a>
          );
        }

        // Render as regular Alert when no URL
        return (
          <Alert key={noteIndex} variant={variant} className={className}>
            {icon}
            <AlertDescription>
              {tw(note.content.zh, note.content.en, note.content.tr || note.content.en)}
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}

import React from 'react';

export interface PageData {
  id: number;
  type: 'cover' | 'intro' | 'details' | 'location' | 'dresscode' | 'parents' | 'godparents' | 'rsvp' | 'back';
  title?: string;
  content?: React.ReactNode;
}

export interface PlaceholderProps {
  label: string;
  dimensions?: string;
  seed?: number;
  className?: string;
}

export interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  animation?: 'fade' | 'slide' | 'zoom' | 'typewriter' | 'bounce';
  isActive: boolean;
  className?: string;
}
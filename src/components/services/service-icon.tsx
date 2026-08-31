"use client";

import {
  Code2, RefreshCw, MousePointerClick, ShoppingCart, Search, Brain,
  Settings2, MapPin, FilePen, TrendingUp, Target, Link2, CheckCircle2, Zap,
  BarChart3, FileText, ShieldCheck, Wrench, LineChart, Package, RefreshCcw,
  Headphones, Database, Gauge, Globe, Layers, Award, Users, Lock, Sparkles,
  Rocket, Scale, Handshake, Palette, Bot, Cog, Star,
  Share2, Instagram, Facebook, Linkedin, Megaphone, Heart, MessageCircle,
  CalendarClock, PenTool, Radar, Crosshair, BadgeCheck, PieChart, Send,
  Video, Image as ImageIcon, Hash, UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Code2, RefreshCw, MousePointerClick, ShoppingCart, Search, Brain,
  Settings2, MapPin, FilePen, TrendingUp, Target, Link2, CheckCircle2, Zap,
  BarChart3, FileText, ShieldCheck, Wrench, LineChart, Package, RefreshCcw,
  Headphones, Database, Gauge, Globe, Layers, Award, Users, Lock, Sparkles,
  Rocket, Scale, Handshake, Palette, Bot, Cog, Star,
  Share2, Instagram, Facebook, Linkedin, Megaphone, Heart, MessageCircle,
  CalendarClock, PenTool, Radar, Crosshair, BadgeCheck, PieChart, Send,
  Video, Image: ImageIcon, Hash, UserPlus,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = registry[name] ?? Sparkles;
  return <Icon className={className} />;
}

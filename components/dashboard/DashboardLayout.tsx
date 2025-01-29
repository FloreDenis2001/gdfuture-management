"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Calendar,
  ChevronLeft,
  Building2,
  MessageSquare,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import logo from "@/public/logo.png";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "projects", label: "Projects", icon: Building2, href: "/projects" },
  { id: "team", label: "Team", icon: Users, href: "/team" },
  { id: "services", label: "Services", icon: Briefcase, href: "/services" },
  { id: "jobs", label: "Jobs", icon: FileText, href: "/jobs" },
  { id: "leave", label: "Leave Management", icon: Calendar, href: "/leave" },
  { id: "messages", label: "Messages", icon: MessageSquare, href: "/messages" },
  { id: "reports", label: "Reports", icon: TrendingUp, href: "/reports" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Backdrop for mobile */}
        {!sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.aside
          className={`fixed md:static inset-y-0 left-0 z-30 w-72 bg-white/[0.02] border-r border-white/10 transition-all duration-300 ease-in-out transform ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0 md:w-20"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div
                className={`flex items-center space-x-3 ${
                  !sidebarOpen && "md:justify-center"
                }`}
              >
                <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                  <Image src={logo} alt="GDFUTURE"/>
                </div>
                {sidebarOpen && (
                  <span className="text-lg font-medium text-white">
                    GDFUTURE
                  </span>
                )}
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-white/60 hover:text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center ${
                      sidebarOpen ? "px-4" : "justify-center px-2"
                    } py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-yellow-500 text-gray-900"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              {sidebarOpen ? (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Need help?
                      </div>
                      <div className="text-xs text-white/60">
                        Contact support
                      </div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                    Get Support
                  </button>
                </div>
              ) : (
                <button className="w-full flex justify-center p-2 text-white/60 hover:text-white">
                  <HelpCircle className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${
            sidebarOpen ? "md:ml-0" : "md:ml-20"
          }`}
        >
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

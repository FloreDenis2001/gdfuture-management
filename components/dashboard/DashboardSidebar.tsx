import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Users, Briefcase, FileText, Settings, LayoutDashboard } from 'lucide-react';

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  setActiveSection,
  isOpen
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'jobs', label: 'Jobs', icon: FileText }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setActiveSection(activeSection)}
        />
      )}

      <motion.aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-white/[0.02] border-r border-white/10 overflow-hidden transition-all duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:w-20'
        }`}
        initial={false}
      >
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
          <div className={`flex items-center space-x-3 mb-8 ${!isOpen && 'md:justify-center'}`}>
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-yellow-500" />
            </div>
            {isOpen && <span className="text-lg font-medium text-white">Dashboard</span>}
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center ${isOpen ? 'space-x-3' : 'justify-center'} px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-yellow-500 text-gray-900'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {isOpen && (
            <div className="mt-8 p-4 bg-white/[0.02] rounded-lg border border-white/10">
              <div className="text-sm font-medium text-white mb-1">Need Help?</div>
              <div className="text-xs text-white/50 mb-3">Contact support team</div>
              <button className="w-full px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                Get Support
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;
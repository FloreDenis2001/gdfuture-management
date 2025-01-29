import React, { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Project Assigned',
      message: 'You have been assigned to the E-Commerce Platform project',
      time: '5 minutes ago',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'Meeting Reminder',
      message: 'Team standup meeting in 15 minutes',
      time: '10 minutes ago',
      read: false,
      type: 'warning'
    },
    {
      id: 3,
      title: 'Task Completed',
      message: 'Frontend development phase completed successfully',
      time: '1 hour ago',
      read: true,
      type: 'success'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 bg-white/[0.02] border-b border-white/10">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between max-w-[2000px] mx-auto">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white/80" />
          </button>
          
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 w-48 lg:w-64"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <button 
              className="p-2 hover:bg-white/5 rounded-lg relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-white/60" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-500 rounded-full" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-gray-900 border border-white/10 rounded-lg shadow-lg z-50"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-yellow-500 hover:text-yellow-400"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/10 hover:bg-white/5 transition-colors ${
                          !notification.read ? 'bg-white/[0.02]' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 mt-2 rounded-full ${
                            notification.type === 'info' ? 'bg-blue-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-white/60 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-white/40 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="hidden sm:flex items-center space-x-4 pl-6 ml-6 border-l border-white/10">
            <div className="text-right">
              <div className="text-sm font-medium text-white">John Doe</div>
              <div className="text-xs text-white/50">Administrator</div>
            </div>
            <button className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
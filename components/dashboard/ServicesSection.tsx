import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Code, Smartphone, Database, Palette, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import DeleteDialog from '@/components/ui/DeleteDialog';

interface Service {
  id: number;
  name: string;
  description: string;
  icon: any;
  price: string;
  duration: string;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Web Development',
      description: 'Custom web applications and responsive websites',
      icon: Code,
      price: '$5,000+',
      duration: '2-3 months'
    },
    {
      id: 2,
      name: 'Mobile Development',
      description: 'Native and cross-platform mobile applications',
      icon: Smartphone,
      price: '$8,000+',
      duration: '3-4 months'
    }
  ]);

  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  });

  const icons = {
    Code,
    Smartphone,
    Database,
    Palette
  };

  const handleCreateService = () => {
    const service: Service = {
      id: services.length + 1,
      ...newService,
      icon: Code // Default icon
    };
    setServices([...services, service]);
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: ''
    });
    setIsNewServiceOpen(false);
  };

  const handleEditService = () => {
    if (selectedService) {
      setServices(services.map(s => 
        s.id === selectedService.id ? selectedService : s
      ));
      setIsEditServiceOpen(false);
    }
  };

  const handleDeleteService = () => {
    if (selectedService) {
      setServices(services.filter(s => s.id !== selectedService.id));
      setSelectedService(null);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Services</h1>
          <p className="text-gray-400">Manage your service offerings</p>
        </div>
        
        <button
          onClick={() => setIsNewServiceOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              className="group bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 p-6 hover:border-yellow-500/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Icon className="w-6 h-6 text-yellow-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setIsEditServiceOpen(true);
                        }}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                        title="Edit service"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setIsDeleteOpen(true);
                        }}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 hover:text-red-400 transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Starting from</div>
                      <div className="text-lg font-semibold text-white">
                        {service.price}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Duration</div>
                      <div className="text-lg font-semibold text-white">
                        {service.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* New Service Modal */}
      <Modal
        isOpen={isNewServiceOpen}
        onClose={() => setIsNewServiceOpen(false)}
        title="Add New Service"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Service Name
            </label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter service name..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter service description..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Starting Price
              </label>
              <input
                type="text"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
                placeholder="e.g., $5,000+"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Duration
              </label>
              <input
                type="text"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
                placeholder="e.g., 2-3 months"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsNewServiceOpen(false)}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateService}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Add Service
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Service Modal */}
      <Modal
        isOpen={isEditServiceOpen}
        onClose={() => setIsEditServiceOpen(false)}
        title="Edit Service"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Service Name
            </label>
            <input
              type="text"
              value={selectedService?.name || ''}
              onChange={(e) => setSelectedService(selectedService ? {
                ...selectedService,
                name: e.target.value
              } : null)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              value={selectedService?.description || ''}
              onChange={(e) => setSelectedService(selectedService ? {
                ...selectedService,
                description: e.target.value
              } : null)}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Starting Price
              </label>
              <input
                type="text"
                value={selectedService?.price || ''}
                onChange={(e) => setSelectedService(selectedService ? {
                  ...selectedService,
                  price: e.target.value
                } : null)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Duration
              </label>
              <input
                type="text"
                value={selectedService?.duration || ''}
                onChange={(e) => setSelectedService(selectedService ? {
                  ...selectedService,
                  duration: e.target.value
                } : null)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsEditServiceOpen(false)}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditService}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteService}
        title="Delete Service"
        message={`Are you sure you want to delete the "${selectedService?.name}" service? This action cannot be undone.`}
      />
    </div>
  );
};

export default ServicesSection;
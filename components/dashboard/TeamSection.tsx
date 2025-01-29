import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Mail, Phone, MapPin, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import DeleteDialog from '@/components/ui/DeleteDialog';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

const TeamSection = () => {
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      email: 'sarah@example.com',
      phone: '+1 234 567 890',
      location: 'New York, USA',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'UI/UX Designer',
      email: 'michael@example.com',
      phone: '+1 234 567 891',
      location: 'San Francisco, USA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
    }
  ]);

  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    avatar: ''
  });

  const handleCreateMember = () => {
    const member: TeamMember = {
      id: team.length + 1,
      ...newMember
    };
    setTeam([...team, member]);
    setNewMember({
      name: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      avatar: ''
    });
    setIsNewMemberOpen(false);
  };

  const handleEditMember = () => {
    if (selectedMember) {
      setTeam(team.map(m => 
        m.id === selectedMember.id ? selectedMember : m
      ));
      setIsEditMemberOpen(false);
    }
  };

  const handleDeleteMember = () => {
    if (selectedMember) {
      setTeam(team.filter(m => m.id !== selectedMember.id));
      setSelectedMember(null);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Team Members</h1>
          <p className="text-gray-400">Manage your team and their roles</p>
        </div>
        
        <button
          onClick={() => setIsNewMemberOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid gap-6">
        {team.map((member) => (
          <motion.div
            key={member.id}
            className="group bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 p-6 hover:border-yellow-500/50 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1"> 

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-yellow-500 text-sm mb-4">{member.role}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setIsEditMemberOpen(true);
                      }}
                      className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title="Edit member"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setIsDeleteOpen(true);
                      }}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 hover:text-red-400 transition-colors"
                      title="Delete member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm truncate">{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm truncate">{member.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Member Modal */}
      <Modal
        isOpen={isNewMemberOpen}
        onClose={() => setIsNewMemberOpen(false)}
        title="Add Team Member"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Name
            </label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter name..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Role
            </label>
            <input
              type="text"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter role..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter email..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter phone number..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Location
            </label>
            <input
              type="text"
              value={newMember.location}
              onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter location..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Avatar URL
            </label>
            <input
              type="url"
              value={newMember.avatar}
              onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter avatar URL..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsNewMemberOpen(false)}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateMember}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Add Member
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={isEditMemberOpen}
        onClose={() => setIsEditMemberOpen(false)}
        title="Edit Team Member"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Name
            </label>
            <input
              type="text"
              value={selectedMember?.name || ''}
              onChange={(e) => setSelectedMember(selectedMember ? {
                ...selectedMember,
                name: e.target.value
              } : null)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Role
            </label>
            <input
              type="text"
              value={selectedMember?.role || ''}
              onChange={(e) => setSelectedMember(selectedMember ? {
                ...selectedMember,
                role: e.target.value
              } : null)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={selectedMember?.email || ''}
              onChange={(e) => setSelectedMember(selectedMember ? {
                ...selectedMember,
                email: e.target.value
              } : null)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={selectedMember?.phone || ''}
              onChange={(e) => setSelectedMember(selectedMember ? {
                ...selectedMember,
                phone: e.target.value
              } : null)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Location
            </label>
            <input
              type="text"
              value={selectedMember?.location || ''}
              onChange={(e) => setSelectedMember(selectedMember ? {
                ...selectedMember,
                location: e.target.value
              } : null)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Avatar URL
            </label>
            <input
              type="url"
              value={selectedMember?.avatar || ''}
              onChange={(e) => setSelectedMember(selectedMember ? {
                ...selectedMember,
                avatar: e.target.value
              } : null)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsEditMemberOpen(false)}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditMember}
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
        onConfirm={handleDeleteMember}
        title="Delete Team Member"
        message={`Are you sure you want to remove ${selectedMember?.name} from the team? This action cannot be undone.`}
      />
    </div>
  );
};

export default TeamSection;
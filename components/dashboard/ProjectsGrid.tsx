import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Users as UsersIcon, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import DeleteDialog from '@/components/ui/DeleteDialog';

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  members: number;
  dueDate: string;
  status: string;
}

const ProjectsGrid = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Modern online shopping experience with AI recommendations',
      progress: 75,
      members: 8,
      dueDate: '2024-04-15',
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      description: 'Secure and intuitive mobile banking solution',
      progress: 40,
      members: 6,
      dueDate: '2024-05-20',
      status: 'Planning'
    }
  ]);

  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    dueDate: '',
    members: 1
  });

  const handleCreateProject = () => {
    const project: Project = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      progress: 0,
      members: newProject.members,
      dueDate: newProject.dueDate,
      status: 'Planning'
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '', dueDate: '', members: 1 });
    setIsNewProjectOpen(false);
  };

  const handleEditProject = () => {
    if (selectedProject) {
      setProjects(projects.map(p => 
        p.id === selectedProject.id ? selectedProject : p
      ));
      setIsEditProjectOpen(false);
    }
  };

  const handleDeleteProject = () => {
    if (selectedProject) {
      setProjects(projects.filter(p => p.id !== selectedProject.id));
      setSelectedProject(null);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage and track your ongoing projects</p>
        </div>
        
        <button
          onClick={() => setIsNewProjectOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="group bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 p-6 hover:border-yellow-500/50 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{project.description}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedProject(project);
                    setIsEditProjectOpen(true);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                  title="Edit project"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setIsDeleteOpen(true);
                  }}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 hover:text-red-400 transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <UsersIcon className="w-4 h-4" />
                <span>{project.members} members</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        title="Create New Project"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter project name..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              placeholder="Enter project description..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Team Members
              </label>
              <input
                type="number"
                value={newProject.members}
                onChange={(e) => setNewProject({ ...newProject, members: parseInt(e.target.value) })}
                min="1"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsNewProjectOpen(false)}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Create Project
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditProjectOpen}
        onClose={() => setIsEditProjectOpen(false)}
        title="Edit Project"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={selectedProject?.name || ''}
              onChange={(e) => setSelectedProject(selectedProject ? {
                ...selectedProject,
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
              value={selectedProject?.description || ''}
              onChange={(e) => setSelectedProject(selectedProject ? {
                ...selectedProject,
                description: e.target.value
              } : null)}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Progress
              </label>
              <input
                type="number"
                value={selectedProject?.progress || 0}
                onChange={(e) => setSelectedProject(selectedProject ? {
                  ...selectedProject,
                  progress: parseInt(e.target.value)
                } : null)}
                min="0"
                max="100"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Team Members
              </label>
              <input
                type="number"
                value={selectedProject?.members || 0}
                onChange={(e) => setSelectedProject(selectedProject ? {
                  ...selectedProject,
                  members: parseInt(e.target.value)
                } : null)}
                min="1"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsEditProjectOpen(false)}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditProject}
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
        onConfirm={handleDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProjectsGrid;
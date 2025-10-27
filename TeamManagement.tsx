/**
 * Team Management page for managing team members and permissions
 * Provides role-based access control and team collaboration features
 */
import React, { useState } from 'react';
import { Plus, Mail, Shield, Edit, Trash2, User } from 'lucide-react';
import { Button } from '../components/ui/button';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'pending';
  lastActive: string;
}

/**
 * Team management interface with member management and role assignments
 */
export function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'admin',
      status: 'active',
      lastActive: 'Now'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'manager',
      status: 'active',
      lastActive: '2 hours ago'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'user',
      status: 'pending',
      lastActive: 'Never'
    }
  ]);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'user' as const });

  const handleInviteMember = () => {
    if (newMember.name && newMember.email) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        status: 'pending',
        lastActive: 'Never'
      };
      setTeamMembers([...teamMembers, member]);
      setNewMember({ name: '', email: '', role: 'user' });
      setShowInviteForm(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'manager': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Management</h1>
          <p className="text-cyan-400">Manage team members and permissions</p>
        </div>
        <Button 
          onClick={() => setShowInviteForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Invite Team Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="bg-gray-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="bg-gray-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <select
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value as any })}
              className="bg-gray-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={handleInviteMember} className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">
              <Mail className="w-4 h-4 mr-2" />
              Send Invite
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowInviteForm(false)}
              className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700/50"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Team Members Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/20">
                <th className="text-left p-4 text-cyan-400 font-semibold">Member</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Role</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Status</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Last Active</th>
                <th className="text-left p-4 text-cyan-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-cyan-400 text-sm">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(member.role)}`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(member.status)}`}>
                      {member.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-400">{member.lastActive}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
          <p className="text-cyan-400 text-sm">Total Members</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {teamMembers.filter(m => m.status === 'active').length}
          </p>
          <p className="text-green-400 text-sm">Active</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {teamMembers.filter(m => m.role === 'admin').length}
          </p>
          <p className="text-blue-400 text-sm">Admins</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {teamMembers.filter(m => m.status === 'pending').length}
          </p>
          <p className="text-purple-400 text-sm">Pending</p>
        </div>
      </div>
    </div>
  );
}
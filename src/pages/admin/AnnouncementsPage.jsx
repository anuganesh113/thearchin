/**
 * Announcements Page
 * Create and manage school-wide announcements
 */

import { useState } from 'react';
import { Plus, Trash2, Bell } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const AnnouncementsPage = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useData();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: 'all',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement({
      ...formData,
      author: user?.name || 'Admin',
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      targetAudience: 'all',
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      deleteAnnouncement(id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Announcements</h1>
          <p className="text-secondary-600 mt-1">Create and manage school-wide announcements</p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            New Announcement
          </Button>
        )}
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 gap-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Bell className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-secondary-900">{announcement.title}</h3>
                      <Badge variant={getPriorityColor(announcement.priority)} size="sm">
                        {announcement.priority}
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        {announcement.targetAudience}
                      </Badge>
                    </div>
                    <p className="text-secondary-700 leading-relaxed">{announcement.content}</p>
                  </div>
                </div>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-danger" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-secondary-500 border-t border-secondary-200 pt-3">
                <span>Posted by: {announcement.author}</span>
                <span>•</span>
                <span>{announcement.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Announcement Modal */}
      <Modal
        isOpen={showModal}
        onClose={resetForm}
        title="Create New Announcement"
        footer={
          <>
            <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSubmit}>Post Announcement</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter announcement title"
            required
          />
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Content <span className="text-danger">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="5"
              placeholder="Enter announcement content"
              required
            />
          </div>
          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            options={[
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />
          <Select
            label="Target Audience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleInputChange}
            options={[
              { value: 'all', label: 'Everyone' },
              { value: 'students', label: 'Students Only' },
              { value: 'teachers', label: 'Teachers Only' },
              { value: 'parents', label: 'Parents Only' },
            ]}
          />
        </form>
      </Modal>
    </div>
  );
};

export default AnnouncementsPage;

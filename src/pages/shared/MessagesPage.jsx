/**
 * Messages Page (Shared across roles)
 * Messaging system for communication between users
 */

import { useState } from 'react';
import { Plus, Send, Inbox, SentIcon } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const MessagesPage = () => {
  const { messages, sendMessage, markMessageAsRead, getUserMessages } = useData();
  const { user } = useAuth();
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');
  const [formData, setFormData] = useState({
    to: '',
    toName: '',
    subject: '',
    content: '',
  });

  const userMessages = getUserMessages(user?.id || '');
  const inbox = userMessages.filter(m => m.to === user?.id);
  const sent = userMessages.filter(m => m.from === user?.id);
  const displayMessages = activeTab === 'inbox' ? inbox : sent;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({
      ...formData,
      from: user?.id,
      fromName: user?.name,
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      to: '',
      toName: '',
      subject: '',
      content: '',
    });
    setShowComposeModal(false);
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowViewModal(true);
    if (!message.read && message.to === user?.id) {
      markMessageAsRead(message.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Messages</h1>
          <p className="text-secondary-600 mt-1">Communicate with teachers, students, and parents</p>
        </div>
        <Button onClick={() => setShowComposeModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Compose
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <div className="flex gap-4 border-b border-secondary-200 -mt-6 -mx-6 px-6">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'inbox'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            <Inbox className="w-5 h-5 inline-block mr-2" />
            Inbox ({inbox.filter(m => !m.read).length})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'sent'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            <SentIcon className="w-5 h-5 inline-block mr-2" />
            Sent ({sent.length})
          </button>
        </div>

        {/* Messages List */}
        <div className="space-y-2 mt-6">
          {displayMessages.length === 0 ? (
            <div className="text-center py-12 text-secondary-500">
              No messages found
            </div>
          ) : (
            displayMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleViewMessage(message)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  !message.read && message.to === user?.id
                    ? 'bg-primary-50 border-primary-200 hover:bg-primary-100'
                    : 'bg-white border-secondary-200 hover:bg-secondary-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-secondary-900">
                        {activeTab === 'inbox' ? message.fromName : message.toName}
                      </p>
                      {!message.read && message.to === user?.id && (
                        <Badge variant="primary" size="sm">New</Badge>
                      )}
                    </div>
                    <p className="font-medium text-secondary-800">{message.subject}</p>
                    <p className="text-sm text-secondary-600 line-clamp-2 mt-1">
                      {message.content}
                    </p>
                  </div>
                  <span className="text-xs text-secondary-500">{message.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Compose Modal */}
      <Modal
        isOpen={showComposeModal}
        onClose={resetForm}
        title="Compose Message"
        footer={
          <>
            <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSubmit}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Recipient ID"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            placeholder="e.g., teacher1, student1"
            required
          />
          <Input
            label="Recipient Name"
            name="toName"
            value={formData.toName}
            onChange={handleInputChange}
            placeholder="Enter recipient's name"
            required
          />
          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Enter message subject"
            required
          />
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="6"
              placeholder="Type your message here..."
              required
            />
          </div>
        </form>
      </Modal>

      {/* View Message Modal */}
      {selectedMessage && (
        <Modal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title="Message Details"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary-600">From</p>
              <p className="font-medium text-secondary-900">{selectedMessage.fromName}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-600">To</p>
              <p className="font-medium text-secondary-900">{selectedMessage.toName}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Subject</p>
              <p className="font-medium text-secondary-900">{selectedMessage.subject}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Date</p>
              <p className="font-medium text-secondary-900">{selectedMessage.date}</p>
            </div>
            <div className="border-t border-secondary-200 pt-4">
              <p className="text-sm text-secondary-600 mb-2">Message</p>
              <p className="text-secondary-900 leading-relaxed">{selectedMessage.content}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MessagesPage;

/**
 * Students Management Page (Admin)
 * Full CRUD operations for student records
 */

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';

const StudentsPage = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    grade: '',
    class: '',
    bloodGroup: '',
    status: 'Active',
  });

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === '' || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  // Handle form input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      updateStudent(selectedStudent.id, formData);
    } else {
      addStudent(formData);
    }
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      grade: '',
      class: '',
      bloodGroup: '',
      status: 'Active',
    });
    setSelectedStudent(null);
    setShowModal(false);
  };

  // Handle edit
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      grade: student.grade,
      class: student.class,
      bloodGroup: student.bloodGroup,
      status: student.status,
    });
    setShowModal(true);
  };

  // Handle view
  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Handle delete
  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Student ID',
      accessor: 'studentId',
    },
    {
      header: 'Name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full" />
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Grade',
      accessor: 'grade',
    },
    {
      header: 'Class',
      accessor: 'class',
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(row)}
            className="p-1 hover:bg-secondary-100 rounded"
          >
            <Eye className="w-4 h-4 text-info" />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="p-1 hover:bg-secondary-100 rounded"
          >
            <Edit className="w-4 h-4 text-primary-600" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1 hover:bg-secondary-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-danger" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Students Management</h1>
          <p className="text-secondary-600 mt-1">Manage student records and enrollments</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Select
            name="filterGrade"
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            placeholder="Filter by Grade"
            options={[
              { value: '9', label: 'Grade 9' },
              { value: '10', label: 'Grade 10' },
              { value: '11', label: 'Grade 11' },
              { value: '12', label: 'Grade 12' },
            ]}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary-600">
              Total: <span className="font-semibold">{filteredStudents.length}</span> students
            </span>
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <Table columns={columns} data={filteredStudents} />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={resetForm}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {selectedStudent ? 'Update' : 'Add'} Student
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
            <Select
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
              options={[
                { value: '9', label: 'Grade 9' },
                { value: '10', label: 'Grade 10' },
                { value: '11', label: 'Grade 11' },
                { value: '12', label: 'Grade 12' },
              ]}
            />
            <Input
              label="Class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              placeholder="e.g., 10-A"
              required
            />
            <Select
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
              ]}
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="md:col-span-2"
              required
            />
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                { value: 'Graduated', label: 'Graduated' },
              ]}
            />
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      {selectedStudent && (
        <Modal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title="Student Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-20 h-20 rounded-full" />
              <div>
                <h3 className="text-xl font-bold text-secondary-900">{selectedStudent.name}</h3>
                <p className="text-secondary-600">{selectedStudent.studentId}</p>
                <Badge variant={selectedStudent.status === 'Active' ? 'success' : 'danger'}>
                  {selectedStudent.status}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary-600">Email</p>
                <p className="font-medium">{selectedStudent.email}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Phone</p>
                <p className="font-medium">{selectedStudent.phone}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Date of Birth</p>
                <p className="font-medium">{selectedStudent.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Gender</p>
                <p className="font-medium">{selectedStudent.gender}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Grade</p>
                <p className="font-medium">Grade {selectedStudent.grade}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Class</p>
                <p className="font-medium">{selectedStudent.class}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Blood Group</p>
                <p className="font-medium">{selectedStudent.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Admission Date</p>
                <p className="font-medium">{selectedStudent.admissionDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-secondary-600">Address</p>
                <p className="font-medium">{selectedStudent.address}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StudentsPage;

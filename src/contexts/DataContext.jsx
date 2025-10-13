/**
 * Data Context
 * Manages application data state for students, teachers, courses, etc.
 * Provides CRUD operations for all entities
 * In production, this would interact with a backend API
 */

import { createContext, useContext, useState } from 'react';
import {
  students as initialStudents,
  teachers as initialTeachers,
  courses as initialCourses,
  assignments as initialAssignments,
  grades as initialGrades,
  attendance as initialAttendance,
  announcements as initialAnnouncements,
  messages as initialMessages,
  events as initialEvents,
  schedules as initialSchedules,
} from '../data/mockData';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // State for all entities
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [courses, setCourses] = useState(initialCourses);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [grades, setGrades] = useState(initialGrades);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [messages, setMessages] = useState(initialMessages);
  const [events, setEvents] = useState(initialEvents);
  const [schedules, setSchedules] = useState(initialSchedules);

  // Student CRUD operations
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: `student${students.length + 1}`,
      studentId: `S2024${String(students.length + 1).padStart(3, '0')}`,
      avatar: `https://ui-avatars.com/api/?name=${student.name.replace(' ', '+')}&background=f59e0b&color=fff`,
    };
    setStudents([...students, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const getStudent = (id) => {
    return students.find(s => s.id === id);
  };

  // Teacher CRUD operations
  const addTeacher = (teacher) => {
    const newTeacher = {
      ...teacher,
      id: `teacher${teachers.length + 1}`,
      employeeId: `T${String(teachers.length + 1).padStart(3, '0')}`,
      avatar: `https://ui-avatars.com/api/?name=${teacher.name.replace(' ', '+')}&background=10b981&color=fff`,
    };
    setTeachers([...teachers, newTeacher]);
    return newTeacher;
  };

  const updateTeacher = (id, updatedData) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTeacher = (id) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  // Course CRUD operations
  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: `course${courses.length + 1}`,
    };
    setCourses([...courses, newCourse]);
    return newCourse;
  };

  const updateCourse = (id, updatedData) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // Assignment CRUD operations
  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: `assign${assignments.length + 1}`,
      submissions: [],
    };
    setAssignments([...assignments, newAssignment]);
    return newAssignment;
  };

  const updateAssignment = (id, updatedData) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const submitAssignment = (assignmentId, studentId, studentName) => {
    setAssignments(assignments.map(a => {
      if (a.id === assignmentId) {
        const newSubmission = {
          studentId,
          studentName,
          submittedDate: new Date().toISOString().split('T')[0],
          marksObtained: null,
          status: 'Submitted',
        };
        return {
          ...a,
          submissions: [...(a.submissions || []), newSubmission],
        };
      }
      return a;
    }));
  };

  // Grade CRUD operations
  const addGrade = (grade) => {
    setGrades([...grades, grade]);
  };

  const updateGrade = (studentId, courseId, updatedData) => {
    setGrades(grades.map(g => 
      g.studentId === studentId && g.courseId === courseId 
        ? { ...g, ...updatedData } 
        : g
    ));
  };

  const getStudentGrades = (studentId) => {
    return grades.filter(g => g.studentId === studentId);
  };

  // Attendance operations
  const markAttendance = (studentId, studentName, date, status, className) => {
    const newAttendance = {
      id: `att${attendance.length + 1}`,
      studentId,
      studentName,
      date,
      status,
      class: className,
    };
    setAttendance([...attendance, newAttendance]);
  };

  const getStudentAttendance = (studentId) => {
    return attendance.filter(a => a.studentId === studentId);
  };

  const getClassAttendance = (className, date) => {
    return attendance.filter(a => a.class === className && a.date === date);
  };

  // Announcement operations
  const addAnnouncement = (announcement) => {
    const newAnnouncement = {
      ...announcement,
      id: `ann${announcements.length + 1}`,
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    return newAnnouncement;
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  // Message operations
  const sendMessage = (message) => {
    const newMessage = {
      ...message,
      id: `msg${messages.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      read: false,
    };
    setMessages([newMessage, ...messages]);
    return newMessage;
  };

  const markMessageAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const getUserMessages = (userId) => {
    return messages.filter(m => m.to === userId || m.from === userId);
  };

  // Event operations
  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: `evt${events.length + 1}`,
    };
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const value = {
    // Data
    students,
    teachers,
    courses,
    assignments,
    grades,
    attendance,
    announcements,
    messages,
    events,
    schedules,
    // Student operations
    addStudent,
    updateStudent,
    deleteStudent,
    getStudent,
    // Teacher operations
    addTeacher,
    updateTeacher,
    deleteTeacher,
    // Course operations
    addCourse,
    updateCourse,
    deleteCourse,
    // Assignment operations
    addAssignment,
    updateAssignment,
    deleteAssignment,
    submitAssignment,
    // Grade operations
    addGrade,
    updateGrade,
    getStudentGrades,
    // Attendance operations
    markAttendance,
    getStudentAttendance,
    getClassAttendance,
    // Announcement operations
    addAnnouncement,
    deleteAnnouncement,
    // Message operations
    sendMessage,
    markMessageAsRead,
    getUserMessages,
    // Event operations
    addEvent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

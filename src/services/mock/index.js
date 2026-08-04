import MockAdapter from 'axios-mock-adapter';
import apiClient from '../api';
import { mockEmployees } from './data/employees';
import { mockDepartments } from './data/departments';
import { mockDesignations } from './data/designations';
import { mockHolidays } from './data/holidays';
import { mockLeaveRequests } from './data/leaves';
import { mockAttendance } from './data/attendance';

function getIdFromUrl(url, pattern) {
  const match = url.match(pattern);
  return match ? Number(match[1]) : null;
}

export function setupMock() {
  const mock = new MockAdapter(apiClient, { onNoMatch: 'passthrough' });

  mock.onGet('/employees').reply(200, mockEmployees);
  mock.onGet(/\/employees\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/employees\/(\d+)/);
    const emp = mockEmployees.find((e) => e.id === id);
    return emp ? [200, emp] : [404, { message: 'Employee not found' }];
  });
  mock.onPost('/employees').reply((config) => {
    const data = JSON.parse(config.data);
    const newEmp = {
      id: Date.now(),
      empId: `EMP-${String(mockEmployees.length + 1).padStart(3, '0')}`,
      avatar: '/assets/img/profiles/avatar-02.jpg',
      status: 'Active',
      ...data,
    };
    mockEmployees.unshift(newEmp);
    return [201, newEmp];
  });
  mock.onPut(/\/employees\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/employees\/(\d+)/);
    const idx = mockEmployees.findIndex((e) => e.id === id);
    if (idx === -1) return [404, { message: 'Employee not found' }];
    const data = JSON.parse(config.data);
    mockEmployees[idx] = { ...mockEmployees[idx], ...data };
    return [200, mockEmployees[idx]];
  });
  mock.onDelete(/\/employees\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/employees\/(\d+)/);
    const idx = mockEmployees.findIndex((e) => e.id === id);
    if (idx === -1) return [404, { message: 'Employee not found' }];
    mockEmployees.splice(idx, 1);
    return [204];
  });

  mock.onGet('/departments').reply(200, mockDepartments);
  mock.onPost('/departments').reply((config) => {
    const data = JSON.parse(config.data);
    const newDept = {
      id: Date.now(),
      employeeCount: Number(data.employeeCount) || 0,
      status: 'Active',
      ...data,
    };
    mockDepartments.unshift(newDept);
    return [201, newDept];
  });
  mock.onPut(/\/departments\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/departments\/(\d+)/);
    const idx = mockDepartments.findIndex((d) => d.id === id);
    if (idx === -1) return [404, { message: 'Department not found' }];
    const data = JSON.parse(config.data);
    mockDepartments[idx] = { ...mockDepartments[idx], ...data };
    return [200, mockDepartments[idx]];
  });
  mock.onDelete(/\/departments\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/departments\/(\d+)/);
    const idx = mockDepartments.findIndex((d) => d.id === id);
    if (idx === -1) return [404, { message: 'Department not found' }];
    mockDepartments.splice(idx, 1);
    return [204];
  });

  mock.onGet('/designations').reply(200, mockDesignations);
  mock.onPost('/designations').reply((config) => {
    const data = JSON.parse(config.data);
    const newDes = {
      id: Date.now(),
      employeeCount: Number(data.employeeCount) || 0,
      status: 'Active',
      ...data,
    };
    mockDesignations.unshift(newDes);
    return [201, newDes];
  });
  mock.onPut(/\/designations\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/designations\/(\d+)/);
    const idx = mockDesignations.findIndex((d) => d.id === id);
    if (idx === -1) return [404, { message: 'Designation not found' }];
    const data = JSON.parse(config.data);
    mockDesignations[idx] = { ...mockDesignations[idx], ...data };
    return [200, mockDesignations[idx]];
  });
  mock.onDelete(/\/designations\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/designations\/\d+/).match(/\/(\d+)/)?.[1];
    const idx = mockDesignations.findIndex((d) => d.id === Number(id));
    if (idx === -1) return [404, { message: 'Designation not found' }];
    mockDesignations.splice(idx, 1);
    return [204];
  });

  mock.onGet('/holidays').reply(200, mockHolidays);
  mock.onPost('/holidays').reply((config) => {
    const data = JSON.parse(config.data);
    const newHoliday = {
      id: Date.now(),
      status: data.status || 'Active',
      ...data,
      date: data.date || new Date().toISOString().split('T')[0],
    };
    mockHolidays.unshift(newHoliday);
    return [201, newHoliday];
  });
  mock.onPut(/\/holidays\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/holidays\/(\d+)/);
    const idx = mockHolidays.findIndex((h) => h.id === id);
    if (idx === -1) return [404, { message: 'Holiday not found' }];
    const data = JSON.parse(config.data);
    mockHolidays[idx] = { ...mockHolidays[idx], ...data };
    return [200, mockHolidays[idx]];
  });
  mock.onDelete(/\/holidays\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/holidays\/(\d+)/);
    const idx = mockHolidays.findIndex((h) => h.id === id);
    if (idx === -1) return [404, { message: 'Holiday not found' }];
    mockHolidays.splice(idx, 1);
    return [204];
  });

  mock.onGet('/leaves').reply(200, mockLeaveRequests);
  mock.onGet('/leaves/stats').reply(200, {
    totalPresent: '180/200',
    plannedLeaves: mockLeaveRequests.filter((l) => l.leaveType === 'Annual Leave').length * 2 + 8,
    unplannedLeaves: mockLeaveRequests.filter((l) => l.leaveType === 'Medical Leave' || l.leaveType === 'Casual Leave').length * 2 + 4,
    pendingRequests: mockLeaveRequests.filter((l) => l.status === 'Pending').length,
  });
  mock.onPost('/leaves').reply((config) => {
    const data = JSON.parse(config.data);
    const from = new Date(data.fromDate);
    const to = new Date(data.toDate);
    const diffDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24)) + 1;
    const newRequest = {
      id: Date.now(),
      empId: data.empId || 'EMP-001',
      employeeName: data.employeeName || 'Current Employee',
      department: data.department || 'General',
      avatar: data.avatar || '/assets/img/profiles/avatar-02.jpg',
      status: 'Pending',
      noOfDays: isNaN(diffDays) ? 1 : diffDays,
      ...data,
    };
    mockLeaveRequests.unshift(newRequest);
    return [201, newRequest];
  });
  mock.onPut(/\/leaves\/\d+/).reply((config) => {
    const id = getIdFromUrl(config.url, /\/leaves\/(\d+)/);
    const idx = mockLeaveRequests.findIndex((l) => l.id === id);
    if (idx === -1) return [404, { message: 'Leave not found' }];
    const data = JSON.parse(config.data);
    mockLeaveRequests[idx] = { ...mockLeaveRequests[idx], ...data };
    return [200, mockLeaveRequests[idx]];
  });
  mock.onPatch(/\/leaves\/\d+\/status/).reply((config) => {
    const match = config.url.match(/\/leaves\/(\d+)\/status/);
    const id = match ? Number(match[1]) : null;
    const { status } = JSON.parse(config.data);
    const item = mockLeaveRequests.find((l) => l.id === id);
    if (!item) return [404, { message: 'Leave not found' }];
    item.status = status;
    return [200, item];
  });
  mock.onDelete(/\/leaves\/\d+/).reply((config) => {
    const match = config.url.match(/\/leaves\/(\d+)/);
    if (!match) return [404, { message: 'Leave not found' }];
    const id = Number(match[1]);
    const idx = mockLeaveRequests.findIndex((l) => l.id === id);
    if (idx === -1) return [404, { message: 'Leave not found' }];
    mockLeaveRequests.splice(idx, 1);
    return [204];
  });

  mock.onGet('/attendance').reply(200, {
    stats: mockAttendance.stats,
    logs: mockAttendance.logs,
  });
  mock.onGet('/attendance/stats').reply(200, mockAttendance.stats);
  mock.onPut(/\/attendance\/logs\/\d+/).reply((config) => {
    const match = config.url.match(/\/attendance\/logs\/(\d+)/);
    const id = match ? Number(match[1]) : null;
    const idx = mockAttendance.logs.findIndex((l) => l.id === id);
    if (idx === -1) return [404, { message: 'Log not found' }];
    const data = JSON.parse(config.data);
    mockAttendance.logs[idx] = { ...mockAttendance.logs[idx], ...data };
    return [200, mockAttendance.logs[idx]];
  });

  return mock;
}

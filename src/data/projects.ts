// Projects data - using actual school projects and learning experiences
// Do not fabricate independent projects, freelance clients, or fake achievements

import { Project } from '../types';

export const projects: Project[] = [
  // Graduation Project - Featured
  {
    id: 'hotel-management',
    title: 'Hotel Management System',
    description: 'Comprehensive web-based hotel management solution built as graduation project at FPT College. Features room booking, customer management, billing, admin dashboard, employee management, and system logs for efficient hotel operations.',
    technologies: ['Java', 'JSP', 'MySQL', 'Servlet', 'HTML/CSS', 'JavaScript'],
    status: 'completed',
    featured: true,
    image: 'projects/hotel-logo.png',
    gallery: [
      'dashboard.png',
      'room-list.png',
      'booking-form.png',
      'customer-list.png',
      'room-detail.png',
      'khachvanglai.png',
      'nhatkyhethong.png',
      'quanlynhanvien.png',
      'voucher.png',
    ],
    stats: [
      { value: '66', label: 'Java Files' },
      { value: '8', label: 'Features' },
      { value: '8.5/10', label: 'Defense Score' },
    ],
    features: [
      'Online booking system with room type selection',
      'Real-time room status tracking',
      'Customer & employee management',
      'Complete billing & invoicing',
      'Revenue reports & KPI dashboard',
      'Voucher & discount system',
      'Role-based authentication',
      'System activity logs',
    ],
    dbTables: ['Users', 'Customers', 'Rooms', 'Bookings', 'Services', 'Bills', 'Employees', 'Vouchers'],
  },

  {
    id: 'quan-ly-showroom',
    title: 'Car Showroom Management System',
    description: 'Web-based management system for a car showroom, covering vehicle inventory, customer profiles, quotes, deposits, contracts, invoices, vehicle handover, warranty tracking, appointments, suppliers, employees, and a reporting dashboard.',
    technologies: ['Java', 'Servlet', 'JSP', 'JSTL', 'SQL Server', 'HikariCP'],
    status: 'completed',
    image: 'projects/showroom-logo.png',
    gallery: ['showroom-1.png', 'showroom-2.png', 'showroom-3.png', 'showroom-4.png'],
    stats: [
      { value: '67', label: 'Java Files' },
      { value: '10', label: 'Features' },
      { value: '8.0/10', label: 'Defense Score' },
    ],
    features: [
      'Vehicle inventory management (models, brands, photos)',
      'Customer profiles & lead/demand tracking',
      'Appointment scheduling',
      'Quotes & deposit handling',
      'Sales contracts & vehicle handover',
      'Invoicing & payment tracking',
      'Warranty & service history tracking',
      'Supplier & stock receipt management',
      'Employee accounts with role-based access',
      'Reporting dashboard',
    ],
    dbTables: [
      'HangXe', 'LoaiXe', 'NhaCungCap', 'NhanVien', 'TaiKhoan', 'KhachHang',
      'PhieuNhap', 'ChiTietNhap', 'Xe', 'AnhXe', 'NhuCauKhachHang', 'LichHen',
      'BaoGia', 'DatCoc', 'HopDong', 'BanGiao', 'HoaDon', 'ThanhToan', 'BaoHanh',
    ],
  },

  // Future project template:
  // {
  //   id: 'project-2',
  //   title: 'Real Project Name',
  //   description: 'Actual description of what was built and learned',
  //   technologies: ['React', 'TypeScript', 'GSAP'],
  //   status: 'in-progress',
  //   image: '/path/to/screenshot',
  //   github: 'https://github.com/nguyenvoi/project',
  //   demo: 'https://demo-url',
  //   featured: true,
  // },
];

// Helper function to filter projects by status
export const getProjectsByStatus = (status: Project['status']) =>
  projects.filter(project => project.status === status);

// Helper function to get featured projects
export const getFeaturedProjects = () =>
  projects.filter(project => project.featured);

// Helper function to get project by ID
export const getProjectById = (id: string) =>
  projects.find(project => project.id === id);

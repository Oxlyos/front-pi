// Consolidated interfaces for the e-learning application

// course-page interfaces
export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  // Add any other course-specific properties here
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string; // URL to YouTube, Vimeo, or other video provider
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  date: string; // Or a Date type if you prefer
  // Add any other assignment-specific properties here
}

export interface File {
  id: number;
  name: string;
  url: string; // URL to the downloadable file
  type: string; // e.g., 'pdf', 'pptx', 'doc'
}

// home-page & landing-page course interface (re-using Course from home-page but adding landing-page specific properties if needed)
export interface Course {
  id: number;
  title: string;
  description: string;
  instructor?: string; // Optional for landing page, required for home page
  image: string;
  rating: number;
  price: string;
  completed?: boolean; // Added for student dashboard progress tracking
  professorIntroduction?: string; // New: Professor's introduction specific to this course
  // Add any other course-related properties here
}

// landing-page specific interfaces
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export interface Professor {
  id: string;
  name: string;
  description: string;
  image: string;
  title: string; // Added for professor's role/expertise
  socialLinks: {
    linkedin?: string;
    // twitter?: string; // Removed as per user request
  };
}

// login-page interfaces
export interface LoginData {
  email: string;
  password: string;
  userType: 'student' | 'professor' | 'admin'; // Added userType for login, assuming it's sent
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string; // Optional: if your API returns a token
  user?: { // Optional: if your API returns user details upon successful login
    id: string;
    email: string;
    userType: 'student' | 'professor' | 'admin';
    // Add other user properties here
  };
}

// Student Dashboard specific interface
export interface Student {
  id: string;
  name: string;
  email: string;
  university: string;
  major: string;
  description: string;
  profileImage: string;
  userType: 'student';
}

export interface Announcement {
  id: number;
  content: string;
  professorName: string;
  professorTitle: string;
  timestamp: string; // Or Date type
}

// signup-page interfaces
export interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  userType: 'student' | 'professor'; // Assuming these are the main types
  termsAgreed: boolean;
  confirmPassword?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: { // Optional: if your API returns user details upon successful signup
    id: string;
    email: string;
    userType: 'student' | 'professor' | 'admin';
    // Add other user properties here
  };
}

// forum interfaces
export interface User {
  id: string;
  userName: string;
  role: 'Student' | 'Professor' | 'Admin';
  avatar: string;
}

export interface Reply {
  id: number;
  user: User;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  replies: Reply[];
}

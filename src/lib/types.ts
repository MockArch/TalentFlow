export type User = {
  name: string;
  email: string;
  avatar: string;
  role?: string;
  phone?: string;
  expertise?: string;
  availability?: string;
  status?: 'Active' | 'Inactive';
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  stage: 'Sourced' | 'Applied' | 'Interviewing' | 'Offer' | 'Hired' | 'Phone Screen';
  appliedDate: string;
  qualifications: string;
};

export type Interview = {
  id: string;
  candidate: Candidate;
  role: string;
  date: string;
  time: string;
  panelists: User[];
  status: 'Scheduled' | 'Completed' | 'Canceled';
};

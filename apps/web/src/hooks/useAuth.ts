import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/user';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setState({ isLoading: false, isAuthenticated: false });
      return;
    }

    // TODO: Fetch user data from API
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      defaultResumeJson: {
        firstName: 'John',
        lastName: 'Doe',
        city: 'San Francisco',
        province: 'CA',
        postalCode: '94105',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        professionalSummary:
          'Experienced software engineer with a passion for building scalable applications.',
        skills: ['React', 'TypeScript', 'Node.js'],
        workExperiences: [
          {
            jobTitle: 'Senior Software Engineer',
            employer: 'Tech Corp',
            city: 'San Francisco',
            province: 'CA',
            startDate: '2020-01',
            endDate: 'Present',
          },
        ],
        educations: [
          {
            schoolName: 'University of Technology',
            schoolLocation: 'San Francisco',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            graduationMonth: 'May',
            graduationYear: '2015',
          },
        ],
      },
    };
    setUser(mockUser);
    setState({
      isLoading: false,
      isAuthenticated: true,
    });
  }, [setUser]);

  return {
    ...state,
    user,
  };
}

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string;
  email: string;
  name?: string;
  defaultResumeJson?: any;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setState({ isLoading: false, isAuthenticated: false, user: null })
      return
    }

    // TODO: Fetch user data from API
    setState({
      isLoading: false,
      isAuthenticated: true,
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        defaultResumeJson: {
          firstName: "John",
          lastName: "Doe",
          city: "San Francisco",
          province: "CA",
          postalCode: "94105",
          phone: "+1 (555) 123-4567",
          email: "john.doe@example.com",
          professionalSummary: "Experienced software engineer with a passion for building scalable applications.",
          skills: ["React", "TypeScript", "Node.js"],
          workExperiences: [
            {
              jobTitle: "Senior Software Engineer",
              employer: "Tech Corp",
              city: "San Francisco",
              province: "CA",
              startDate: "2020-01",
              endDate: "Present"
            }
          ],
          educations: [
            {
              schoolName: "University of Technology",
              schoolLocation: "San Francisco",
              degree: "Bachelor of Science",
              fieldOfStudy: "Computer Science",
              graduationMonth: "May",
              graduationYear: "2015"
            }
          ]
        }
      },
    })
  }, [])

  return state
} 
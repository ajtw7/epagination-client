import { get } from '../authService/authService';
import { useQuery } from 'react-query';

// Function to fetch user profile
export const fetchUserProfile = async () => {
  const response = await get('/users/profile');
  return response.data[0];
};

// Custom hook to use the fetchUserProfile function
const useFetchUserProfile = () => {
  const {
    data: profileInfo,
    error,
    isLoading,
  } = useQuery('userProfile', fetchUserProfile);

  return { profileInfo, error, isLoading };
};

export default useFetchUserProfile;
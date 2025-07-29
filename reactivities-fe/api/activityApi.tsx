import axios from 'axios';

export const fetchActivities = async (): Promise<Activity[]> => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
    return res.data;
};
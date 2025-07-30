import axios from 'axios';

export const fetchActivities = async (): Promise<Activity[]> => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
    return res.data;
};
export const getActivityDetail = async (id: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities/${id}`);
    return res.data;
}

export const createActivity = async (newActivity: CreateActivityInput) => {
    const response = await axios.post("http://localhost:3000/api/activities", newActivity);
    console.log('📦 fetchActivities data:', response);
    return response.data;
}
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivity } from '@/api/activityApi';
import { QUERY_KEYS } from '@/constant/queryKey';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export function useCreateActivity() {
    const queryClient = useQueryClient();
    const navigate = useNavigate(); // 👈 để chuyển trang

    return useMutation({
        mutationFn: (newActivity: CreateActivityInput) => createActivity(newActivity),

        onSuccess: (data) => {
            console.log(' Activity created:', data);

            //  Cập nhật cache
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACTIVITIES });

            //  Thông báo toast
            toast.success('Tạo hoạt động thành công!');

            //  Chuyển hướng
            navigate('/activities'); // hoặc route khác tùy ý
        },

        onError: (error: any) => {
            toast.error('Tạo hoạt động thất bại!');
            console.error('❌ Error creating activity:', error);
        }
    });
}

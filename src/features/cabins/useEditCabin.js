import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success(`The cabin has been successfully edited!`);
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: error => {
            toast.error(error.message);
            console.error(error);
        },
    });

    return { isEditing, editCabin };
}

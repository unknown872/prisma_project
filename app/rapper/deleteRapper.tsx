"use client";
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Brand = {
    id: number;
    name: string;

}

const DeleteRapper = ({ rapper } : { rapper: Brand} ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    };
    const router = useRouter();
    const handleDelete = async (rapperId: number) => {
        await axios.delete(`/api/rappers/${rapperId}`);
        router.refresh();
        setIsOpen(false);
    }

    return (
        <div>
            <button className="btn-error btn-small" onClick={handleModal}>Delete Rapper</button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Are you sure to delete the rapper {rapper.name}?</h2>
                        
                        <div className="text-right">
                            <button type="submit" onClick={() => handleDelete(rapper.id)} className="btn btn-primary mr-2">Yes</button>
                            <button type='button' className='btn btn-danger' onClick={handleModal}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default DeleteRapper
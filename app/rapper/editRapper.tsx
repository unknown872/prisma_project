"use client";
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Brand = {
    id: number;
    name: string;

}

const EditRapper = ({ rapper } : { rapper: Brand} ) => {
    const [name, setName] = useState(rapper.name);
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    };
    const router = useRouter();
    const handleUpdate = async (e: SyntheticEvent)  => {
        e.preventDefault();
        await axios.patch(`/api/rappers/${rapper.id}`, {
            name: name
        })
        router.refresh();
        setIsOpen(false);
    }

    return (
        <div>
            <button className="btn mt-5 mb-5" onClick={handleModal}>Edit Rapper</button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Update Rapper {rapper.name}</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="floating_name" className="block text-sm text-gray-700">Name Of Rapper</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={ (e) => setName(e.target.value)}
                                    name="floating_name" 
                                    id="floating_name" 
                                    className="w-full px-3 py-2 rounded border" 
                                    placeholder="Enter name" 
                                    required 
                                />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button type='button' className='btn btn-danger' onClick={handleModal}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default EditRapper
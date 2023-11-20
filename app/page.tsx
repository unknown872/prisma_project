import React from "react"
import { PrismaClient } from "@prisma/client";
import AddRapper from "./rapper/addRapper";
import DeleteRapper from "./rapper/deleteRapper";
import EditRapper from "./rapper/editRapper";

const prisma = new PrismaClient();

const getRapper = async () => {
    const res = await prisma.brand.findMany({
        select: {
            id: true,
            name: true,
        }
    });
    return res;
}

const Rapper = async () => {
    const rapper = await getRapper();

    return (
        <div>
            <AddRapper />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rapper.map((rapper, index) => (
                            <tr key={rapper.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {rapper.name}
                                </td>
                                <td className="px-6 py-4 flex-justify-center">
                                    <DeleteRapper rapper={rapper}/>
                                    <EditRapper rapper={rapper}/>
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default Rapper
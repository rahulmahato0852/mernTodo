import React from 'react'
import { useAdmingetUsersQuery } from '../redux/apis/adminApi'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {


    const { data: userData } = useAdmingetUsersQuery()


    const data = {
        labels: userData && userData.map(item => item.name),
        datasets: [
            {
                label: '# of Votes',
                data: userData && userData.map(item => item.name),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };




    return <>


        <div className="w-full  my-10 p-5 ">

            <div className="w-[50%]"></div>
            <div className="w-[50%]">

                <Doughnut data={data} />;
            </div>






        </div>







    </>
}

export default AdminDashboard
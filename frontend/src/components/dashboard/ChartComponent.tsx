import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement);

const ChartComponent = ({ data }: any) => {
    console.log(data);
    // Prepare the data for the chart
    const chartData = {
        labels: data.map((item: any) => item._id),
        datasets: [
            {
                label: 'Total Votes',
                data: data.map((item: any) => item.votes_count),
                backgroundColor: 'rgba(2, 8, 23, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    return <Bar data={chartData} options={chartOptions} />;

}

export default ChartComponent





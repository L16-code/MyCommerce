import React, { useEffect, useRef } from 'react';
import { Chart, ChartType, registerables } from 'chart.js';
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Footer from "./footer";
// import Chart from 'chart.js/auto'
Chart.register(...registerables);
declare global {
    interface HTMLCanvasElement {
        chart?: Chart;
    }
}

const Dashboard: React.FC = () => {
    const lineChartRef = useRef<HTMLCanvasElement | null>(null);
    const pieChartRef = useRef<HTMLCanvasElement | null>(null);
    const barChartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Function to initialize a chart
        const initializeChart = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>, ChartType: ChartType, data: any) => {
            if (canvasRef.current) {
                // Ensure any existing chart on this canvas is destroyed first
                if (canvasRef.current && canvasRef.current.chart) {
                    canvasRef.current.chart.destroy();
                }

                // Initialize new chart
                canvasRef.current.chart = new Chart(canvasRef.current, {
                    type: ChartType,
                    data: data,
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        };

        // Example data for charts (replace with your actual data)
        const lineChartData = {
            labels: ['Label 1', 'Label 2', 'Label 3'],
            datasets: [
                {
                    label: 'Line Chart',
                    data: [10, 30, 20],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        };

        const pieChartData = {
            labels: ['Chrome', 'Firefox', 'IE'],
            datasets: [
                {
                    label: 'Browser Usage',
                    data: [4306, 3801, 1689],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                    borderWidth: 1
                }
            ]
        };

        const barChartData = {
            labels: ['Label A', 'Label B', 'Label C'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [50, 30, 40],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        };
        // Initialize charts on component mount 
        initializeChart(lineChartRef, 'line', lineChartData);
        initializeChart(pieChartRef, 'pie', pieChartData);
        initializeChart(barChartRef, 'bar', barChartData);

        // Clean up function to destroy charts on component unmount
        return () => {
            if (lineChartRef.current && lineChartRef.current.chart) {
                lineChartRef.current.chart.destroy();
            }
            if (pieChartRef.current && pieChartRef.current.chart) {
                pieChartRef.current.chart.destroy();
            }
            if (barChartRef.current && barChartRef.current.chart) {
                barChartRef.current.chart.destroy();
            }
        };
    }, []);

    return (
        <div className="wrapper">
            <Sidebar isAuthenticated={true} />
            <div className="main">
                <Navbar />
                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3">
                            <strong>Analytics</strong> Dashboard
                        </h1>
                        <div className="row">
                            <div className="col-xl-6 col-xxl-5 d-flex">
                                <div className="w-100">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Sales</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="truck" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">2.382</h1>
                                                    <div className="mb-0">
                                                        <span className="text-danger">
                                                            <i className="mdi mdi-arrow-bottom-right" /> -3.65%
                                                        </span>
                                                        <span className="text-muted">Since last week</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Visitors</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="users" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">14.212</h1>
                                                    <div className="mb-0">
                                                        <span className="text-success">
                                                            <i className="mdi mdi-arrow-bottom-right" /> 5.25%
                                                        </span>
                                                        <span className="text-muted">Since last week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Earnings</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="dollar-sign" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">$21.300</h1>
                                                    <div className="mb-0">
                                                        <span className="text-success">
                                                            <i className="mdi mdi-arrow-bottom-right" /> 6.65%
                                                        </span>
                                                        <span className="text-muted">Since last week</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col mt-0">
                                                            <h5 className="card-title">Orders</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="stat text-primary">
                                                                <i className="align-middle" data-feather="shopping-cart" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h1 className="mt-1 mb-3">64</h1>
                                                    <div className="mb-0">
                                                        <span className="text-danger">
                                                            <i className="mdi mdi-arrow-bottom-right" /> -2.25%
                                                        </span>
                                                        <span className="text-muted">Since last week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-xxl-7">
                                <div className="card flex-fill w-100">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Recent Movement</h5>
                                    </div>
                                    <div className="card-body py-3">
                                        <div className="chart chart-sm">
                                            <canvas id="chartjs-dashboard-line" ref={lineChartRef} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                                <div className="card flex-fill w-100">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Browser Usage</h5>
                                    </div>
                                    <div className="card-body d-flex">
                                        <div className="align-self-center w-100">
                                            <div className="py-3">
                                                <div className="chart chart-xs">
                                                    <canvas id="chartjs-dashboard-pie" ref={pieChartRef} />
                                                </div>
                                            </div>
                                            <table className="table mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>Chrome</td>
                                                        <td className="text-end">4306</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Firefox</td>
                                                        <td className="text-end">3801</td>
                                                    </tr>
                                                    <tr>
                                                        <td>IE</td>
                                                        <td className="text-end">1689</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                                <div className="card flex-fill w-100">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Real-Time</h5>
                                    </div>
                                    <div className="card-body px-4">
                                        <div className="chart">
                                            <canvas id="chartjs-dashboard-bar" ref={barChartRef} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Projects</h5>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover my-0">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th className="d-none d-xl-table-cell">Start Date</th>
                                                    <th className="d-none d-xl-table-cell">End Date</th>
                                                    <th>Status</th>
                                                    <th className="d-none d-md-table-cell">Assignee</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Project Apollo</td>
                                                    <td className="d-none d-xl-table-cell">01/01/2023</td>
                                                    <td className="d-none d-xl-table-cell">31/06/2023</td>
                                                    <td><span className="badge bg-success">Done</span></td>
                                                    <td className="d-none d-md-table-cell">Vanessa Tucker</td>
                                                </tr>
                                                <tr>
                                                    <td>Project Fireball</td>
                                                    <td className="d-none d-xl-table-cell">01/01/2023</td>
                                                    <td className="d-none d-xl-table-cell">31/06/2023</td>
                                                    <td><span className="badge bg-danger">Cancelled</span></td>
                                                    <td className="d-none d-md-table-cell">William Harris</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Dashboard;

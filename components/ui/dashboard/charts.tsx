"use client"
import Link from "next/link";
import { useState} from "react";
import { CircleAlertIcon, SearchIcon, BellIcon , Question} from "./icons";
import { Avatar } from '@nextui-org/react';
import BarListChart from "./barList";
import BarCharts from "./barChart";
import LineCharts from "./lineChart";
import { data, demoData, pages, keyWords, campaignsData } from "./dummyData";
import CampaignTable from './table'
import { format } from 'date-fns';

const DashboardChart = () => {
    const [value, setValue] = useState(0);
    const [startDate, setStartDate] = useState(new Date('2023-01-01').getTime());
    const [endDate, setEndDate] = useState(new Date('2023-12-31').getTime());
    const [filteredData, setFilteredData] = useState([]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
        const newValue = +event.target.value;
        if (isStart) {
            setValue(newValue);
        } else {
            setValue(newValue);
        }
        filterData(newValue)
    };


    const formatDate = (timestamp: number) => {
        return format(new Date(timestamp), 'MM/dd/yyyy');
    };
    const monthMilliseconds = 30.44 * 24 * 60 * 60 * 1000;

    const filterData = (selectedDate: number) => {
        const filtered: any = data.filter(entry => {
            const entryDate = new Date(entry.filterDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')).getTime();
            return entryDate >= selectedDate && entryDate <= endDate;
        });
        setFilteredData(filtered);
    };

    return (
        <div className="container mx-auto px-4 mb-8">
            <header className="flex items-center justify-between border-b border-gray-300 pb-4 mt-4">
                <div className="flex items-center space-x-4">
                    <CircleAlertIcon className="w-6 h-6 text-yellow-500" />
                    <div className="bg-orange-100 p-4 rounded-md flex items-center justify-between">
                        <span>There are 30 days left in your trial. </span>
                        <Link href="#" className="text-blue-500 ml-2" prefetch={false}>
                            Upgrade Account
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <SearchIcon className="w-6 h-6" />
                    <BellIcon className="w-6 h-6" />
                    <Question className="w-6 h-6" />
                    <Avatar className="w-8 h-8">
                        XD
                    </Avatar>
                </div>
            </header>
            <div>
                <div className="h-px bg-gray-300" />
                <h1 className="text-3xl font-bold mb-4 mt-4">Dashboard</h1>
                <div className="h-px bg-gray-200 mb-4" />
                <p className="text-xl mb-8">Welcome, Xue!</p>
            </div>
            <div className="mb-4 w-1/3 flex items-center mx-auto">
                <label htmlFor="startDateLabel" className="mr-2">{formatDate(startDate)}</label>
                <input
                    id="startDateLabel"
                    type="range"
                    className="w-full bg-orange-300 rounded-full"
                    min={startDate}
                    max={endDate}
                    step={monthMilliseconds}
                    value={value}
                    onChange={(event) => handleChange(event, true)}
                    title={formatDate(value)}
                />
                <label htmlFor="startDateLabel" className="ml-2">{formatDate(new Date().getTime())}</label>
            </div>
            <div className="grid grid-cols-4 gap-2">

                <LineCharts
                    title="View Through Rates"
                    subTitle="$231"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}
                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}
                />
                <LineCharts
                    title="Avg CPC"
                    subTitle="$231"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}

                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}
                />
                <LineCharts
                    title="Clicks"
                    subTitle="231"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}
                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}
                />
                <LineCharts
                    title="Conversion Rate"
                    subTitle="99%"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}
                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}

                />
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
                <LineCharts
                    title="Connection"
                    subTitle="1,231"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}
                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}
                />
                <LineCharts
                    title="Cost"
                    subTitle="$300.15"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}

                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}
                />
                <LineCharts
                    title="Cost/Conversion"
                    subTitle="$231"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}
                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}
                />
                <LineCharts
                    title="Impression"
                    subTitle="923"
                    data={filteredData.length ? filteredData : data}
                    categories={['Google']}
                    colors={['blue']}
                    showLegend={true}
                    showYAxis={true}
                    startEndOnly={false}
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Top Channels
                    </h2>
                    <h5 className="mb-4">
                        By Connections ,Revenue ,Speed
                    </h5>
                    <CampaignTable campaigns={campaignsData} />
                </div>
                <BarListChart
                    title="Top KeyWords"
                    data={keyWords}
                    cardClassName="w-full"
                    initialExtended={false}
                    maxCollapsedHeight="max-h-[300px]"
                />

            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <BarListChart
                    title="Top Pages"
                    data={pages}
                    cardClassName="w-full"
                    initialExtended={false}
                    maxCollapsedHeight="max-h-[300px]"
                />
                <BarCharts />
            </div>
        </div>
    );
};

export default DashboardChart;

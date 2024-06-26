"use client"
import { useState } from "react";
import PieChart from "../../charts/donutChart";
import LineCharts from "../../charts/lineChart";
import BarChartComponent from "../../charts/barChart";
import * as XLSX from 'xlsx';

import { Select, SelectItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const ChartType = [{ key: "bar", label: "Bar Graph" }, { key: "line_chart", label: "Line Graph" }, { key: "pie_chart", label: "Pie Chart" }]

const Report = () => {
    const [file, setFile] = useState<any>();
    const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
    const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
    const [selectedReports, setSelectedReports] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>();
    const [chartTypes, setChartTypes] = useState<any>();
    const [rawData, setRawData] = useState<any>();


    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const parseCSV = (csv: string) => {
        const lines = csv.split('\n');
        const result: any[] = [];
        const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));
        const uniqueCampaigns = new Set<string>();
        const uniqueChannels = new Set<string>();
        const numericFields = new Set<string>();

        for (let i = 1; i < lines.length; i++) {
            const obj: any = {};
            const currentLine = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                let value = currentLine[j]?.trim() || '';
                value = value.replace(/^"|"$/g, '');
                if (!isNaN(Number(value)) && value !== '') {
                    obj[headers[j]] = Number(value);
                    numericFields.add(headers[j]);
                } else {
                    obj[headers[j]] = value;
                }
            }
            if (obj.campaign) uniqueCampaigns.add(obj.campaign);
            if (obj.channel) uniqueChannels.add(obj.channel);
            result.push(obj);
        }
        setRawData(result)
        const groupedData = groupChartData(result, "campaign");
        setFilteredData(groupedData);
        setSelectedCampaigns(Array.from(uniqueCampaigns));
        setSelectedChannels(Array.from(uniqueChannels));
        setChartTypes(Array.from(numericFields));

    };

    const handleOnSubmit = (e: any) => {
        try {
            const fileReader = new FileReader();
            e.preventDefault();
            if (file) {
                fileReader.onload = function (event: any) {
                    const text = event.target.result;
                    if (typeof text === 'string') {
                        parseCSV(text);
                    } else {
                        const workbook = XLSX.read(text, { type: 'binary' });
                        const sheetName = workbook.SheetNames[0];
                        const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                        parseCSV(csv);
                    }
                };
                const fileName = file.name;
                const fileExtension = fileName.split('.').pop()?.toLowerCase();
                if (fileExtension === 'csv') {
                    fileReader.readAsText(file);
                } else {
                    fileReader.readAsArrayBuffer(file);
                }
                toast.success('File has been imported successfully.');
            } else {
                toast.error("Error While Importing File")
            }
        } catch {
            toast.error("Error While Importing File")
        }


    };

    const groupChartData = (data: any[], groupByKey: string): any => {
        return data.reduce((acc, item) => {
            const keyValue = item[groupByKey];
            const { [groupByKey]: _, ...groupData } = item;

            if (!acc[keyValue]) {
                acc[keyValue] = [];
            }
            acc[keyValue].push(groupData);
            return acc;
        }, {} as Record<string, any[]>);
    };
    const getRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const groupAndCalculateShares = (data: any[], groupByKey1: string, groupByKey2: string, numericalValueKey: string, key: string): any => {
        const groupedData: any = {};

        data.forEach(item => {
            const campaignKey = item[groupByKey1];
            const saleType = item[groupByKey2];
            const numericalValue = item[numericalValueKey];

            if (!groupedData[campaignKey]) {
                groupedData[campaignKey] = [];
            }

            const existingEntryIndex = groupedData[campaignKey].findIndex((entry: any) => entry.name === saleType);

            if (existingEntryIndex !== -1) {
                groupedData[campaignKey][existingEntryIndex].total += numericalValue;
            } else {
                groupedData[campaignKey].push({
                    name: saleType,
                    total: numericalValue,
                    share: '',
                    color: getRandomColor()
                });
            }
        });

        Object.keys(groupedData).forEach(campaignKey => {
            const totalCampaignValue = groupedData[campaignKey].reduce((total: number, sale: any) => total + sale.total, 0);

            groupedData[campaignKey].forEach((sale: any) => {
                sale.share = ((sale.total / totalCampaignValue) * 100).toFixed(1) + '%';
            });
        });
        let resultData = groupedData[key].map((obj: any) => {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key.replace(/^"(.*)"$/, '$1'), value])
            );
        });
        return resultData;
    };


    const transformDataForLineChart = (groupedData: any, valueKey: string): any[] => {
        const transformedData: any[] = [];
        Object.keys(groupedData).forEach(campaign => {
            groupedData[campaign].forEach((data: any) => {
                const { channel, date } = data;
                const value = data[valueKey];
                let dateEntry = transformedData.find(entry => entry.date === date);
                if (!dateEntry) {
                    dateEntry = { date };
                    transformedData.push(dateEntry);
                }
                if (!dateEntry[channel]) {
                    dateEntry[channel] = value;
                } else {
                    dateEntry[channel] += value;
                }
            });
        });
        return transformedData;
    };

    const transformData = (groupedData: any, valueKey: string, groupByKey: string, dateKey: string): any[] => {
        const transformedData: any[] = [];
        Object.keys(groupedData).forEach(group => {
            groupedData[group].forEach((data: any) => {
                const groupValue = data[groupByKey];
                const dateValue = data[dateKey];
                const value = data[valueKey];

                let groupEntry = transformedData.find(entry => entry[groupByKey] === groupValue && entry[dateKey] === dateValue);
                if (!groupEntry) {
                    groupEntry = { [dateKey]: dateValue };
                    transformedData.push(groupEntry);
                }
                if (!groupEntry[valueKey]) {
                    groupEntry[valueKey] = value;
                } else {
                    groupEntry[valueKey] += value;
                }
            });
        });
        return transformedData;
    };

    const handleSelect = (e: any) => {
        const array = e?.target?.value.split(",");
        if (e.target.name === "reports") {
            setSelectedReports(array)
        } else if (e.target.name === "charts") {
            setSelectedCharts(array)
        }
    }

    return (
        <div className="container mx-auto px-4 mb-8">
            <div>
                <div className="h-px bg-gray-300" />
                <h1 className="text-3xl font-bold mb-4 mt-4">Import</h1>
                <div className="h-px bg-gray-200 mb-4" />
                <p className="text-xl mb-8">Welcome, Xue!</p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-medium mt-4">
                    Click Browse button and choose a data file that you want to import.
                </p>
                <div className="items-center flex-row border border-red">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleOnChange}
                    />
                    <label
                        htmlFor="file-upload"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer"
                    >
                        Browse...
                    </label>
                    {file && (
                        <span className="items-center pointer-events-none">
                            <span className="text-gray-500 text-sm">{file.name}</span>
                        </span>
                    )}
                    <p className="mt-2 text-tremor-label text-tremor-content dark:text-dark-tremor-content">                You are only allowed to upload CSV, XLSX or XLS files.              </p>
                </div>
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-start"
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    Import
                </button>
                <div className="grid gap-2 grid-cols-3 items-start align-center">
                    {chartTypes ?
                        <Select
                            name="reports"
                            label="Select Report(s)"
                            placeholder="Select Report(s)"
                            selectionMode="multiple"
                            className="max-w-xs"
                            value={selectedReports}
                            onChange={(e: any) => { handleSelect(e) }}
                        >
                            {chartTypes && chartTypes.map((report: any) => (
                                <SelectItem key={report}>
                                    {report}
                                </SelectItem>
                            ))}
                        </Select>
                        : null}
                    {ChartType && chartTypes ?
                        <Select
                            name="charts"
                            label="Select Graph Type"
                            placeholder="Select Graph Type"
                            selectionMode="multiple"
                            className="max-w-xs"
                            value={selectedReports}
                            onChange={(e: any) => { handleSelect(e) }}
                        >
                            {ChartType && ChartType.map((report: any) => (
                                <SelectItem key={report.key}>
                                    {report.label}
                                </SelectItem>
                            ))}
                        </Select>
                        : null}
                    {chartTypes ?
                        <button
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Confirm Importing
                        </button> : null}
                </div>
                <br />
            </div>


            {selectedCharts.includes("line_chart") ? <div className="space-y-8" id="graphPart">
                <p className="text-lg font-semibold text-center mt-4">Line Graph</p>
                {selectedCampaigns?.map((group, rowIndex) => (
                    <div key={rowIndex} className="space-y-4">
                        <p className="text-lg font-semibold">{group}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {selectedReports?.map((chart, colIndex) => (
                                <div key={colIndex} className="bg-white p-4 rounded-lg shadow-md">
                                    <LineCharts
                                        title={chart}
                                        data={transformDataForLineChart(filteredData, chart)}
                                        categories={selectedChannels}
                                        colors={['blue', 'violet', 'fuchsia']}
                                        showLegend={true}
                                        showYAxis={true}
                                        startEndOnly={false}
                                        index="date"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> : null}
            {selectedCharts.includes("pie_chart") ? <div className="space-y-8" id="graphPart">
                <p className="text-lg font-semibold text-center mt-4">Pie Chart</p>
                {selectedCampaigns?.map((group, rowIndex) => (
                    <div key={rowIndex} className="space-y-4">
                        <p className="text-lg font-semibold">{group}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {selectedReports?.map((chart, colIndex) => (
                                <div key={colIndex} className="bg-white p-4 rounded-lg shadow-md">
                                    <PieChart
                                        title={chart}
                                        data={groupAndCalculateShares(rawData, 'campaign', "channel", chart, group)}
                                        categories="total"
                                        colors={['blue', 'violet', 'fuchsia']}
                                        showLegend={true}
                                        showYAxis={true}
                                        startEndOnly={false}
                                        index="name"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> : null}

            {selectedCharts.includes("bar") ? <div className="space-y-8" id="graphPart">
                <p className="text-lg font-semibold text-center mt-4">Bar Graph</p>
                {selectedCampaigns?.map((group, rowIndex) => (
                    <div key={rowIndex} className="space-y-4">
                        <p className="text-lg font-semibold">{group}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {selectedReports?.map((chart, colIndex) => (
                                <div key={colIndex} className="bg-white p-4 rounded-lg shadow-md">
                                    <BarChartComponent
                                        title={chart}
                                        data={transformDataForLineChart(filteredData, chart)}
                                        categories={selectedChannels}
                                        colors={['blue', 'violet', 'fuchsia']}
                                        index="date"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> : null
            }
        </div>
    );
};

export default Report;

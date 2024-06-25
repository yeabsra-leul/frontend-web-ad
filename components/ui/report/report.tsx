"use client"
import { useState } from "react";
import BarListChart from "../charts/barList";
import BarChartComponent from "../charts/barChart";
import LineCharts from "../charts/lineChart";
import { data, ChartData, Reports, Channels, Campaigns, chartsMetaData, chartsSet1 } from "../dummyData";
import { format } from 'date-fns';
import { Select, SelectItem, Button, Slider } from "@nextui-org/react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


const Report = () => {
    const [value, setValue] = useState(0);
    const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
    const [selectedReports, setSelectedReports] = useState<string[]>([]);
    const [startDate, setStartDate] = useState(new Date('2023-01-01').getTime());
    const [endDate, setEndDate] = useState(new Date('2023-12-31').getTime());
    const [filteredData, setFilteredData] = useState<any[]>();

    const handleChange = (event: any, isStart: boolean) => {
        const newValue = +event;
        if (isStart) {
            setValue(newValue);
        } else {
            setValue(newValue);
        }
        applyFilters()
    };


    const formatDate = (timestamp: number) => {
        return format(new Date(timestamp), 'MM/dd/yyyy');
    };
    const monthMilliseconds = 30.44 * 24 * 60 * 60 * 1000;


    type DataEntry = {
        channel: string;
        campaign: string;
        filterDate: any;
        date: any;
        view_through_rates: number;
        avg_cpc: number;
        clicks: number;
        conversion_rate: number;
        connection: number;
        cost: number;
        cost_conversion: number;
        impression: number;
    };


    type FilterCriteria = {
        channels: string[];
        campaigns: string[];
        startDate?: any;
        endDate?: any;
    };
    const filterData = (DataResource: any[], filters: FilterCriteria): DataEntry[] => {
        return DataResource.filter((entry) => {
            if (filters.channels.length > 0 && !filters.channels.includes(entry.channel)) {
                return false;
            }
            if (filters.campaigns.length > 0 && !filters.campaigns.includes(entry.campaign)) {
                return false;
            }

            if (filters.startDate && filters.endDate) {
                const filterDate = new Date(entry.filterDate);
                const startDate = new Date(filters.startDate);
                const endDate = new Date(filters.endDate);

                if (filterDate < startDate || filterDate > endDate) {
                    return false;
                }
            }
            return true;
        });
    };
    const applyFilters = () => {
        const filters: FilterCriteria = {
            channels: selectedChannels,
            campaigns: selectedCampaigns,
            startDate: value,
            endDate: endDate
        };

        const filteredData = filterData(ChartData, filters);
        setFilteredData(filteredData)
    };

    const handleSelect = (e: any) => {
        const array = e?.target?.value.split(",");
        if (e?.target?.name === "channels") {
            setSelectedChannels(array)
        } else if (e.target.name === "campaigns") {
            setSelectedCampaigns(array)
        } else if (e.target.name === "reports") {
            setSelectedReports(array)
        }
        applyFilters()
    }

    const downloadPDF = async () => {
        const pdf = new jsPDF();
        try {
            for (let i = 0; i < selectedReports.length; i++) {
                const data = selectedReports[i];
                let element = document.getElementById(data);
                if (!element || !isVisible(element)) {
                    throw new Error(`Element with id "${data}" not found or not visible.`);
                }
                const canvas = await html2canvas(element);
                const imgData = canvas.toDataURL("image/png");

                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const aspectRatio = imgWidth / imgHeight;
                const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
                const pdfHeight = pdfWidth / aspectRatio;
                if (i > 0) {
                    pdf.addPage();
                }
                const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
                const y = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;
                pdf.addImage(imgData, "PNG", x, y, pdfWidth, pdfHeight);
            }
            pdf.save("chart.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };
    function isVisible(elem: any) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }


    return (
        <div className="container mx-auto px-4 mb-8">
            <div>
                <div className="h-px bg-gray-300" />
                <h1 className="text-3xl font-bold mb-4 mt-4">Reports</h1>
                <div className="h-px bg-gray-200 mb-4" />
                <p className="text-xl mb-8">Welcome, Xue!</p>
            </div>
            <div className="mb-4 w-1/3 flex items-center mx-auto">
                <label htmlFor="startDateLabel" className="mr-2">{formatDate(value)}</label>
                <Slider
                    id="startDateLabel"
                    minValue={startDate}
                    maxValue={endDate}
                    step={monthMilliseconds}
                    value={value}
                    defaultValue={[startDate, endDate]}
                    onChange={(event: any) => handleChange(event, true)}
                    aria-label={formatDate(value)}
                    classNames={{
                        base: "max-w-md",
                        filler: "bg-orange-500"
                    }}

                />

                <label htmlFor="startDateLabel" className="ml-2">{formatDate(new Date().getTime())}</label>
            </div>

            <section className="w-full py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 md:grid-cols-[1fr_auto] items-start">
                        <div className="grid gap-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <Select
                                    name="reports"
                                    label="Select Report(s)"
                                    placeholder="Select Report(s)"
                                    selectionMode="multiple"
                                    className="max-w-xs"
                                    value={selectedReports}
                                    onChange={(e: any) => { handleSelect(e) }}
                                >
                                    {Reports.map((report) => (
                                        <SelectItem key={report.key}>
                                            {report.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    name="channels"
                                    label="Select Channel(s)"
                                    placeholder="Select Channel(s)"
                                    selectionMode="multiple"
                                    className="max-w-xs"
                                    value={selectedChannels}
                                    onChange={(e: any) => { handleSelect(e) }}
                                >
                                    {Channels.map((channel) => (
                                        <SelectItem key={channel.key}>
                                            {channel.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    name="campaigns"
                                    label="Select Campaign(s)"
                                    placeholder="Select Campaign(s)"
                                    selectionMode="multiple"
                                    className="max-w-xs"
                                    value={selectedCampaigns}
                                    onChange={(e: any) => { handleSelect(e) }}

                                >
                                    {Campaigns.map((campaign) => (
                                        <SelectItem key={campaign.key}>
                                            {campaign.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4">
                        <Button className="shrink-0 bg-[#ff7f00] text-white" onClick={() => downloadPDF()}>Export</Button>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-4 gap-2" id="charts-container">
                {chartsMetaData.map((chart, index) => (
                    <div key={index} id={`${chart.categories}`}>

                        <LineCharts
                            title={chart.title}
                            subTitle={chart.subTitle}
                            data={filteredData?.length ? filteredData : ChartData}
                            categories={chart.categories}
                            colors={chart.colors}
                            showLegend={false}
                            showYAxis={true}
                            startEndOnly={false}
                        />

                    </div>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4" id="charts-set-1">
                {chartsSet1.map((chart, index) => (
                    <div key={index} id={`${chart.categories}`}>
                        <LineCharts
                            title={chart.title}
                            subTitle={chart.subTitle}
                            data={filteredData?.length ? filteredData : ChartData}
                            categories={chart.categories}
                            colors={chart.colors}
                            showLegend={false}
                            showYAxis={true}
                            startEndOnly={false}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Report;

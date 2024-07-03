import Head from 'next/head';
import { useState } from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { Checkbox } from "@nextui-org/react";
interface ScheduleForm {
    reportName: string;
    format: string;
    startDate: string;
    recurring: boolean;
    repeats: string;
    startTime: string;
    endTime: string;
    email: string;
}

const ScheduleAutomationPage = () => {
    const [selectedReports, setSelectedReports] = useState([]);
    const [selectedRepeat, setSelectedRepeat] = useState([]);
    const [orientation, setOrientation] = useState("horizontal");
    const [checked, setChecked] = useState(false);
    const [scheduleForm, setScheduleForm] = useState<ScheduleForm>({
        reportName: '',
        format: '',
        startDate: '',
        recurring: false,
        repeats: '',
        startTime: '',
        endTime: '',
        email: '',
    });

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
    };
    const handleChanges = (event: any) => {
        setOrientation(event.target.value);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setScheduleForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(scheduleForm);
    };
    const chartTypes = ['Windows assets details report', 'Linux assets details report', 'Mac assets details report', 'Network devices details report', 'Cloud resources details report'];
    const repeatOptions = ['Daily', 'Weekly', 'Monthly'];
    return (
        <div className="container mx-auto p-8">
            <Head>
                <title>Schedule Automation Page</title>
            </Head>
            <h1 className="text-3xl font-bold mb-4">Schedule Automation Page</h1>

            <form onSubmit={handleFormSubmit}>
                <div className="mb-4 mt-4">
                    <label htmlFor="report-name" className="block text-gray-700 font-bold mb-2">
                        Report Name *
                    </label>
                    <Select
                        name="reports"
                        label="Select Report(s)"
                        placeholder="Select Report(s)"
                        selectionMode="multiple"
                        className="max-w-xs"
                        value={selectedReports}
                        onChange={(e: any) => { }}
                    >
                        {chartTypes && chartTypes.map((report: any) => (
                            <SelectItem key={report}>
                                {report}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="mb-4 flex gap-8">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Format</label>
                        <div className="mt-6">
                            <RadioGroup
                                label="Select Pdf Type"
                                orientation="horizontal"
                            >
                                <Radio value="Portrait">PDF (Portrait)</Radio>
                                <Radio value="Landscape">PDF (Landscape)</Radio>

                            </RadioGroup>
                        </div>
                    </div>
                    <div className='ml-12'>
                        <label className="block text-gray-700 font-bold mb-2">Schedule</label>
                        <div className="mt-2">

                            <div className="mt-6">
                                <RadioGroup
                                    label="Select Type"
                                    defaultValue="manual"
                                    orientation="horizontal"
                                    value={orientation}
                                    onChange={handleChanges}
                                >
                                    <Radio value="manual">Manual</Radio>
                                    <Radio value="schedule">Schedule</Radio>
                                </RadioGroup>
                            </div>

                        </div>
                    </div>
                </div>



                {orientation === "schedule" && (
                    <>
                        <div className="flex flex-row justify-start gap-6 mb-4">
                            <div>
                                <label htmlFor="start-date" className="block text-gray-700 font-bold mb-2">
                                    Start Date *
                                </label>
                                <div className="h-12">
                                    <DatePicker label="Birth date" className="max-w-[284px] h-full" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="start-time" className="block text-gray-700 font-bold mb-2">
                                    Start Time
                                </label>
                                <div className="h-97">
                                    <TimeInput
                                        labelPlacement="outside"
                                        defaultValue={new Time(11, 45)}
                                        className="h-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center">

                                <Checkbox defaultSelected name="recurring"
                                    checked={scheduleForm.recurring}
                                    aria-labelledby="recurring"
                                    onChange={(e) => { handleChange(e) }}> Recurring</Checkbox>

                            </div>
                        </div>

                        {checked && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="repeats" className="block text-gray-700 font-bold mb-2">
                                        Repeats
                                    </label>
                                    <Select
                                        name="repeat"
                                        label="Repeat"
                                        placeholder="Select Repeat Option"
                                        className="max-w-xs"
                                        value={selectedRepeat}
                                        onChange={(e: any) => { }}
                                    >
                                        {repeatOptions && repeatOptions.map((option: any) => (
                                            <SelectItem key={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </>
                        )}
                        {!scheduleForm.recurring && (
                            <div className="flex flex-row justify-start gap-6 mb-4">
                                <div>
                                    <label htmlFor="start-date" className="block text-gray-700 font-bold mb-2">
                                        End Date *
                                    </label>
                                    <DatePicker label="Birth date" className="max-w-[284px]" />
                                </div>
                                <div>
                                    <label htmlFor="start-time" className="block text-gray-700 font-bold mb-2  cmax-w-[284px]">
                                        End Time
                                    </label>
                                    <TimeInput
                                        labelPlacement="outside"
                                        defaultValue={new Time(11, 45)}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={scheduleForm.email}
                        onChange={handleFormChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email address"
                    />
                </div>

                <button type="submit" className="bg-orange-500  hover:bg-orange-700  text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <span>OK</span>
                </button>
            </form>

        </div>
    );
};

export default ScheduleAutomationPage;
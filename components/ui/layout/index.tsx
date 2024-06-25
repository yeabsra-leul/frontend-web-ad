"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import logo from '@/public/logo/logo.jpg'
import {
    LayoutDashboardIcon,
    UsersIcon,
    FileIcon,
    CreditCardIcon,
    DollarSignIcon,
    FolderIcon,
    UserIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '../dashboard/icons';
import { CircleAlertIcon, SearchIcon, BellIcon, Question } from "../dashboard/icons";
import { useState } from "react";
import { Avatar } from '@nextui-org/react';

export default function Layout(props: any) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex">
            <aside className="w-1/5 bg-[#ff7f00] text-white p-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="px-4 py-2">
                        <h2 className="text-xl font-bold">mi.consulting</h2>
                        <p className="text-sm">Owner</p>
                        {isOpen &&
                            <div className="mt-auto">
                                <Link href="#" className="block py-2 px-4" prefetch={false}>
                                    Profile 1
                                </Link>
                                <Link href="#" className="block py-2 px-4" prefetch={false}>
                                    profile 2
                                </Link>
                            </div>
                        }
                    </div>
                    <div>
                        {isOpen && <ChevronUpIcon className="ml-auto w-12 h-12" onClick={() => toggleSubMenu()} />}
                        {!isOpen && <ChevronDownIcon className="ml-auto w-12 h-12" onClick={() => toggleSubMenu()} />}
                    </div>

                </div>
                <div className="h-px bg-gray-200 mb-4 mt-4" />
                <Nav />
                <div className="h-px bg-gray-200 mb-4 mt-4" />
                <div className="mt-auto">
                    <Link href="#" className="block py-2 px-4" prefetch={false}>
                        Team Members
                    </Link>
                    <Link href="#" className="block py-2 px-4" prefetch={false}>
                        Billing
                    </Link>
                    <Link href="#" className="block py-2 px-4" prefetch={false}>
                        Integrations
                    </Link>
                    <Link href="#" className="block py-2 px-4" prefetch={false}>
                        Settings
                    </Link>
                    
                    
                </div>
                <div className="flex items-center justify-center mt-4"> {/* Adjust margin top as needed */}
                <Link href="#" className="flex items-center">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={50}
                        height={100}
                    />
                </Link>
            </div>

            </aside>
            <main className="w-full">
                <header className="flex items-center justify-between border-b border-gray-300 pb-4 mt-4 p-4">
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
                {props.children}
            </main>
        </div>
    )
}

interface NavLinkProps {
    href: string;
    icon: any;
    label: string;
    isActive?: boolean;
    submenu?: SubNavLinkData[];
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, label, submenu }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div
            className={`block px-4 cursor-pointer ${isActive ? 'py-2 ' : ''}`}
            onClick={toggleSubMenu}

        >
            <Link href={href} prefetch={false} className={`block py-0 px-4 cursor-pointer ${isActive ? 'bg-white text-[#ff7f00] rounded-md py-1' : ''}`}>
                <div className="flex items-center">
                    <Icon className="inline-block w-5 h-5 mr-2" />
                    <span>{label}</span>
                    {submenu && isOpen && <ChevronUpIcon className="ml-auto w-8 h-8" />}
                    {submenu && !isOpen && <ChevronDownIcon className="ml-auto w-8 h-8" />}
                </div>
            </Link>
            {isOpen && submenu && (
                <ul className="pl-4">
                    {submenu.map((submenuItem, index) => (
                        <li key={index}>
                            <Link href={submenuItem.href} prefetch={false} className="block py-2 px-4">
                                {submenuItem.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>


    );
};
interface SubNavLinkData {
    href: string;
    label: string;
}

interface NavLinkData {
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    label: string;
    isActive?: boolean;
    submenu?: SubNavLinkData[];
}


const navLinks: NavLinkData[] = [
    { href: '/dashboard', icon: LayoutDashboardIcon, label: 'Dashboard' },
    {
        href: '#',
        icon: UsersIcon,
        label: 'Channels',
        submenu: [
            { href: '#', label: 'Public' },
            { href: '#', label: 'Private' },
        ],
    },
    {
        href: '#', icon: FileIcon, label: 'Campagins', submenu: [
            { href: '#', label: 'Campaigns' },
            { href: '#', label: 'Ad Gap' },
            { href: '#', label: 'Ads' }
        ],
    },
    { href: '#', icon: FileIcon, label: 'Analytics' },
    {
        href: '/reports',
        icon: CreditCardIcon,
        label: 'Reports',
        submenu: [
            { href: '#', label: 'Export' },
            { href: '#', label: 'Import' },
            { href: '#', label: 'Schedule Automation' }
        ],
    },
    { href: '#', icon: DollarSignIcon, label: 'Insights' },
    { href: '#', icon: FolderIcon, label: 'E-commerce' },
];

const Nav: React.FC = () => {
    return (
        <nav className="space-y-4">
            {navLinks.map((link, index) => (
                <NavLink
                    key={index}
                    href={link.href}
                    icon={link.icon}
                    label={link.label}
                    submenu={link.submenu}
                />
            ))}
        </nav>
    );
};
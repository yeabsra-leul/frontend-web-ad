"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
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
} from './icons';
import { useState } from "react";

export default function DashBoard(props: any) {
    return (
        <div className="flex">
            <aside className="w-1/5 bg-[#ff7f00] text-white p-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-bold">mi.consulting</h2>
                        <p className="text-sm">Owner</p>
                    </div>
                    <UserIcon className="w-8 h-8" />
                </div>
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
            </aside>
            <main className="w-full">
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
        <div>
            <div
                className={`block py-2 px-4 cursor-pointer ${isActive ? 'bg-white text-[#ff7f00] rounded-md' : ''}`}
                onClick={toggleSubMenu}
            >
                <div className="flex items-center">
                    <Icon className="inline-block w-5 h-5 mr-2" />
                    <span>{label}</span>
                    {submenu && isOpen  && <ChevronUpIcon className="ml-auto w-12 h-12" />}
                    {submenu && !isOpen && <ChevronDownIcon className="ml-auto w-12 h-12" />}
                </div>
            </div>
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
    { href: '#', icon: FileIcon, label: 'Campagins',submenu: [
        { href: '#', label: 'Campaigns' },
        { href: '#', label: 'Ad Gap' },
        { href: '#', label: 'Ads' }
    ], },
    { href: '#', icon: FileIcon, label: 'Analytics' },
    {
        href: '#',
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
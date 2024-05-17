import clsx from 'clsx';
import Link from 'next/link';
import { PlusIcon, PencilIcon, StopIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import {Tooltip} from "@nextui-org/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CreateAd() {
  return (
    <Link
      href="/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Ad</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdateAd({ id }: { id: string }) {
  return (
    <Tooltip content={"Edit"} offset={-4}>
      <Link
      href={`/ad/manage/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
    </Tooltip>
  );
}

export function StopAd({ id }: { id: string }) {
  const stopAdWithId = "Stopped the Ad";
  return (
    <form action={stopAdWithId}>
      <Tooltip content={"Stop"} offset={-4}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Stop</span>
        <StopIcon className="w-4" />
      </button>
      </Tooltip>
    </form>
  );
}

export function RepostAd({ id }: { id: string }) {
  const repostAdWithId = "Reposted the Ad";
  return (
    <form action={repostAdWithId}>
      <Tooltip content={"Repost"} offset={-4}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Repost</span>
          <ArrowUpOnSquareIcon className="w-4" />
        </button>
      </Tooltip>
      
    </form>
  );
}

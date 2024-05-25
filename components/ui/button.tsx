'use client';

import Link from 'next/link';
import { PlusIcon, PencilIcon, StopIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import {Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

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
      href={`/${id}/update`}
      className="rounded-md border p-2 bg-zinc-300 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
    </Tooltip>
  );
}

export function StopAd({ id }: { id: string }) {
  const stopAdWithId = "Stopped the Ad";
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <form action={stopAdWithId}>
      <Tooltip content={"Stop"} offset={-4}>
      <Button className="rounded-md border p-2 hover:bg-gray-100 min-w-0" onPress={onOpen}>
        <span className="sr-only">Stop</span>
        <StopIcon className="w-4" />
      </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top' classNames={{base:"bg-white"}}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Stop Ad</ModalHeader>
              <ModalBody>
                <p> 
                 Do you really want to stop this ad?
                </p>               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>
                  No
                </Button>
                <Button color="primary" onPress={onClose} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
}

export function RepostAd({ id }: { id: string }) {
  const repostAdWithId = "Reposted the Ad";
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <form action={repostAdWithId}>
      <Tooltip content={"Repost"} offset={-4}>
        <Button className="rounded-md border p-2 hover:bg-gray-100 min-w-0" onPress={onOpen}>
          <span className="sr-only">Repost</span>
          <ArrowUpOnSquareIcon className="w-4" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top' classNames={{base:"bg-white"}}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Repost Ad</ModalHeader>
              <ModalBody>
                <p> 
                 Do you really want to repost this ad?
                </p>               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>
                  No
                </Button>
                <Button color="primary" onPress={onClose} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
}

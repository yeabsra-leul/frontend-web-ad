'use client';

import React from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, StopIcon, EyeIcon, TrashIcon, ArrowUpOnSquareStackIcon } from '@heroicons/react/24/outline';
import {Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { redirect, useRouter } from 'next/navigation';
import { deleteAd, deleteGroup, publishAd, unpublishAd, deleteCampaign } from '@/lib/api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useState } from 'react';



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
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/${id}/update`);
  };
  return (
    <Tooltip content={"Edit"} offset={-4}>
    <Button onClick={handleRedirect}
    className="rounded-md border p-2 hover:bg-gray-100 min-w-0">
      <PencilIcon className="w-5" />
    </Button>
    </Tooltip>
  );
}

export function AdDetails({ id }: { id: string }) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/${id}`);
  };
  return (
    <Tooltip content={"Details"} offset={-4}>
    <Button onClick={handleRedirect}
    className="rounded-md border p-2 hover:bg-gray-100 min-w-0">
      <EyeIcon className="w-5" />
    </Button>
    </Tooltip>
  );
}

export function StopAd({ id }: { id: string }) {
  const stopAdWithId = "Stopped the Ad";
  const {isOpen, onOpen,onClose, onOpenChange} = useDisclosure();
  const stopAdHandler = async (id:string) => {
    await unpublishAd(id);
    Cookies.set('notification_stop_ad', 'The ad is stopped successfully!');
    onClose(); // Close the modal
    location.reload();
  };
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
                <Button color="primary" onPress={()=>stopAdHandler(id)} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
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

export function PostAd({ id }: { id: string }) {
  const postAdWithId = "Posted the Ad";
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const repostAdHandler = async (id:string) => {
    await publishAd(id);
    Cookies.set('notification_post_ad', 'The ad is posted successfully!');
    onClose(); // Close the modal
    location.reload();
  };
  return (
    <form action={postAdWithId}>
      <Tooltip content={"Post"} offset={-4}>
        <Button className="rounded-md border p-2 hover:bg-gray-100 min-w-0" onPress={onOpen}>
          <span className="sr-only">Post</span>
          <ArrowUpOnSquareStackIcon className="w-4" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top' classNames={{base:"bg-white"}}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Post Ad</ModalHeader>
              <ModalBody>
                <p> 
                 Do you really want to post this ad?
                </p>               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>
                  No
                </Button>
                <Button color="primary" onPress={()=>repostAdHandler(id)} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
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

export function DeleteAd({ id }: { id: string }) {
  const deleteAdWithId = "Deleted the Ad";
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const deleteAdHandler = async (id:string) => {
    await deleteAd(id);
    Cookies.set('notification_delete_ad', 'The ad is deleted successfully!');
    onClose(); // Close the modal
    location.reload();
  };
  return (
    <form action={deleteAdWithId}>
      <Tooltip content={"Delete"} offset={-4}>
        <Button className="rounded-md border p-2 hover:bg-gray-100 min-w-0" onPress={onOpen}>
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top' classNames={{base:"bg-white"}}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Ad</ModalHeader>
              <ModalBody>
                <p> 
                 Do you really want to delete this ad?
                </p>               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>
                  No
                </Button>
                <Button color="primary" onPress={()=>deleteAdHandler(id)} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
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

export function CreateAdGroup() {
  return (
    <Link
      href="/group/create"
      className="flex h-10 items-center w-56 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Ad Group</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAdGroup({ id }: { id: string }) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/group/${id}/update`);
  };
  return (
    <Tooltip content={"Edit"} offset={-4}>
    <Button onClick={handleRedirect}
    className="rounded-md border p-2 hover:bg-gray-100 min-w-0">
      <PencilIcon className="w-5" />
    </Button>
    </Tooltip>
  );
}


export function DeleteAdGroup({ id }: { id: string }) {
  const deleteAdWithId = "Deleted the Ad Group";
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const deleteAdHandler = async (id:string) => {
    await deleteGroup(id);
    Cookies.set('notification_delete_adgroup', 'The ad group is deleted successfully!');
    onClose(); // Close the modal
    location.reload();
  };
  return (
    <form action={deleteAdWithId}>
      <Tooltip content={"Delete"} offset={-4}>
        <Button className="rounded-md border p-2 hover:bg-gray-100 min-w-0" onPress={onOpen}>
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top' classNames={{base:"bg-white"}}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Ad Group</ModalHeader>
              <ModalBody>
                <p> 
                 Do you really want to delete this ad group?
                </p>               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>
                  No
                </Button>
                <Button color="primary" onPress={()=>deleteAdHandler(id)} className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
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

// export function DeleteCampaignButton({id}:{id:string}) {
//   const handleDelete = async () => {
//       const userConfirmed = window.confirm("Are you sure you want to delete this campaign?");
//       if (userConfirmed) {
//           console.log('delete campaign:'+id);
//           await deleteCampaign(id);
//           Cookies.set('notification_delete_campaign', 'The campaign is deleted successfully!');
//           location.reload();
//       }
//   };

//   return (
//       <button onClick={handleDelete}><TrashIcon  className="w-5"/></button>      
//   );
// };
'use client';
import { fetchCampaignList } from '@/lib/api';
import { GetFilteredCampaign } from '@/lib/data';
import { Campaign } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import { PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react';
import { deleteCampaign } from '@/lib/api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { id?: string; name?: string };
  handleDelete: () => Promise<void>;
}

const DataPassingModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  handleDelete
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              Are you sure you want to delete this campaign: {data.name}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" id={data.id} onClick={handleDelete}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default function CampaignListTable({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<{ id?: string; name?: string }>(
    {}
  );
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [campaignAll, setCampaign] = useState<Campaign[]>([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {    
    fetchCampaignList().then((data) =>
      setCampaign(
        data.result.filter((campaign: any) => campaign.status !== 'deleted')
      )
    );
  }, [refreshPage]);
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
  useEffect(() => {
    const message = Cookies.get('notification_delete_campaign');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_delete_campaign');
    }
  }, [refreshPage]);
  const onModalOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    const name = event.currentTarget.name;
    setModalData({ id: id, name: name });
    onOpen();
  };

  const handleDelete = async () => {
    if (modalData.id) {
      await deleteCampaign(modalData.id);
      Cookies.set('notification_delete_campaign', 'The campaign is deleted successfully!');
      setRefreshPage((prev) => !prev);
      onClose();      
    }
  };

  const sortSvg = (column: string) =>
    sortColumn === column ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        {sortOrder === 'desc' ? (
          <path d="M7 10l5 5 5-5z" />
        ) : (
          <path d="M7 14l5-5 5 5z" />
        )}

        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ) : null;
  const campaignList = GetFilteredCampaign(
    campaignAll,
    query,
    currentPage,
    sortColumn,
    sortOrder
  );
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md p-2 md:pt-0">
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th
                    scope="col"
                    onClick={() => handleSort('name')}
                    className="px-4 py-5 font-medium sm:pl-6"
                  >
                    <p className="inline-flex cursor-pointer font-bold">
                      Name{sortSvg('name')}
                    </p>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('budget')}
                    className="px-3 py-5 font-medium"
                  >
                    <p className="inline-flex cursor-pointer font-bold">
                      Budget{sortSvg('budget')}
                    </p>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('startDateTime')}
                    className="px-3 py-5 font-medium"
                  >
                    <p className="inline-flex cursor-pointer font-bold">
                      Start Date{sortSvg('startDateTime')}
                    </p>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('endDateTime')}
                    className="px-4 py-5 font-medium"
                  >
                    <p className="inline-flex cursor-pointer font-bold">
                      End Date{sortSvg('endDateTime')}
                    </p>
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    <p className="inline-flex font-bold">Actions</p>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {campaignList.map((campaign) => (
                  <tr key={campaign.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <p>{campaign.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {campaign.budget}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {campaign.startDateTime?.split('T')[0]}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {campaign.endDateTime?.split('T')[0]}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-2 pr-2 w-0.5">
                      <div className="flex gap-3">
                        {campaign.id && (
                          <Link href={`/campaigns/${campaign.id}`}>
                            <EyeIcon className="w-5" />
                          </Link>
                        )}
                        {campaign.id && (
                          <Link href={`/campaigns/update/${campaign.id}`}>
                            <PencilIcon className="w-5" />
                          </Link>
                        )}
                        {campaign.id && (
                          <button
                            name={campaign.name}
                            id={campaign.id}
                            onClick={onModalOpen}
                          >
                            <TrashIcon className="w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DataPassingModal
        isOpen={isOpen}
        onClose={onClose}
        data={modalData}
        handleDelete={handleDelete}
      />
    </div>
  );
}

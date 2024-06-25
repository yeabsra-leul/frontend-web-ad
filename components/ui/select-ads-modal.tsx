// components/CheckboxModal.tsx

import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, Button } from '@nextui-org/react';
import { Advertisement } from '@/lib/definitions';
import { fetchAds } from '@/lib/api';

interface CheckboxModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (selectedCheckboxes: { id: string; name: string }[]) => void;
}

const CheckboxModal: React.FC<CheckboxModalProps> = ({ isOpen, onRequestClose, onSave }) => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<{ id: string; name: string }[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string, name: string) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, { id, name }]);
    } else {
      setSelectedCheckboxes((prevSelected) => prevSelected.filter((checkbox) => checkbox.id !== id));
    }
  };

  const handleSave = () => {
    onSave(selectedCheckboxes);
    onRequestClose();
  };

  const [ads, setAds] = useState<Advertisement[]>([]);
  useEffect(() => {
    fetchAds().then(data => setAds(data.result.filter((ad:any) => ad.status !== 'deleted')));
  }, []);

  // const customStyles = css({
  //   '& .nextui-modal': {
  //     width: '50%', // Adjust the width as per your requirement
  //     height: '50%', // Adjust the height as per your requirement
  //     top: '50%',
  //     left: '50%',
  //     transform: 'translate(-50%, -50%)',
  //   },
  // });

  return (
    <Modal
        closeButton
        aria-labelledby="modal-title"
        isOpen={isOpen}
        onClose={onRequestClose}
      >
      <ModalContent>
      <ModalBody>
      <div className="w-full h-full">
        <div className="grid">
            <h2 className="block text-gray-500 font-bold float-left mb-3 mt-3">Select Existing Ads</h2>            
            
            <hr /><br />
            <div>
                {ads.map((ad) => (
                <label key={ad.id} className="block text-gray-500 mb-1 md:mb-0 pr-4">
                    <input
                    type="checkbox"
                    value={ad.id}
                    checked={selectedCheckboxes.some((c) => c.id === ad.id)}
                    onChange={(e) => handleCheckboxChange(e, ad.id?ad.id:'', ad.name)}
                    className='mr-3'
                    />
                    {ad.name}
                </label> 
                ))}
                <br/><br/>
                <Button type='button' color="primary" onClick={handleSave}>Save</Button>
                <Button className="float-right" type='button' color="primary" onClick={onRequestClose}>Cancel</Button>
            </div>
        </div>
      </div>
      </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CheckboxModal;
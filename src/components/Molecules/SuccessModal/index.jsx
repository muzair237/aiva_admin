import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GiCheckMark } from 'react-icons/gi';
import Button from '../../Atoms/Button';

export default function SuccessModal({ isOpen, setIsOpen, title, message }) {
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        setIsOpen(false);
      }}
      centered>
      <ModalHeader className="modal-title text-center">{title}</ModalHeader>
      <ModalBody className="modal-body text-center p-5">
        <GiCheckMark className="animate__animated animate__pulse animate__infinite infinite" size={70} />
        <div className="mt-4 text-center">
          <h4 className="mb-3">{message}</h4>
          <div className="hstack gap-2 justify-content-center">
            <Button color="success" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

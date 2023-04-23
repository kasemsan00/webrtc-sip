import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import SipAccountsForm from "./SipConfig/SipAccountsForm";

interface Props {
  open: boolean;
  onUpdate: (arg0: boolean) => void;
  configIndex: number | undefined;
}

export default function SipAccountModal({ open, onUpdate, configIndex }: Props) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (isOpen) {
      onUpdate(isOpen);
    }
  }, [isOpen, onUpdate]);

  const handleClose = () => {
    setIsOpen(false);
    onUpdate(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-[999] overflow-y-auto pl-[200px]" onClose={handleClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="border border-indigo-800 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between">
                <div>SipAccount Config</div>
                <div className="flex justify-center items-center cursor-pointer" onClick={handleClose}>
                  <IoMdCloseCircle className="text-red-700 w-6 h-6" />
                </div>
              </div>
              <SipAccountsForm setIsOpen={handleClose} configIndex={configIndex} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

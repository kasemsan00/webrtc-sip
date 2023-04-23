import { useState, Fragment } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import SipAccountsForm from "@/components/Setting/SipAccountsForm";
import ProfileList from "@/components/LeftPanel/ProfileList";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MyListbox() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let [categories] = useState({
    SipAccounts: [],
    PcConfig: [],
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto pl-[200px]" onClose={closeModal}>
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  {Object.keys(categories).map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <ProfileList />
                    <SipAccountsForm />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              <div className="mt-6 flex justify-between">
                <button className="btn btn-active btn-warning w-32" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-active btn-success w-32">Save</button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

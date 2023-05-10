import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import SipAccountList from "@/ui/Setting/SipAccountList";
import SipAccountListModal from "@/ui/Setting/SipAccountListModal";
import CameraConfig from "@/ui/Setting/CameraConfig";
import { AiFillCloseCircle } from "react-icons/ai";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

export default function Setting({ open, setOpen }: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const [isSipConfigOpen, setIsSipConfigOpen] = useState(false);
  const [configAction, setConfigAction] = useState<string | undefined>();
  const [selectSipAccountConfigIndex, setSelectSipAccountConfigIndex] =
    useState<undefined | number>();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeModal = () => {
    setSelectSipAccountConfigIndex(undefined);
    setIsOpen(false);
    setOpen(false);
  };

  let [categories] = useState({
    SipAccounts: [],
    // Camera: [],
    // PcConfig: [],
  });

  return (
    <>
      <SipAccountListModal
        open={isSipConfigOpen}
        configAction={configAction}
        onUpdate={(value) => {
          setIsSipConfigOpen(value);
        }}
        configIndex={selectSipAccountConfigIndex}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto pl-[200px]"
          onClose={() => null}
        >
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
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-xl">Setting</h2>
                  <AiFillCloseCircle
                    className="w-8 h-8 text-red-700 cursor-pointer"
                    onClick={closeModal}
                  />
                </div>
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
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
                      <SipAccountList
                        setIsSipConfigOpen={setIsSipConfigOpen}
                        setConfigAction={setConfigAction}
                        configIndex={selectSipAccountConfigIndex}
                        onSelectIndex={setSelectSipAccountConfigIndex}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                  <Tab.Panels>
                    <Tab.Panel
                      className={classNames(
                        "rounded-xl bg-white",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      <CameraConfig />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

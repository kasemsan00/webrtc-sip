import { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { setSelectProfile } from "@/redux/slices/profileSelectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IExtensionDetail } from "@/interface/interface";
import useLocalStorageState from "use-local-storage-state";

export default function ProfileList() {
  const dispatch = useAppDispatch();
  const userAgent: any = useAppSelector((state) => state.userAgent);
  const profileData = useAppSelector((state) => state.profileData);
  const profileSelect = useAppSelector((state) => state.profileSelect);
  const [localStorageProfile, setLocalStorageProfile] = useLocalStorageState<IExtensionDetail>("profileSelect");

  useEffect(() => {
    if (profileSelect.id === undefined && localStorageProfile !== undefined) {
      dispatch(setSelectProfile(localStorageProfile));
    }
  }, [dispatch, localStorageProfile, profileSelect]);
  //
  const handleListChange = (event: string) => {
    if (userAgent !== null) {
      userAgent.unregister();
    }
    if (profileData === undefined) return;
    const profileSelect = profileData.find((state: any) => {
      return state.extension === event;
    });
    setLocalStorageProfile(profileSelect as IExtensionDetail | undefined);
    dispatch(setSelectProfile(profileSelect));
  };

  return (
    <Listbox
      value={
        localStorageProfile === undefined ? "Select Extension" : localStorageProfile.extension + "@" + localStorageProfile.domain
      }
      onChange={handleListChange}
    >
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="tooltip block truncate">
            {localStorageProfile !== undefined
              ? localStorageProfile?.extension + "@" + localStorageProfile.domain
              : "Select Extension"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {profileData.length > 0 &&
              profileData?.map((item: any, index: number) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-2 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item.extension}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {item.extension}@{item.domain}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

import { IoMdSettings } from "react-icons/Io";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export default function LeftPanel() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const UserRegister = () => {};
  const UserUnregister = () => {};

  return (
    <div className="left-panel">
      <div className="view-local">
        <div className="local-video"></div>
      </div>
      <div className="input-form">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button>{selectedPerson.name}</Listbox.Button>
          <Listbox.Options>
            {people.map((person) => (
              <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <IoMdSettings className="setting-btn" />
      </div>
      <button className="btn-primary" onClick={UserRegister}>
        Register
      </button>
      <button className="btn-secondary" onClick={UserUnregister}>
        UnRegister
      </button>
    </div>
  );
}

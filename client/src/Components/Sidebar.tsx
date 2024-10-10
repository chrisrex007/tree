import React, { MouseEventHandler, useState } from "react";
import { Godown, Item } from "./types";

const extractInfo = (obj: Array<Godown>) => {
  const locs: Array<Godown> = [];
  const subLocs: Array<Array<Godown>> = [];
  const sector: Array<Array<Array<Godown>>> = [];
  const zones: Array<Array<Array<Array<Godown>>>> = [];

  let i = 0,
    n = obj.length;

  while (i < n) {
    const wareParent: Godown = obj[i];
    locs.push(wareParent);
    i++;
    const tempSubLocs: Array<Godown> = [];
    const tempSector: Array<Array<Godown>> = [];
    const tempZone: Array<Array<Array<Godown>>> = [];

    while (i < n && wareParent.id === obj[i].parent_godown) {
      const parent: Godown = obj[i];
      tempSubLocs.push(parent);
      i++;
      const tempTempSector: Array<Godown> = [];
      const tempTempZone: Array<Array<Godown>> = [];

      while (i < n && obj[i].parent_godown === parent.id) {
        const sec: Godown = obj[i];
        tempTempSector.push(obj[i]);
        i++;
        const tempTempTempZone: Array<Godown> = [];
        while (i < n && obj[i].parent_godown === sec.id) {
          tempTempTempZone.push(obj[i]);
          i++;
        }
        tempTempZone.push(tempTempTempZone);
      }
      tempSector.push(tempTempSector);
      tempZone.push(tempTempZone);
    }
    subLocs.push(tempSubLocs);
    sector.push(tempSector);
    zones.push(tempZone);
  }

  return { locs, subLocs, sector, zones };
};

const extractItems = (its: Array<Item>) => {
  const m = new Map<string, Array<Item>>();
  let i = 0,
    n = its.length;

  while (i < n) {
    const oldItem: Array<Item> = m.get(its[i].godown_id ?? "") ?? [];
    oldItem.push(its[i]);
    m.set(its[i].godown_id ?? "", oldItem);
    i++;
  }
  return m;
};

const TreeNode: React.FC<{
  godown: Godown;
  subLocations: Array<Godown>;
  sector: Array<Array<Godown>>;
  zones: Array<Array<Array<Godown>>>;
  items: Map<string, Array<Item>>;
  setMyItem: React.Dispatch<React.SetStateAction<Item>>;
}> = ({ godown, subLocations, sector, zones, items, setMyItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="font-semibold text-xl text-blue-600 hover:text-blue-800 cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`transition-transform duration-400 ease ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {">"}
        </span>
        <span className="ml-2">{godown.name}</span>
      </div>
      {isOpen && (
        <div className="ml-4 bg-gray-100 p-2 rounded-md">
          {subLocations.map((sub: Godown, index: number) => (
            <SubTreeNode
              key={index}
              godown={sub}
              sectors={sector[index]}
              zones={zones[index]}
              items={items}
              setMyItem={setMyItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SubTreeNode: React.FC<{
  godown: Godown;
  sectors: Array<Godown>;
  zones: Array<Array<Godown>>;
  items: Map<string, Item[]>;
  setMyItem: React.Dispatch<React.SetStateAction<Item>>;
}> = ({ godown, sectors, zones, items, setMyItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const its = items.get(godown.id ?? "");

  return (
    <div className="mb-2">
      <div
        className="font-medium text-lg text-gray-700 hover:text-gray-900 cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`transition-transform duration-400 ease ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {">"}
        </span>
        <span className="ml-2">{godown.name}</span>
      </div>
      {isOpen && (
        <div className="ml-4 bg-gray-200 p-2 rounded-md">
          {sectors.map((sec: Godown, index: number) => (
            <SectorNode
              key={index}
              godown={sec}
              zones={zones[index]}
              items={items}
              setMyItem={setMyItem}
            />
          ))}
          <div className="ml-4">
            {its?.map((item: Item, index: number) => (
              <div
                key={index}
                className="text-gray-600"
                onClick={() => setMyItem(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SectorNode: React.FC<{
  godown: Godown;
  zones: Array<Godown>;
  items: Map<string, Item[]>;
  setMyItem: React.Dispatch<React.SetStateAction<Item>>;
}> = ({ godown, zones, items, setMyItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const its = items.get(godown.id ?? "");

  return (
    <div className="mb-2">
      <div
        className="font-normal text-md text-gray-600 hover:text-gray-800 cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`transition-transform duration-400 ease ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {">"}
        </span>
        <span className="ml-2">{godown.name}</span>
      </div>
      {isOpen && (
        <div className="ml-4 bg-gray-300 p-2 rounded-md">
          {zones.map((zone: Godown, index: number) => (
            <ZoneNode
              key={index}
              godown={zone}
              items={items}
              setMyItem={setMyItem}
            />
          ))}
          <div className="ml-4">
            {its?.map((item: Item, index: number) => (
              <div
                key={index}
                className="text-gray-600"
                onClick={() => setMyItem(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ZoneNode: React.FC<{
  godown: Godown;
  items: Map<string, Item[]>;
  setMyItem: React.Dispatch<React.SetStateAction<Item>>;
}> = ({ godown, items, setMyItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const its = items.get(godown.id ?? "");

  return (
    <div className="mb-2">
      <div
        className="font-medium text-lg text-gray-700 hover:text-gray-900 cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`transition-transform duration-400 ease ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {">"}
        </span>
        <span className="ml-2">{godown.name}</span>
      </div>
      {isOpen && (
        <div className="ml-4 bg-gray-400 p-2 rounded-md">
          {its?.map((item: Item, index: number) => (
            <div
              key={index}
              className="text-gray-700"
              onClick={() => setMyItem(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<{
  width: number;
  onWidthChange: MouseEventHandler<HTMLDivElement>;
  setMyItem: React.Dispatch<React.SetStateAction<Item>>;
  itms?: Array<Item>;
  godowns?: Array<Godown>;
}> = ({ width, onWidthChange, setMyItem, itms, godowns }) => {
  const obj = extractInfo(godowns ?? []);
  const items = extractItems(itms ?? []);
  const locations: Array<Godown> = obj.locs;
  const subLocations: Array<Array<Godown>> = obj.subLocs;
  const sector: Array<Array<Array<Godown>>> = obj.sector;
  const zones: Array<Array<Array<Array<Godown>>>> = obj.zones;

  return (
    <div
      className="bg-white shadow-lg p-4 h-screen relative"
      style={{ width: `${width}px` }}
    >
      <div className="sidebar-content overflow-y-auto h-full">
        {locations.map((location: Godown, index: number) => (
          <TreeNode
            key={index}
            godown={location}
            subLocations={subLocations[index]}
            sector={sector[index]}
            zones={zones[index]}
            items={items}
            setMyItem={setMyItem}
          />
        ))}
      </div>
      <div
        className="cursor-col-resize w-1 bg-gray-300 h-full absolute right-0 top-0"
        style={{ width: "10px" }}
        onMouseDown={onWidthChange}
      />
    </div>
  );
};

export default Sidebar;

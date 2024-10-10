import React, { useState, MouseEvent, useEffect } from "react";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import { totalObject, Item } from "./Components/types";

const fetchData = () => {
  const [result, setResult] = useState<totalObject>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        setResult(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return result;
};

const App: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(500); // Initial width
  const [myItem, setMyItem] = useState<Item>({
    item_id: "e02d6a496a054edc96cfd197943cdd07",
    name: "Black & Decker Saw Series C",
    quantity: 31,
    category: "Tools",
    price: 351.15,
    status: "out_of_stock",
    godown_id: "4ce59062eadd4d4ca5e105f30a9f7256",
    brand: "Black & Decker",
    attributes: {
      type: "Hand Tool",
      material: "Plastic",
      warranty_years: 1,
    },
    image_url:
      "https://m.media-amazon.com/images/S/aplus-media-library-service-media/01206301-d7e5-481c-8211-dbede72bde9a.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  });

  const res = fetchData();
  const itms = res?.items;
  const godowns = res?.godowns;

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const startX = event.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(
        100,
        sidebarWidth + (moveEvent.clientX - startX)
      );
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      //@ts-ignore
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    //@ts-ignore
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex min-h-screen relative max-w-full">
      <Sidebar
        width={sidebarWidth}
        onWidthChange={handleMouseDown}
        setMyItem={setMyItem}
        itms={itms}
        godowns={godowns}
      />
      <Home myItem={myItem} />
    </div>
  );
};

export default App;

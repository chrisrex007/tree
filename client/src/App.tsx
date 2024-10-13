import React, { useState, MouseEvent, useEffect } from "react";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import LoginPage from "./Components/LoginPage";
import { totalObject, Item } from "./Components/types";
import dummyItem from "./Components/dummyItem";

const fetchData = () => {
  const [result, setResult] = useState<totalObject>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data/");
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
  const [myItem, setMyItem] = useState<Item>(dummyItem);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(true); // Track sidebar open/close state

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

  // Show the login page if the user is not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // Determine if screen is small
  const isSmallScreen = window.innerWidth < 1025;

  if (!isSmallScreen) {
    return (
      <div className="flex min-h-screen relative max-w-full">
        {/* Sidebar */}
        <Sidebar
          width={sidebarWidth}
          onWidthChange={handleMouseDown}
          setMyItem={setMyItem}
          itms={itms}
          godowns={godowns}
          isOpen={isOpen}
        />

        {/* Home Component */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isOpen ? `ml-${sidebarWidth}` : "ml-0"
          }`}
          style={{
            width: isOpen ? `calc(100% - ${sidebarWidth}px)` : "100%", // Adjust width based on sidebar state
          }}
        >
          <Home myItem={myItem} />
        </div>

        {/* Burger Icon */}
        <div
          className={`absolute top-8 left-4 text-white text-2xl cursor-pointer transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          } hover:scale-150`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="w-8 h-1 bg-white mb-1"></div>
          <div className="w-8 h-1 bg-white mb-1"></div>
          <div className="w-8 h-1 bg-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative max-w-full">
      {isSmallScreen && !isOpen ? (
        <Home myItem={myItem} /> // Show Home full screen if sidebar is closed
      ) : (
        <>
          <Sidebar
            width={sidebarWidth}
            onWidthChange={handleMouseDown}
            setMyItem={setMyItem}
            itms={itms}
            godowns={godowns}
            isOpen={isOpen}
          />
        </>
      )}
      <div
        className={`absolute top-4 left-4 text-white text-2xl cursor-pointer transition-transform duration-500 ${
          isOpen ? "rotate-180" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-1 bg-white mb-1"></div>
        <div className="w-8 h-1 bg-white mb-1"></div>
        <div className="w-8 h-1 bg-white"></div>
      </div>
    </div>
  );
};

export default App;

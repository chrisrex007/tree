import React from "react";
import { Item, ItemAttributes } from "./types";
import { useAuth } from "../AuthContext";

const makeNiceText = (input: string) => {
  let result = input.replace(/_/g, " ");
  result = result.replace(/([a-z])([A-Z])/g, "$1 $2");
  result = result.replace(/\b\w/g, (char) => char.toUpperCase());
  return result;
};

const Home: React.FC<{
  myItem: Item;
}> = ({ myItem }) => {
  const { logout } = useAuth();
  const renderAttributes = (attributes?: ItemAttributes) => {
    if (!attributes) return null;

    return (
      <div className="mt-2 text-xl">
        {Object.entries(attributes).map(([key, value]) => {
          const textClass =
            "text-black mb-2 text-base md:text-lg lg:text-xl hover:text-yellow-500 transition duration-300";
          if (key === "battery_required") {
            return (
              <div key={key} className={textClass}>
                <strong>{makeNiceText(key)}:</strong>{" "}
                {value === true ? "Yes" : "No"}
              </div>
            );
          }
          return (
            <div key={key} className={textClass}>
              <strong>{makeNiceText(key)}:</strong> {value}
            </div>
          );
        })}
      </div>
    );
  };

  const handleLogout = () => {
    try {
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold hover:text-yellow-500 transition duration-300">
            Welcome to the Dashboard
          </h1>
          <button
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-500 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="w-full bg-slate-500 shadow-md rounded-lg p-4 flex flex-col md:flex-row">
          <div className="flex-1 inline-block">
            <h2 className="text-black text-2xl font-bold mb-4 hover:text-yellow-500 transition duration-300">
              {myItem.name}
            </h2>
            <div className="w-full flex justify-center">
              <div className="inline">
                <img
                  src={myItem.image_url}
                  alt={myItem.name}
                  className="max-w-full max-h-96 rounded-md mb-4 object-contain transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
                />
              </div>
            </div>

            <div className="text-black mt-4">
              {Object.entries(myItem).map(([key, value]) => {
                if (
                  key === "image_url" ||
                  key === "name" ||
                  key === "item_id" ||
                  key === "godown_id"
                )
                  return null;
                if (key === "attributes") {
                  return (
                    <div className="text-black mb-2" key={key}>
                      <div className="font-semibold mt-10 text-black mb-2 text-base md:text-xl lg:text-2xl">
                        Attributes:{" "}
                      </div>
                      {renderAttributes(value as ItemAttributes)}
                    </div>
                  );
                }
                return (
                  <div
                    className="text-black mb-2 text-base md:text-lg lg:text-xl"
                    key={key}
                  >
                    <strong className="font-semibold hover:text-yellow-500 transition duration-300">
                      {makeNiceText(key)}
                    </strong>
                    : {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

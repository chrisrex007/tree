import React from "react";
import { Item, ItemAttributes } from "./types";

const makeNiceText = (input: string) => {
  let result = input.replace(/_/g, " ");
  result = result.replace(/([a-z])([A-Z])/g, "$1 $2");
  result = result.replace(/\b\w/g, (char) => char.toUpperCase());
  return result;
};

const Home: React.FC<{
  myItem: Item;
}> = ({ myItem }) => {
  const renderAttributes = (attributes?: ItemAttributes) => {
    if (!attributes) return null;

    return (
      <div className="mt-2 text-xl">
        {Object.entries(attributes).map(([key, value]) => {
          if (key === "battery_required") {
            return (
              <div
                key={key}
                className="text-black mb-2 text-base md:text-lg lg:text-xl"
              >
                <strong>{makeNiceText(key)}:</strong>{" "}
                {value === true ? "Yes" : "No"}
              </div>
            );
          }
          return (
            <div
              key={key}
              className="text-black mb-2 text-base md:text-lg lg:text-xl"
            >
              <strong>{makeNiceText(key)}:</strong> {value}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-10 pt-12">
          Welcome to the Dashboard
        </h1>
        <div className="w-full bg-slate-500 shadow-md rounded-lg p-4 flex flex-col md:flex-row">
          <div className="flex-1 inline-block">
            <h2 className="text-black text-2xl font-bold mb-4">
              {myItem.name}
            </h2>

            <div className="text-black mt-4">
              {Object.entries(myItem).map(([key, value]) => {
                // We don't need to output name, url or any of the ids.
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
                    <strong className="font-semibold">
                      {makeNiceText(key)}
                    </strong>
                    : {value}
                  </div>
                );
              })}
            </div>
          </div>
          <img
            src={myItem.image_url}
            alt={myItem.name}
            className="ml-0 md:ml-12 max-w-full max-h-96 rounded-md mb-4 object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default Home;

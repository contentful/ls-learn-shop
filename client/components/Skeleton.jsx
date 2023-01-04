import React from "react";

export default function Skeleton() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="bg-gray-200 w-full animate-pulse h-40 min-h-40"></div>
        <div className="flex flex-row space-x-2">
          <div className="w-1/2 p-2 space-y-4">
            <div class="bg-gray-200 w-full animate-pulse h-4 rounded-2xl"></div>
            <div class="bg-gray-200 w-full animate-pulse h-4 rounded-2xl"></div>
            <div class="bg-gray-200 w-full animate-pulse h-4 rounded-2xl"></div>
          </div>
          <div className="w-1/2 flex flex-col p-2 space-y-2">
            <div class="bg-gray-200 w-full animate-pulse h-4 "></div>

            <div class="bg-gray-200 w-fullx w-10 animate-pulse h-4 "></div>
            <div class="bg-gray-200 w-fullx w-20 animate-pulse h-4 "></div>
            <div class="bg-gray-200 w-fullx w-20 animate-pulse h-8 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}

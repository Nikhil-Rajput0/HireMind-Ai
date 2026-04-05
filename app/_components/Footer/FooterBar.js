import React from "react";

function FooterBar() {
  return (
    <>
      <div className=" bg-gray-900 text-[#fafafa] min-h-[50vh] px-40 py-10">
        1
      </div>
      <div className="py-4 flex justify-center bg-gray-900 text-[#fafafa]">
        <h3 className="">
          &copy;{new Date().getFullYear()} by Hiremind AI. All rights reserved
        </h3>
      </div>
    </>
  );
}

export default FooterBar;

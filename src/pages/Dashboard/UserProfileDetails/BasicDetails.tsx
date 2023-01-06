import React from "react";

interface BasicDetailsProps {
  chatUserDetails: any;
}
const BasicDetails = ({ chatUserDetails }: BasicDetailsProps) => {
  const fullName = chatUserDetails.name
    ? `${chatUserDetails.name?.firstname} ${chatUserDetails.name?.lastname}`
    : "-";

  return (
    <div className="pb-2">
      <h5 className="font-size-11 text-uppercase mb-2">Info :</h5>
      <div>
        <div className="d-flex align-items-end">
          <div className="flex-grow-1">
            <p className="text-muted font-size-14 mb-1">Name</p>
          </div>
        </div>
        <h5 className="font-size-14">{fullName}</h5>
      </div>

      <div className="mt-4">
        <p className="text-muted font-size-14 mb-1">Email</p>
        <h5 className="font-size-14">
          {chatUserDetails.email ? chatUserDetails.email : "-"}
        </h5>
      </div>

      
    </div>
  );
};

export default BasicDetails;

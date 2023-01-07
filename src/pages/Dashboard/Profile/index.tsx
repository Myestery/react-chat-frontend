import React, { useEffect } from "react";

import AppSimpleBar from "../../../components/AppSimpleBar";
// components
import Loader from "../../../components/Loader";
import MyProfile from "./MyProfile";
import UserDescription from "./UserDescription";
// actions
import { getProfileDetails } from "../../../redux/actions";
// hooks
import { useRedux } from "../../../hooks/index";

// import Media from "../../../components/Media";
// import AttachedFiles from "../../../components/AttachedFiles";


interface IndexProps {}
const Index = (props: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { profileDetails, getProfileLoading, isProfileFetched } =
    useAppSelector(state => ({
      profileDetails: state.Profile.profileDetails,
      getProfileLoading: state.Profile.getProfileLoading,
      isProfileFetched: state.Profile.isProfileFetched,
    }));

  // get user profile details
  useEffect(() => {
    dispatch(getProfileDetails());
  }, [dispatch]);

  return (
    <div className="position-relative">
      {getProfileLoading && !isProfileFetched && <Loader />}
      <MyProfile basicDetails={profileDetails.basicDetails} />

      <AppSimpleBar className="p-4 profile-desc">
        <UserDescription basicDetails={profileDetails.basicDetails} />
        <hr className="my-4" />

        {/* <Media media={profileDetails.media} limit={2} />

        <hr className="my-4" />

        <AttachedFiles attachedFiles={profileDetails.attachedFiles} /> */}
      </AppSimpleBar>
    </div>
  );
};

export default Index;

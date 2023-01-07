import * as yup from "yup";

import { Alert, Col, Form, Row } from "reactstrap";

import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import React from "react";
//images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { getProfileDetails } from "../../redux/actions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// hooks
import { useRedux } from "../../hooks/index";
//actions
import { userChangePassword } from "../../redux/actions";
import { yupResolver } from "@hookform/resolvers/yup";

// validations

// // hooks
// import { useProfile } from "../../hooks";

interface ChangePasswordProps {}
const ChangePassword = (props: ChangePasswordProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { changepasswordError, passwordChanged, changePassLoading } =
    useAppSelector(state => ({
      passwordChanged: state.ForgetPassword.passwordChanged,
      changepasswordError: state.ForgetPassword.changepasswordError,
      changePassLoading: state.ForgetPassword.loading,
    }));

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

  const resolver = yupResolver(
    yup.object().shape({
      oldPassword: yup.string().required("Please Enter Old Password."),
      password: yup.string().required("Please Enter New Password."),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("This value is required."),
    })
  );

  const defaultValues: any = {};

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitForm = (values: object) => {
    dispatch(userChangePassword(values));
  };

  // const { userProfile, loading } = useProfile();

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader title="Change Password" />
            <div className="user-thumb text-center mb-4">
              {isProfileFetched && <img
                src={profileDetails.basicDetails.avatar}
                className="rounded-circle img-thumbnail avatar-lg"
                alt="thumbnail"
              />}
              {isProfileFetched && <h5 className="font-size-15 mt-3">
                {profileDetails.basicDetails.firstName}{" "}
                {profileDetails.basicDetails.lastName}
              </h5>}
            </div>
            {changepasswordError && changepasswordError ? (
              <Alert color="danger">{changepasswordError}</Alert>
            ) : null}
            {passwordChanged ? (
              <Alert color="success">Your Password is changed</Alert>
            ) : null}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {changePassLoading && <Loader />}
              <div className="mb-3">
                <FormInput
                  label="Old Password"
                  type="password"
                  name="oldPassword"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Old Password"
                  className="form-control"
                  withoutLabel={true}
                  hidePasswordButton={true}
                />
              </div>
              <div className="mb-3">
                <FormInput
                  label="New Password"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter New Password"
                  className="form-control"
                  withoutLabel={true}
                  hidePasswordButton={false}
                />
              </div>
              <div className="mb-3">
                <FormInput
                  label="Confirm New Password"
                  type="password"
                  name="confirmpassword"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Confirm Password"
                  className="form-control"
                  withoutLabel={true}
                  hidePasswordButton={true}
                />
              </div>

              <div className="text-center mt-4">
                <div className="row">
                  <div className="col-6">
                    <button className="btn btn-primary w-100" type="submit">
                      Save
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-light w-100" type="button">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default ChangePassword;

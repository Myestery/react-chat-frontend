import { Button, Modal, ModalBody } from "reactstrap";
import React, { useRef, useState, useEffect } from "react";

// interface
import { CallItem } from "../data/calls";
import { Stopwatch } from "./StopWatch";
import imagePlaceholder from "../assets/images/users/profile-placeholder.png";

interface VideoCallModalProps {
  user: CallItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAnswer: (x: boolean) => void;
  isActive: boolean;
  isAnswered: boolean;
  dialing: boolean;
  onCloseVideoStream: () => void;
  showFriendVideo: boolean;
}

const VideoCallModal = ({
  isOpen,
  onClose,
  user,
  onAnswer,
  isActive,
  isAnswered,
  dialing,
  onCloseVideoStream,
  showFriendVideo,
}: VideoCallModalProps) => {
  const [muted, setMuted] = useState(false);
  const [video, setVideo] = useState(true);
  const [_stream, setStream] = useState<MediaStream | null>(null);
  const [_friendHasVideo, setFriendHasVideo] = useState(true);
  const videoElement = useRef(null);
  if (isAnswered) {
    window.call.on("stream", function (stream) {
      // `stream` is the MediaStream of the remote peer.
      // Here you'd add it to an HTML video/canvas element.
      setStream(stream);
      if (videoElement.current) {
        (videoElement.current as any).srcObject = stream;
      }
    });

    window.peerConnection.on("data", function (data) {
      console.log("peer said: " + data, "peerConnection.on(data)")
      if (data == "OFF_VIDEO") {
        setFriendHasVideo(false);
      }
      if (data == "ON_VIDEO") {
        setFriendHasVideo(true);
      }
    })
  }

  const toggleMic = () => {
    if (window.stream) {
      window.stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setMuted(!muted);
    }
  };

  const toggleVideo = () => {
    if (window.stream) {
      window.stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      window.peerConnection.send(!video? "ON_VIDEO" : "OFF_VIDEO");
      setVideo(!video);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      // toggle={onClose}
      tabIndex={-1}
      centered
      className="videocallModal"
      contentClassName="shadow-lg border-0"
    >
      <ModalBody className="p-0">
        {/* {isAnswered && _friendHasVideo ? ( */}
          <video
            ref={videoElement}
            autoPlay={true}
          className="videocallModal-bg"
          style={{display: (isAnswered && _friendHasVideo) ? "block" : "none"}}
          />
        {/* ) : ( */}
          <img
            src={user && user.image_url ? user.image_url : imagePlaceholder}
            alt=""
            className="videocallModal-bg"
            style={{display: (isAnswered && _friendHasVideo) ? "none" : "block"}}
          />
        {/* )} */}
        <div className="position-absolute start-0 end-0 bottom-0">
          <div className="text-center">
            <div className="d-flex justify-content-center align-items-center text-center">
              <div className="avatar-md h-auto">
                <Button
                  color="light"
                  type="button"
                  className="avatar-sm rounded-circle"
                  onClick={toggleMic}
                >
                  <span className="avatar-title bg-transparent text-muted font-size-20">
                    {muted ? (
                      <i className="bx bx-microphone-off"></i>
                    ) : (
                      <i className="bx bx-microphone"></i>
                    )}
                  </span>
                </Button>
              </div>
              {isAnswered && <Stopwatch />}
              {!isAnswered && !dialing && (
                <audio src="/ringtone.mp3" autoPlay={true} onEnded={onClose} />
              )}
              <div className="avatar-md h-auto">
                <Button
                  color="light"
                  type="button"
                  className="avatar-sm rounded-circle"
                  onClick={toggleVideo}
                >
                  <span className="avatar-title bg-transparent text-muted font-size-20">
                    {!video ? (
                      <i className="bx bx-video-off"></i>
                    ) : (
                      <i className="bx bx-video"></i>
                    )}
                  </span>
                </Button>
              </div>
            </div>

            <div className="mt-4">
              {isActive ? (
                <div className="mt-4">
                  <Button
                    type="button"
                    className="btn btn-danger avatar-md call-close-btn rounded-circle"
                    color="danger"
                    onClick={onClose}
                  >
                    <span className="avatar-title bg-transparent font-size-24">
                      <i className="mdi mdi-phone-hangup"></i>
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <Button
                    type="button"
                    className="btn btn-success avatar-md call-close-btn rounded-circle"
                    color="success"
                    onClick={() => onAnswer(true)}
                  >
                    <span className="avatar-title bg-transparent font-size-24">
                      <i className="mdi mdi-phone-outline"></i>
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-primary mt-n4">
            <div className="text-white mt-4 text-center">
              <h5 className="font-size-18 text-truncate mb-0 text-white">
                {user ? `${user.name?.firstname} ${user.name?.lastname}` : ""}
              </h5>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default VideoCallModal;

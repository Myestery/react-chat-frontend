import { Button, Modal, ModalBody } from "reactstrap";
import React, { useRef, useState } from "react";

// interface
import { CallItem } from "../data/calls";
import { Stopwatch } from "./StopWatch";
//images
import imagePlaceholder from "../assets/images/users/profile-placeholder.png";

interface AudioCallModalProps {
  isOpen: boolean;
  isActive: boolean;
  onClose: () => void;
  onAnswer: () => void;
  user: CallItem | null;
  isAnswered: boolean;
  dialing: boolean;
}

const AudioCallModal = ({
  isOpen,
  onClose,
  user,
  onAnswer,
  isActive,
  isAnswered,
  dialing,
}: // stream,
AudioCallModalProps) => {
  const [muted, setMuted] = useState(false);
  const audioElement = useRef(null);
  if (isAnswered) {
    window.call.on("stream", function (stream) {
      // `stream` is the MediaStream of the remote peer.
      // Here you'd add it to an HTML video/canvas element.
      // setStream(stream);
      if (audioElement.current)
        (audioElement.current as any).srcObject = stream;
    });
  }

  const toggleMic = () => {
    if (window.stream) {
      window.stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setMuted(!muted);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        console.log("");
      }}
      tabIndex={-1}
      centered
      className="audiocallModal"
      contentClassName="shadow-lg border-0"
    >
      <ModalBody className="p-0">
        <div className="text-center p-4 pb-0">
          <div className="avatar-xl mx-auto mb-4">
            <img
              src={user && user.image_url ? user.image_url : imagePlaceholder}
              alt=""
              className="img-thumbnail rounded-circle"
            />
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="avatar-md h-auto">
              <Button
                type="button"
                color="light"
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
              <h5 className="font-size-11 text-uppercase text-muted mt-2">
                Mute
              </h5>
            </div>
          </div>

          {isAnswered && <Stopwatch />}
          {isAnswered && <audio ref={audioElement} autoPlay={true} />}
          {!isAnswered && !dialing && (
            <audio src="/ringtone.mp3" autoPlay={true} onEnded={onClose} />
          )}

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
                onClick={onAnswer}
              >
                <span className="avatar-title bg-transparent font-size-24">
                  <i className="mdi mdi-phone-outline"></i>
                </span>
              </Button>
            </div>
          )}
        </div>

        <div className="p-4 bg-soft-primary mt-n4">
          <div className="mt-4 text-center">
            <h5 className="font-size-18 mb-0 text-truncate">
              {user ? `${user.name?.firstname} ${user.name?.lastname}` : ""}
            </h5>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AudioCallModal;

import { Button } from "antd";
import "./index.css";
import { SwapRightOutlined } from "@ant-design/icons";

const disabledSegment = {
  background: "#e5dfdf",
  cursor: "not-allowed",
};

const normalSegment = {
  background: "#fffff",
  cursor: "pointer",
};

const BookingList = ({
  list: bookings,
  disabled,
}: {
  list: any[];
  disabled?: boolean;
}) => {
  if (!bookings || bookings?.length < 1) return <></>;

  return (
    <>
      {bookings.map((segment: any) => (
        <div
          className="segmentItem"
          key={segment.id}
          style={!disabled ? normalSegment : disabledSegment}
        >
          <div className="infoSegment">
            <div className="segmentCode">
              <span>
                {segment?.originAndDestinationPair?.origin?.code || "--"}
              </span>
              <span>
                <SwapRightOutlined />
              </span>
              <span>
                {segment?.originAndDestinationPair?.destination?.code || "--"}
              </span>
            </div>
            <div className="segmentDetails">
              <p>
                {`${
                  segment?.originAndDestinationPair?.origin?.displayName || "--"
                }, ${segment?.originAndDestinationPair?.originCity || "--"}`}
              </p>
              <p>to</p>
              <p>
                {`${
                  segment?.originAndDestinationPair?.destination?.displayName ||
                  "--"
                }, ${
                  segment?.originAndDestinationPair?.destinationCity || "--"
                }`}
              </p>
            </div>
          </div>
          <div className="buttonContainer">
            <Button type="link" danger disabled={disabled}>
              Checking
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookingList;

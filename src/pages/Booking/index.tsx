import { useEffect, useMemo, useState } from "react";
import { Button, Card, Row } from "antd";
import BookingList from "./BookingList";
import "./index.css";
import DataManager from "../../dataManager";

const Booking = () => {
  const [metaData, setMeta] = useState({
    shipReference: "--",
    shipToken: "--",
    expiryTime: "--",
    segments: [],
    canIssueTicketChecking: false,
  });
  const dataManager = new DataManager();

  const exDate = useMemo(() => {
    const dateTime = new Date(Number(metaData?.expiryTime) * 1000);

    return `${dateTime.getFullYear() || "----"}/${
      String(dateTime.getMonth() + 1).padStart(2, "0") || "--"
    }/${String(dateTime.getDate()).padStart(2, "0") || "--"} ${String(
      dateTime.getHours()
    ).padStart(2, "0")}:${String(dateTime.getMinutes()).padStart(
      2,
      "0"
    )}:${String(dateTime.getSeconds()).padStart(2, "0")}`;
  }, [metaData?.expiryTime]);

  useEffect(() => {
    const loadData = async () => {
      const data = await dataManager.getData();
      console.log({ data });
      setMeta((prev) => ({ ...prev, ...data }));
    };
    loadData();
  }, []); // only loeading on mount

  const handleRefresh = async () => await dataManager.refreshData();

  return (
    <div className="container">
      <div className="mainHeader">
        <h1>Hello, Weclome to the Mock Booking Service!</h1>
      </div>
      <Card title={"Ship information"} className="middleContainer">
        <div className="infoRow">
          <div className="shipInfo">
            <h2>Ship Reference:</h2>
            <p>{metaData?.shipReference}</p>
          </div>
          <div className="shipInfo">
            <h2>Ship Token:</h2>
            <p>{metaData?.shipToken}</p>
          </div>
          <div className="shipInfo">
            <h2>Expiry Time:</h2>
            <p>{exDate}</p>
          </div>
        </div>
      </Card>
      <Card
        className="bookingListContainer"
        extra={
          <Button type="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        }
      >
        <BookingList
          list={metaData?.segments || []}
          disabled={!metaData?.canIssueTicketChecking}
        />
      </Card>
    </div>
  );
};

export default Booking;

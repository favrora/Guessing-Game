import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import '../assets/styles/Info.css';

/**
 * Info component for displaying user information and balance.
 */
const Info: React.FC = () => {
  // Select userName from the Redux store
  const userName = useSelector((state: RootState) => state.reduxStore.userName);
  
  // Select userBalance from the Redux store
  const userBalance = useSelector((state: RootState) => state.reduxStore.balance);

  return (
    <div className="row">
      <div className="col-12 col-md-4">
        <div className="card-box info-box">
          <div className="info-emoji">🏅</div>
          <div className="info-data">
            {userName ? userBalance.toLocaleString("en-US") : ""}
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-box info-box">
          <div className="info-emoji">🧑</div>
          <div className="info-data">{userName}</div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-box info-box">
          <div className="info-emoji">⏱</div>
          <div className="info-data">{userName ? "21:30" : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default Info;

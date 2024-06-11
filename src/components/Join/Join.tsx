import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setUserName } from "../../store/reduxStoreSlice";
import { default as socket } from "../../services/ws";
import './Join.css';

/**
 * Login component for allowing the user to enter a nickname and start the game
 */
const Join: React.FC = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const userName = useSelector((state: RootState) => state.reduxStore.userName);

  const submitNickname = () => {
    socket.emit("user nickname", nickname);
    dispatch(setUserName(nickname));
  };

  /**
   * Enable or disable the button based on the length of the nickname.
   */
  useEffect(() => {
    setIsButtonDisabled(nickname.length < 3);
  }, [nickname]);

  return (
    <div className={`card-box join-box ${userName ? "d-none" : ""}`} data-testid="join-component">
      <div className="join-title">Welcome</div>

      <form>
        <div className="join-hint">Please Insert Your Name</div>
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          placeholder="Enter your name"
        />

        <button
          className="btn btn-primary"
          onClick={submitNickname}
          type="button"
          disabled={isButtonDisabled}
        >
          Accept
        </button>
      </form>
    </div>
  );
}

export default Join;

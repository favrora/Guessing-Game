import { FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setUserName } from "../../store/reduxStoreSlice";
import { default as socket } from "../../services/ws";
import "./Join.css";

/**
 * Login component for allowing the user to enter a nickname and start the game
 */
const Join = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState<string>("");

  const userName = useSelector((state: RootState) => state.reduxStore.userName);
  const normalizedNickname = nickname.trim();

  const submitNickname = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (normalizedNickname.length < 3) return;

    socket.emit("user nickname", normalizedNickname);
    dispatch(setUserName(normalizedNickname));
  };

  return (
    <div className={`card-box join-box ${userName ? "d-none" : ""}`} data-testid="join-component">
      <div className="join-title">Welcome</div>

      <form onSubmit={submitNickname}>
        <div className="join-hint">Please Insert Your Name</div>
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          placeholder="Enter your name"
          aria-label="Player name"
          autoComplete="nickname"
          maxLength={24}
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={normalizedNickname.length < 3}
        >
          Accept
        </button>
      </form>
    </div>
  );
}

export default Join;

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LOCALSTORAGE_TOKEN } from "../constants";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    role="button"
    className={`btn ${
      canClick
        ? "bg-amber-500 hover:bg-amber-600"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);

export const LogOutBtn = () => {
  const onClick = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    window.location.reload();
  };

  return (
    <button className="m-4" onClick={onClick}>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="hover:text-purple-400 mr-5"
      />
    </button>
  );
};

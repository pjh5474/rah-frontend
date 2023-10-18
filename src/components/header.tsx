import { useMe } from "../hooks/useMe";
import { Logo } from "./logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Header = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="p-3 text-sm text-center bg-red-500 text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className=" py-4 bg-sky-300 ">
        <div className="w-full px-5 md:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Logo width="w-24" margin=" " />
          <span className=" text-lg">
            <Link to="/my-profile">
              <FontAwesomeIcon icon={faUser} className=" text-2xl " />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};

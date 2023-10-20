import { useMe } from "../hooks/useMe";
import { Logo } from "./logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { LogOutBtn } from "./button";

export const Header = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="p-3 text-base text-center bg-red-500 text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className=" py-4">
        <div className="w-full px-5 md:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Logo width="w-36" margin="md:ml-5" />
          <div className=" text-lg flex items-center justify-around">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className=" text-2xl mr-5" />
            </Link>
            <LogOutBtn />
          </div>
        </div>
      </header>
    </>
  );
};

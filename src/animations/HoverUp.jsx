import { useAtom } from "jotai";
import { NavLink } from "react-router-dom";
import { activeNavAtom } from "../../atom";

const HoverUp = ({ text, size, link }) => {
  const [activeNav, setActiveNav] = useAtom(activeNavAtom);

  return (
    <>
      {activeNav == text ? (
        <NavLink onClick={() => setActiveNav(text)} to={link}>
          <div
            className={`group text-teal-400 overflow-hidden flex relative cursor-pointer text-${size} uppercase leading-6`}
          >
            <div className="inline-block p-1 transition duration-500 ease-out group-hover:-translate-y-[105%]">
              {text}
            </div>
            <div className="absolute left-0 p-1 translate-y-[105%] rotate-12 transition duration-500 ease-out group-hover:translate-y-0 group-hover:rotate-0">
              {text}
            </div>
          </div>
        </NavLink>
      ) : (
        <NavLink onClick={() => setActiveNav(text)} to={link}>
          <div
            className={`group text-zinc-100 overflow-hidden flex relative cursor-pointer text-${size} uppercase leading-6`}
          >
            <div className="inline-block p-1 transition duration-500 ease-out group-hover:-translate-y-[105%]">
              {text}
            </div>
            <div className="absolute left-0 p-1 translate-y-[105%] rotate-12 transition duration-500 ease-out group-hover:translate-y-0 group-hover:rotate-0">
              {text}
            </div>
          </div>
        </NavLink>
      )}
    </>
  );
};

export default HoverUp;

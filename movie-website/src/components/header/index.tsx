import { Link } from "react-router";
import { NavigationOptionsProps } from "../../types/NavTypes";

const Header = () => {
  return (
    <header className="bg-[#E0230D] shadow-md shadow-[#E0531D] text-white flex items-center justify-between h-18">
      <Link to="/"><h1 className="p-6 text-xl">JWMovies</h1></Link>
      <NavigationOptions options={["Home"]} />
    </header>
  );
};


const NavigationOptions = ({options}: NavigationOptionsProps) => {
  return(
    <nav>
      {options.map((option, index) => <Link to="/"  className="p-6 text-lg" key={index}>{option}</Link>)}
    </nav>
  );
};

export { Header };

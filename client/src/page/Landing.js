import Header from "../component/Header";
import Button from "../component/Button";
import Body from "../component/Body";
import Footer from "../component/Footer";
import banner from "../images/banner.0.jpg.avif";
import { Link } from "react-router-dom";

function Landing({ id }) {
  const action = (
    <div className="flex">
      <Link to="/student">
        <Button outline primary>
          Student Login
        </Button>
      </Link>
      <Link to="/university">
        <Button outline secondary>
          University Login
        </Button>
      </Link>
      <Link to="/company">
        <Button outline warning>
          Corporate Login
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header title={"Cert"} action={action}></Header>
      <Body>
        <div className="h-full w-full flex">
          <img alt="banner" src={banner} className="h-full w-full" />
          <div className="absolute h-full w-full flex justify-center item-center">
            <span className="text-2xl text-white text-red flex flex-col justify-center">
              Digital Certificate Verification
            </span>
          </div>
        </div>
      </Body>
      <Footer></Footer>
    </div>
  );
}

export default Landing;

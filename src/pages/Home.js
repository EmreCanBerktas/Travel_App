import Navbar from "../components/Navbar";
import travel from "../assets/travel.svg";
import target from "../assets/target.svg";
import travelTogether from "../assets/travelTogether.svg";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-page">
        <img src={travel} width="400" height="150" alt="Travel"></img>
        <h2>Gitmek istediğin yere güvenli ve ekonomik bir şekilde git</h2>
        <img src={target} width="400" height="150" alt="Target"></img>
        <h2>Hedefine zamanında ulaş hiç vakit kaybetme</h2>
        <img
          src={travelTogether}
          width="400"
          height="250"
          alt="Travel Together"
        ></img>
        <h2>Yeni insanlar tanı yeni yüzler keşfet</h2>
      </div>
    </div>
  );
}

export default Home;

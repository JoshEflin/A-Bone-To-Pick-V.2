import { Link } from "react-router-dom";
import drawnLogo from "../assets/images/homepagelogo.png";

export default function Home ( {link}) {
  console.log(link)

  return (
<div className="empty-doggy-dash">
  <p className="welcome-message">Welcome to the Doggy Dashboard!</p>
  <div className="instructions">
    A Bone To Pick is the perfect dog adoption website. It let's you search your
    area for dogs in need of a new home
  </div>
  <Link to={link}>
    <img id="old-logo" src={drawnLogo} alt="a poorly drawn image of a dog" />
  </Link>
  <div className="instructions">
    Just enter a Zip Code and Breed into the search bar above to start your
    journey. Can you collect them all?
  </div>
</div>
  )
}
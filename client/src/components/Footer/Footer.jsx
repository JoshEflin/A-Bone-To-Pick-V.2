import { Footer } from "antd/es/layout/layout";
import { Divider } from "antd";
import gitHubIcon from "../../assets/images/github-icon.png";

export default function Foot() {
  return (
    <>
      <Divider> </Divider>
      <Footer>
        <div className="footer-column">
          <h3>Bone To Pick is brought to you by:</h3>
          <p>The Awesome Scorpions:</p>
        </div>
        <div className="footer-box">
          <div className="footer-div">
            <a href = "https://github.com/msaylorphila">
              <div id="margGit">
                <img className="git-hub-icon" src={gitHubIcon} />
                  Margaret
              </div>
            </a>
          </div>
          <div className="footer-div">
            <a href="https://github.com/LearnedDr">
              <div id="fredGit">
                <img className="git-hub-icon" src={gitHubIcon} />
                  Fred
              </div>
            </a>
          </div>
          <div className="footer-div">
            <a href = "https://github.com/JoshEflin">
              <div id="joshGit">
                <img className="git-hub-icon" src={gitHubIcon} />
                Josh
              </div>
            </a>
          </div>
        </div>
      </Footer>
    </>
  );
}

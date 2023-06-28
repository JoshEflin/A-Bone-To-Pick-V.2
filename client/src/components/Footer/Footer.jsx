import { Footer } from "antd/es/layout/layout";
import { Divider } from "antd";

export default function Foot() {
  return (<>
 <Divider> </Divider>
    <Footer>
      <h3>Bone To Pick is brought to you by:</h3>
      <p>Awesome Scorpions</p>
      <div class="flex">
        <div >
          <button id="margGit" >
            <img
              class="dogicon" src="./assets/images/dogiconedit.png" />Margaret's Github</button>
        </div>
        <div class="column is-3">
          <button id="fredGit" ><img
              class="dogicon" src="./assets/images/dogiconedit.png" />Fred's Github</button>
        </div>
        <div class="column is-3">
          <button id="joshGit" ><img
              class="dogicon" src="./assets/images/dogiconedit.png" />Josh's Github</button>
        </div>
      </div>
    </Footer>
    </>
  );
}

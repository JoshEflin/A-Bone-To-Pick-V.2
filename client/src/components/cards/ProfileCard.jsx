import styles from '../../pages/ProfilePage.module.css';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND, REMOVE_FRIEND } from '../../utils/mutations';

export default function ProfileCard({props}) {
console.log(props)

const imageData = props?.profilePic;
  let defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const [addFriend] = useMutation(ADD_FRIEND);
const [removeFriend] = useMutation(REMOVE_FRIEND);

const handleFollowFriend = async () => {
  console.log("friendId is currently hardcoded")
  try {
    const { data } = await addFriend({
      variables: {
        friendId: "649a24501d67e6365ae03efe",
      },
    });
    console.log("Hello")
    if (!data) {
      throw new Error("You have no friends");
    }
    } catch (err) {
      console.error(err);
    }
  }

  //just switch the button to do handleRemoveFriend once userdata and medata are available

  // const handleRemoveFriend = async () => {//used to be friendId variable inside async parenthesis
  //   try {
  //     const { data } = await removeFriend({
  //       variables: {
  //         friendId: "649a24501d67e6365ae03efe",
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



return (
  <div  className="user-card">
        <div className="user-card-border">
          <div className="user-card-header">
            <span className="user-name">
              {props.username}
            </span>
            <span className="user-breed">
              Human
            </span>
          </div>
          <div className="user-card-header2">
            <span className="cards-owned">
              {props.email}
            </span>
            
          </div>
          {imageData ? (
              <img
                className={styles.profilePic}
                src={imageData}
                alt="Database profile"
              />
            ) : (
              <img
                className={styles.profilePic}
                src={defaultProfilePic}
                alt="Default profile"
              />
            )}
          <div className="user-attributes">
            <span className="size">
              Saved {props.dogCards.length} Cards(poorly worded)
            </span>
            <span className="house-trained">
              <i className=" fa-solid fa-poop"></i>
            </span>
          </div>
            <div className="flex">
              <button onClick = {handleFollowFriend} className={styles.btnProfile}>Add Friend</button>
            <button className={styles.btnProfile}>Edit Profile</button>
            </div>
          
        </div>
      </div>
)

}
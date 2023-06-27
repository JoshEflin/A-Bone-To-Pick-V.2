import styles from '../../pages/ProfilePage.module.css';

export default function ProfileCard({props}) {
console.log(props)
const imageData = props?.profilePic;
  let defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
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
            {/* <span className="size">
              Saved {props.dogCards.length} Cards(poorly worded)
            </span> */}
            <span className="house-trained">
              <i className=" fa-solid fa-poop"></i>
            </span>
          </div>
            <div className="flex">
              <button className={styles.btnProfile}>View My Pack</button>
            <button className={styles.btnProfile}>Edit Profile</button>
            </div>
          
        </div>
      </div>
)

}
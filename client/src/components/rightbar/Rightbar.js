import "./rightbar.css";
import image from "./gift.png";
import image2 from "./nike.jpg";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          {/* <img className="birthdayImg" src={image} alt="" /> */}
          <span>
            <p className="birthdayTitle">E2I2 사이트 소개</p>
            <p className="birthdayText">
              E2I2는 블록체인 기반의 SNS로 게시글 작성을 통해 토큰을 인센티브로 지급받으실 수 있습니다.
            </p>
            <p className="birthdayText">E2I2 MARKET에서 구매한 NFT는 평생 소장할 수 있으며 다른 유저와 교환과 거래를 할 수 있습니다.</p>
          </span>
        </div>
        <img className="rightbarAd" src={image2} alt="" />
        <h4 className="rightbarTitle">E2I2 홈페이지에 온 걸 환영합니다!</h4>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}

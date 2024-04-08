import { Col, Row } from "antd";
import goldenStar from "../assets/golden_star.svg";
import silverStar from "../assets/silver_star.svg";
import avatar from "../assets/avatar.svg";

interface User {
  id: number;
  email: string;
  fullName: string;
  scores: number;
}

interface IProps {
  position: number;
  user: User;
}

const RankingRow = (props: IProps) => {
  const { position, user } = props;

  return (
    <Row className="gap-x-2">
      <Col className="flex justify-center items-center">
        {position === 1 && (
          <img
            src={goldenStar}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-full"
          />
        )}
        {position === 2 && (
          <img
            src={silverStar}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-full"
          />
        )}
        {position === 3 && (
          <img
            src={silverStar}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-full"
          />
        )}
        {position >= 4 && position <= 10 && (
          <div className="w-[45px] h-[45px] flex justify-center items-center bg-[#ececec] rounded-full">
            <p className="text-white text-2xl">{position}</p>
          </div>
        )}
      </Col>
      <div className="flex gap-x-80 justify-between items-center">
        <Col className="w-auto">
          <Row className="text-sm text-black">{user?.fullName}</Row>
          <Row className="text-sm text-black font-semibold">
            Total score: {user?.scores}
          </Row>
          <Row className="text-sm text-black"></Row>
        </Col>
        <Col>
          <img
            src={avatar}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-full"
          />
        </Col>
      </div>
    </Row>
  );
};

export default RankingRow;

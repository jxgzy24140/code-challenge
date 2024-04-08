import axios from "axios";
import { Col, Divider } from "antd";
import React, { useEffect, useState } from "react";
import RankingRow from "../components/RankingRow";
import { socket } from "../utils";

interface IUser {
  id: number;
  email: string;
  fullName: string;
  scores: number;
}

const RankingPage = () => {
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    const initSocket = () => {
      socket.on("connect", () => {
        console.log("Connection established");
      });

      socket.on("update-ranking", (data: any) => {
        setUsers(data);
      });
    };

    const fetchUsersRanking = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/ranking"
      );
      if (response.data.success) setUsers(response.data.data);
    };
    initSocket();
    fetchUsersRanking();
    return () => {
      socket.off("connection");
    };
  }, []);

  return (
    <Col className="min-h-screen flex flex-col gap-y-2 justify-center items-center bg-[#34e8eb]">
      {users?.map((item: any, index: number) => {
        if (index === users.length - 1)
          return <RankingRow position={index + 1} user={item} key={index} />;
        return (
          <>
            <RankingRow position={index + 1} user={item} key={index} />
            <Divider />
          </>
        );
      })}
    </Col>
  );
};

export default RankingPage;

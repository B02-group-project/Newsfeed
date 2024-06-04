import { useEffect, useState } from "react";
import supabase from "../api/supabase.client";

const FetchData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("PROFILE").select("*");
      if (error) {
        console.log("error=>", error);
      } else {
        setUsers(data);
        console.log("data=>", data);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      FetchData
      {users.map((user) => {
        return (
          <div key={user.id} style={{ border: "1px solid black" }}>
            <h3>아이디 : {user.id}</h3>
            <h3>이름 : {user.name}</h3>
            <h3>생일 : {user.birthday}</h3>
            <h3>전화번호 : {user.phone}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default FetchData;

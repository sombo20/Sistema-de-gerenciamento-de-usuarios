import MenuItem from "../../header/Menu";
import React, { useEffect, useState } from "react";

const Home = () => {
  const token = import.meta.env.VITE_APP_TOKEN;
  const [userdates, setUserdate] = useState([]);

  useEffect(() => {
    const request = async function () {
      try {
        const response = await fetch(
          "https://gorest.co.in//public/v2/users?page=1&per_page=5",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setUserdate(data);
      } catch (error) {}
    };

    request();
  }, []);

  return (
    <>
      <MenuItem />
      {userdates.map((item: any) => {
        {
          item.id;
        }
      })}
    </>
  );
};

export default Home;

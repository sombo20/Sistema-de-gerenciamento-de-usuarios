import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuItem from "../../header/Menu";
import { Card, Button, Spin, Space ,notification} from "antd";
import { Link, useNavigate } from "react-router-dom";

interface Userdates {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default function ShowUserDetails() {
  const { id } = useParams();
  const [userdates, setUserdate] = useState<Userdates>({
    id: 0,
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const naviagate = useNavigate();
  const [load, setLoad] = useState(false);
  const token = import.meta.env.VITE_APP_TOKEN;
  const url = import.meta.env.VITE_APP_URL;

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Delete",
      description: "User Deleted",
      duration: 0,
    });
  };


  useEffect(() => {
    const request = async function () {
      try {
        setLoad(true);
        const response = await fetch(`${url}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setUserdate({
          id: data.id,
          name: data.name,
          email: data.email,
          gender: data.gender,
          status: data.status,
        });

        const message = data.message;
        if (message.indexOf("Resource not found") != -1) {
          naviagate("/");
        }
      } catch (error) {
      } finally {
        setLoad(false);
      }
    };

    request();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${url}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      openNotification()
      request()
    } catch (error) {
      
    }
  };

  return (
    <>
      <MenuItem />

      {load && (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}

      {!load && (
        <Card style={{ width: 300 }}>
          <p>Name: {userdates.name}</p>
          <p>Email: {userdates.email}</p>
          <p>Gender: {userdates.gender}</p>
          <p>Status: {userdates.status}</p>

          <Button onClick={() => handleDelete(userdates.id)}>Delete</Button>
          <Button type="link">
            <Link to={`/edit/user/${userdates.id}`}>Edit</Link>
          </Button>
        </Card>
      )}
    </>
  );
}

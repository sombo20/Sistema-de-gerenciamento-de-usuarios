import {useEffect} from 'react'
import { useParams } from "react-router-dom";

export default async function request(form) {
     const { id } = useParams();
     const token = import.meta.env.VITE_APP_TOKEN;
     const url = import.meta.env.VITE_APP_URL;

      try {
        const response = await fetch(`${url}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

       /* const data = await response.json();
        formState.setFieldsValue({
          username: data.name,
          email: data.email,
          status: data.status,
          gender: data.gender,
        });*/
      } catch (error) {
        //openNotification("Error","Please try again")
      }
    };

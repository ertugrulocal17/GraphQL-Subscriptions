import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "./querires";
import { Typography } from "antd";

const { Title } = Typography;

function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, { variables: { id } });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error.message}</div>;
  }

  const { event } = data;

  return (
    <div>
      <Title level={3}>{event.title}</Title>
      <div>{event.desc}</div>
      <div>{event.date}</div>
      <div>{event.location.name}</div>
      <div>{event.user.username}</div>
    </div>
  );
}

export default Event;

import React from "react";
import { List, Skeleton } from "antd";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "./queries";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error.message}</div>;
  }
  console.log(data);
  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data.events}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<Link to={`/event/${item.id}`}>{item.title}</Link>}
                description={item.desc.slice(0, 200)}
              />
              <div>{item.date}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;

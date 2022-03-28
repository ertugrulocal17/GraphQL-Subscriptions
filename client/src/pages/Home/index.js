import { React, useEffect } from "react";
import { List, Skeleton } from "antd";
import { useQuery } from "@apollo/client";
import { EVENT_SUBSCRIPTION, GET_EVENTS } from "./queries";
import { Link } from "react-router-dom";
import NewEventForm from "./NewEventForm";
function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    subscribeToMore({
      document: EVENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          events: [subscriptionData.data.eventCreated, ...prev.events],
        };
      },
    });
  }, [subscribeToMore]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <div>
      <NewEventForm />
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

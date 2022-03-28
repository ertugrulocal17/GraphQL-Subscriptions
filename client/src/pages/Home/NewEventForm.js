import React from "react";
import { Form, Input, Button, Select, message } from "antd";

import { useMutation, useQuery } from "@apollo/client";

import styles from "./styles.module.css";
import { GET_ALL_LOCATION, GET_ALL_USER, NEW_EVENT_MUTATION } from "./queries";
const { Option } = Select;
function NewEventForm() {
  const [saveEvent, { loading, data }] = useMutation(NEW_EVENT_MUTATION);

  const { loading: get_user_loading, data: users_data } =
    useQuery(GET_ALL_USER);

  const { loading: get_location_loading, data: location_data } =
    useQuery(GET_ALL_LOCATION);

  const handleSubmit = async (values) => {
    try {
      await saveEvent({
        variables: {
          data: values,
        },
      });
      message.success("Event saved!", 4);
    } catch (e) {
      console.log(e);
      message.error("Event not saved!", 10);
    }
  };

  return (
    <div className={styles.formMargin}>
      <Form
        size="large"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please enter a title!" }]}
        >
          <Input placeholder="Enter a title" disabled={loading} />
        </Form.Item>

        <Form.Item
          name="desc"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.TextArea
            placeholder="Enter a placeholder"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="date"
          rules={[{ required: true, message: "Please enter a date!" }]}
        >
          <Input placeholder="Enter a date" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="from"
          rules={[{ required: true, message: "From required!" }]}
        >
          <Input placeholder="From" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="to"
          rules={[{ required: true, message: "To required!" }]}
        >
          <Input placeholder="To" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="location_id"
          rules={[{ required: true, message: "Please select location!" }]}
        >
          <Select
            disabled={get_location_loading || loading}
            loading={get_location_loading}
            placeholder="Select a location"
            size="medium"
          >
            {location_data &&
              location_data.locations.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          disabled={loading}
          name="user_id"
          rules={[{ required: true, message: "Please select user!" }]}
        >
          <Select
            disabled={get_user_loading || loading}
            loading={get_user_loading}
            placeholder="Select a user"
            size="medium"
          >
            {users_data &&
              users_data.users.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.username}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewEventForm;

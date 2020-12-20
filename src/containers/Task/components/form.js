import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Input, DatePicker, TimePicker, Button } from "antd";

const format = "HH:mm";

const Form = ({ create }) => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => {
    const taskData = {
      task_msg: data.description,
      task_date: data.date,
      task_time: data.time,
      assigned_user: 1,
    };
    create(taskData);
  };

  useEffect(() => {
    register({ name: "description" }, { required: true });
    register({ name: "date" }, { required: true });
    register({ name: "time" }, { required: true });
  }, []);

  const onChangeDate = (date, dateString) => {
    setValue("date", dateString);
  };

  const onChangeTime = (time, timeString) => {
    setValue("time", timeString);
  };

  return (
    <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
      <p style={{ color: "#000000", float: "left", fontSize: 15 }}>
        Task Description
      </p>
      <Input
        name="description"
        onChange={(e) => setValue("description", e.target.value)}
      />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <p
          style={{
            color: "#000000",
            float: "left",
            fontSize: 15,
            marginRight: 150,
            marginTop: 10,
          }}
        >
          Date
        </p>
        <p
          style={{
            color: "#000000",
            float: "left",
            fontSize: 15,
            marginTop: 10,
          }}
        >
          Time
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DatePicker onChange={onChangeDate} style={{ marginRight: 50 }} />
        <TimePicker onChange={onChangeTime} format={format} />
      </div>

      <div style={{ float: "right", marginBottom: 20, marginTop: 20 }}>
        <Button type="link">Cancel</Button>
        <Button form="myForm" type="primary" key="submit" htmlType="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

Form.propTypes = {};

export default Form;

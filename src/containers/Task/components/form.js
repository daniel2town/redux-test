import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Input, DatePicker, TimePicker, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import moment from "moment";

const format = "HH:mm";

const Form = ({
  create,
  update,
  dispatch,
  handleClick,
  updateData,
  updating,
  remove,
}) => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => {
    const seconds = new Date(
      moment(data.time ? data.time : updateData.task_time, format)
    ).getTime();

    const taskData = {
      task_msg: data.description ? data.description : updateData.task_msg,
      task_date: data.date ? data.date : updateData.task_date,
      task_time: seconds,
      assigned_user: "user_2e6297571fcb4e07ae724ef5a82a2353",
    };
    console.log(taskData);

    if (!updating) {
      dispatch(create(taskData));
      handleClick("save", false);
    } else {
      dispatch(update(taskData, updateData.id));
      handleClick("save", false);
    }
  };

  useEffect(() => {
    register({ name: "description" });
    register({ name: "date" });
    register({ name: "time" });
  }, []);

  const onChangeDate = (date, dateString) => {
    setValue("date", dateString);
  };

  const onChangeTime = (time, timeString) => {
    setValue("time", timeString);
  };

  const handleDelete = (id) => {
    handleClick("delete", false);
    dispatch(remove(id));
  };

  return (
    <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
      <p style={{ color: "#000000", float: "left", fontSize: 15 }}>
        Task Description
      </p>
      {!updating ? (
        <Input
          name="description"
          onChange={(e) => setValue("description", e.target.value)}
        />
      ) : (
        <Input
          name="description"
          defaultValue={updateData.task_msg}
          onChange={(e) => setValue("description", e.target.value)}
        />
      )}

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
        {!updating ? (
          <>
            <DatePicker onChange={onChangeDate} style={{ marginRight: 50 }} />
            <TimePicker onChange={onChangeTime} format={format} />
          </>
        ) : (
          <>
            <DatePicker
              defaultValue={moment(updateData.task_date)}
              onChange={onChangeDate}
              style={{ marginRight: 50 }}
            />
            <TimePicker
              defaultValue={moment(updateData.task_time)}
              onChange={onChangeTime}
              format={format}
            />
          </>
        )}
      </div>

      {updating && (
        <DeleteOutlined
          style={{ float: "left", marginTop: 25, color: "red" }}
          onClick={() => handleDelete(updateData.id)}
        />
      )}

      <div style={{ float: "right", marginBottom: 20, marginTop: 20 }}>
        <Button
          style={{ color: "grey" }}
          type="link"
          onClick={() => handleClick("cancel", false)}
        >
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: "#00BD79",
            borderRadius: 5,
            color: "white",
          }}
          form="myForm"
          key="submit"
          htmlType="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

Form.propTypes = {};

export default Form;

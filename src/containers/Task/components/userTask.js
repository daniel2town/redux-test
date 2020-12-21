import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Image, Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

import moment from "moment";

const userTask = ({ data, handleClick }) => {
  const infos = data && data.allTasks && data.allTasks.results;

  return (
    <>
      <Row>
        {infos &&
          infos.map((info) => {
            return (
              <>
                <Col span={8}>
                  <Image
                    style={{ marginLeft: -25 }}
                    width={50}
                    src={info.user_icon}
                  />
                </Col>
                <Col span={8}>
                  <p
                    style={{
                      color: "#000000",
                      fontSize: 15,
                      marginLeft: -130,
                      marginTop: 0,
                    }}
                  >
                    {info.task_msg}
                  </p>
                  <p
                    style={{
                      color: "red",
                      fontSize: 10,
                      marginLeft: -130,
                      marginTop: 5,
                    }}
                  >
                    {moment(info.task_date).format("l")}
                  </p>
                </Col>
                <Col span={8}>
                  <Tooltip title="Edit Task">
                    <Button
                      style={{ float: "right" }}
                      icon={<EditOutlined />}
                      onClick={() => handleClick("update", true, info)}
                    />
                  </Tooltip>
                </Col>
              </>
            );
          })}
      </Row>
    </>
  );
};

userTask.propTypes = {};

export default userTask;

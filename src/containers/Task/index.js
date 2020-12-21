import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import makeSelectTask from "./selectors";
import { createTask, getTask, updateTask, deleteTask } from "./actions";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Divider,
  Container,
  Text,
  Stack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { Tooltip } from "antd";

import Form from "./components/form";
import UserTask from "./components/userTask";

export const Task = (props) => {
  const { dispatch, task } = props;

  const info = task && task.allTasks && task.allTasks.results;

  const [isMounted, setMount] = useState(false);
  const [isClicked, setClick] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdate] = useState("");

  useEffect(() => {
    if (!isMounted) {
      dispatch(getTask());
    }
    setMount(true);
  }, []);

  const handleClick = (action, bool, data) => {
    if (action === "add") {
      setClick(bool);
      setIsUpdating(false);
    } else if (action === "save") {
      setClick(bool);
      setIsUpdating(false);
    } else if (action === "cancel") {
      setClick(bool);
      setIsUpdating(false);
    } else if (action === "update") {
      setIsUpdating(true);
      setUpdate(data);
      setClick(bool);
    } else if (action === "delete") {
      setClick(bool);
    }
  };

  return (
    <Container style={{ width: 400 }}>
      <Accordion
        style={{ backgroundColor: "white", marginBottom: 50 }}
        defaultIndex={0}
      >
        <AccordionItem style={{ backgroundColor: "#E1F1FA" }}>
          <>
            <AccordionButton style={{ backgroundColor: "white" }}>
              <Box flex="1" textAlign="left">
                <Text style={{ color: "#000000" }}>
                  TASKS {info && info.length}
                </Text>
              </Box>
              <Stack direction="row" h="20px">
                <Divider
                  orientation="vertical"
                  style={{ color: "red", marginRight: 10 }}
                />
                <Tooltip title="Add Task">
                  <AiOutlinePlus
                    fontSize="18px"
                    style={{ color: "#000000", margin: "auto" }}
                    onClick={() => handleClick("add", true)}
                  />
                </Tooltip>
              </Stack>
            </AccordionButton>
            <AccordionPanel pb={4}>
              {isClicked ? (
                <Form
                  dispatch={dispatch}
                  create={createTask}
                  update={updateTask}
                  remove={deleteTask}
                  handleClick={handleClick}
                  updateData={updateData}
                  updating={isUpdating}
                />
              ) : (
                <UserTask data={task} handleClick={handleClick} />
              )}
            </AccordionPanel>
          </>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

Task.propTypes = {
  createTask: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  task: makeSelectTask(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Task);

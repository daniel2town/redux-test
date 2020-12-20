import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import makeSelectTask from "./selectors";
import { createTask } from "./actions";
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
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import Form from "./components/form";

export const Task = (props) => {
  console.log(props);
  return (
    <Container style={{ width: 400 }}>
      <Accordion allowToggle style={{ backgroundColor: "white" }}>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text style={{ color: "#000000" }}>TASKS 0</Text>
                </Box>
                <Stack direction="row" h="20px">
                  <Divider
                    orientation="vertical"
                    style={{ color: "red", marginRight: 10 }}
                  />
                  {isExpanded ? (
                    <AiOutlineMinus
                      fontSize="12px"
                      style={{ color: "#000000", margin: "auto" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      fontSize="12px"
                      style={{ color: "#000000", margin: "auto" }}
                    />
                  )}
                </Stack>
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Form create={createTask} />
              </AccordionPanel>
            </>
          )}
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
    createTask: (e) => dispatch(createTask(e)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Task);

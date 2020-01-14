import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  Grommet,
  Form,
  FormField,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea
} from 'grommet';
import { grommet } from 'grommet/themes';
import $ from 'jquery';
import useFormSubmit from './useFormSubmit.jsx';
import { post } from 'axios';

const CarSpecs = () => {

  const save = (value) => {
    post('/data', value)
      .then(() => document.getElementById("carForm").reset())
  }

	return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            id="carForm"
            onReset={event => console.log(event)}
            onSubmit={({ value }) => {
              console.log("Submit", value);
              save(value);
            }}
          >
            <FormField
              required
              label="Car Size"
              name="carSize"
              component={Select}
              onChange={event => console.log(event)}
              options={["compact", "standard", "small SUV", "SUV", "other"]}
            />
            <FormField
              label="Make/Model (optional)"
              name="make"
              validate={{ regexp: /^[a-z]/i }}
            />
            <FormField
              required
              name="driverStatus"
              component={CheckBox}
              pad
              label="Driver?"
            />
            <FormField
              required
              name="timeOfday"
              component={RadioButtonGroup}
              pad
              options={["morning", "mid-day", "evening", "night"]}
            />
            <FormField
              required
              label="Difficulty level (low to high)"
              name="difficulty"
              component={RangeInput}
              pad
              min={1}
              max={10}
            />
            <FormField label="Comments" name="comments" component={TextArea} />
            <Box direction="row" justify="between" margin={{ top: "medium", bottom: "medium" }}>
              <Button label="Cancel" />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Save" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default CarSpecs;

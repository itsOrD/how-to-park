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
} from "grommet";
import { grommet } from "grommet/themes";

const CarSpecs = () => {

	return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onReset={event => console.log(event)}
            onSubmit={({ value }) => console.log("Submit", value)}
          >
            <FormField
              label="Car Size"
              name="carSize"
              component={Select}
              onChange={event => console.log(event)}
              options={["compact", "standard", "small SUV", "SUV", "other"]}
            />
            <FormField
              label="Make/Model (optional)"
              name="make"
              required
              validate={{ regexp: /^[a-z]/i }}
            />
            <FormField
              name="driverStatus"
              component={CheckBox}
              pad
              label="Driver?"
            />
            <FormField
              name="ampm"
              component={RadioButtonGroup}
              pad
              options={["morning", "mid-day", "evening", "night"]}
            />
            <FormField
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

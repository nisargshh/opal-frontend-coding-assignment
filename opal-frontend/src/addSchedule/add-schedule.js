import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import TimePicker from "react-time-picker";

function AddSchedule(props) {
  // State for the form
  const [form, setForm] = useState({
    app: "",
    startTime: "",
    endTime: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  // Handle input change for the form
  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let tempform = form;
    tempform[name] = value;
    setForm(tempform);
  }

  //Handle input change for the start time
  function handleStartTimeChange(time) {
    let tempForm = form;
    tempForm.startTime = time;
    setForm(tempForm);
  }

  //Handle input change for end time
  function handleEndTimeChange(time) {
    let tempForm = form;
    tempForm.endTime = time;
    setForm(tempForm);
  }

  //Handle foorm submit
  function handleSubmit() {
    let repeat = false;
    if (
      form.monday ||
      form.tuesday ||
      form.wednesday ||
      form.thursday ||
      form.friday ||
      form.saturday ||
      form.sunday
    ) {
      repeat = true;
    }
    let newSchedule = {
      app: form.app,
      startTime: form.startTime,
      endTime: form.endTime,
      repeat: repeat,
      days: {
        monday: form.monday,
        tuesday: form.tuesday,
        wednesday: form.wednesday,
        thursday: form.thursday,
        friday: form.friday,
        saturday: form.saturday,
        sunday: form.sunday,
      },
    };

    props.handleFormSubmit(newSchedule);
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* App Name */}
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalApp">
            <Form.Label column sm={2}>
              App
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="app"
                type="text"
                placeholder="App Name"
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>
          {/* Start Time */}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalAStartTime"
          >
            <Form.Label column sm={2}>
              Start Time
            </Form.Label>
            <Col sm={10}>
              <TimePicker
                name="startTime"
                value={form.startTime}
                onChange={handleStartTimeChange}
              />
            </Col>
          </Form.Group>
          {/* End Time */}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalAEndTime"
          >
            <Form.Label column sm={2}>
              end Time
            </Form.Label>
            <Col sm={10}>
              <TimePicker
                name="endTime"
                value={form.endTime}
                onChange={handleEndTimeChange}
              />
            </Col>
          </Form.Group>
          {/* Day checkboxes */}
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Radios
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="checkbox"
                  label="monday"
                  name="monday"
                  id="formHorizontalCBMonday"
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="tuesday"
                  name="tuesday"
                  id="formHorizontalCBTuesday"
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="wednesday"
                  name="wednesday"
                  id="formHorizontalCBWednesday"
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="thursday"
                  name="thursday"
                  id="formHorizontalCBThursday"
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="friday"
                  name="friday"
                  id="formHorizontalCBFriday"
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="saturday"
                  name="saturday"
                  id="formHorizontalCBSaturday"
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="sunday"
                  name="sunday"
                  id="formHorizontalCBSunday"
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
          </fieldset>
          {/* Close and submit */}
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default AddSchedule;

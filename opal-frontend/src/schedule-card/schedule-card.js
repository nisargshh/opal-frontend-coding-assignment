import { Card } from "react-bootstrap";

function ScheduleCard(props) {
  return (
    <Card style={{ borderRadius: "10px", margin: "5px" }}>
      <Card.Body>
        <div>
          {props.app}
          <br />
          Start Time: {props.startTime}
          <br />
          End Time: {props.endTime}
          <br />
          Repeated Days:{" "}
          {props.days.map(function (i) {
            return <div>{i}</div>;
          })}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ScheduleCard;

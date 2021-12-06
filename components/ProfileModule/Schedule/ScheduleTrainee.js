import React from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import Client from "../../../services/Client";
import { Component } from "react";
import styles from "./Schedule.module.css";
import { Form, Modal } from "semantic-ui-react";
import moment from "moment";

function TraineeSchedule({ user }) {
  return <ScheduleTrainee user={user} />;
}

class ScheduleTrainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      eventCalendar: [
        {
          title: "",
          duration: "",
          start: "",
        },
      ],
      titleDetail: "",
      durationDetail: "",
      startDetail: "",
    };
    this.calendar = React.createRef();
    this.setCalendarRef = (element) => {
      this.calendar = element;
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  handleModal(infor) {
    this.handleOpen();
    this.setState({ titleDetail: infor.event.title });
    this.setState({ durationDetail: infor.event.duration });
    this.setState({ startDetail: infor.event.start });
  }

  componentDidMount() {
    const start = this.calendar.current._calendarApi.view.activeStart;
    const end = this.calendar.current._calendarApi.view.activeEnd;
    const { user } = this.props;
    const res = Client(`trainee?userId=${user.id} `, "GET")
      .then((res) => {
        const dat = Client(
          `trainee/${res.data.id}/lessons?startTime=${start}&endTime=${end}`,
          "GET"
        ).then((res2) => {
          return res2.data.map((item) => {
            return {
              title: item.name,
              start: item.startTime,
              duration: item.duration,
            };
          });
        });
        return dat;
      })
      .catch((error) => {
        return error.response.data;
      });
    
    res.then((result) => this.setState({ eventCalendar: result }));
  }

  render() {
    return (
      <div className={styles.fullCalendar}>
        <FullCalendar
          plugins={[
            interactionPlugin,
            timeGridPlugin,
            dayGridPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            start: "",
            center: "title",
            end: "",
          }}
          footerToolbar={{
            left: "prev,next today",
            center: "",
            right: "dayGridMonth,timeGridWeek",
          }}
          views={{
            listDay: { buttonText: "list day" },
            listWeek: { buttonText: "list week" },
          }}
          eventClick={this.handleModal}
          titleFormat={{ year: "numeric", month: "long", day: "numeric" }}
          initialView="dayGridMonth"
          nowIndicator={true}
          editable={true}
          events={this.state.eventCalendar}
          ref={this.calendar}
          aspectRatio={0.95}
        />
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon
          size="tiny"
        >
          <Modal.Header>Schedule</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Title</label>
                <input value={this.state.titleDetail} disabled />
              </Form.Field>
              <Form.Field>
                <label>Start At</label>
                <input
                  value={moment(this.state.startDetail).format("LLL")}
                  disabled
                />
              </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default TraineeSchedule;

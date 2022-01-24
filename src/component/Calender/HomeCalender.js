import Date from "component/Calender/Date";
import ToDidList from "component/Calender/ToDidList";
import Week from "component/Calender/Week";
import useCalender from "Hook/useCalender";
import moment from "moment";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Container, Row, Table, Toast } from "react-bootstrap";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "fbase";
import CalenderHeader from "component/Calender/CalenderHeader";
import CalenderBody from "component/Calender/CalenderBody";

const Calender = ({ userObj }) => {
  // 2번씩 로드됨

  const { date, setDate, getDatesOfCurrentMonth } = useCalender(); //month가 하루씩 당겨짐 ex 12월은 11월

  console.log(date);
  const LastMonthClick = () => {
    if (date.month <= 0) {
      setDate((pre) => ({ year: pre.year - 1, month: 11, date: pre.date }));
    } else {
      setDate((pre) => ({
        year: pre.year,
        month: pre.month - 1,
        date: pre.date,
      }));
    }
  };

  const NextMonthClick = () => {
    if (date.month >= 11) {
      setDate((pre) => ({ year: pre.year + 1, month: 0, date: pre.date }));
    } else {
      setDate((pre) => ({
        year: pre.year,
        month: pre.month + 1,
        date: pre.date,
      }));
    }
  };

  return (
    <>
      {userObj && (
        <>
          <Container>
            <CalenderHeader
              date={date}
              LastMonthClick={LastMonthClick}
              NextMonthClick={NextMonthClick}
            />
            <Row>
              <Col md>
                <CalenderBody
                  getDatesOfCurrentMonth={getDatesOfCurrentMonth}
                  userObj={userObj}
                  date={date}
                  LastMonthClick={LastMonthClick}
                  NextMonthClick={NextMonthClick}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Calender;
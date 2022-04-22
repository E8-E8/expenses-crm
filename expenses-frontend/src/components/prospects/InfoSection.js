import { useState, useEffect } from "react";
import api from "../../http/axios";

function InfoSection({ prospectId }) {
  useEffect(() => {
    api
      .get(`/prospects/${prospectId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((res) => {
        const expense = res.data.expense;
        if (expense != undefined) {
        }
      });
  }, [show]);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return <h1>Info</h1>;
}

export default InfoSection;

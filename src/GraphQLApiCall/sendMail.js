import React, { useState, useEffect, useContext } from "react";


import { send } from "emailjs-com";

export default function sendMail(emailMessage){
 
  if (emailMessage != null) {
    try {
      send(
        "service_cet6yld",
        "template_lz2pbhk",
        {
          subject: emailMessage?.subject,
          phone: emailMessage?.phone,
          email: emailMessage?.email,
          message: emailMessage?.message,
        },
        "-1w6JIyY86JNITM1a"
      )
      return {
        result: true,
        message: 'success',
      };
     
    } catch (error) {
      return {
        result: false,
        message: `${error}`,
      };
    }

  } else {
    return {
      result: false,
      message: `Email Send Data is Empty.`,
    };
  }

}

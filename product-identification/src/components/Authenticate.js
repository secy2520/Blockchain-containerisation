import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios"

import "../css/Authenticate.css";
import { wait } from "@testing-library/user-event/dist/utils";

function isParseableJSON(str) {
  try {
      JSON.parse(str);
      return true;
  } catch (e) {
      return false;
  }
}

const Authenticate = ({ account }) => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="cam">
        <h4 style={{ color: "#000", position: "fixed", right: 8, top: 2 }}>
          Wallet Address:{" "}
          {account.substring(0, 4) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </h4>
        <br />
        <h2 style={{ position: "absolute", top: 20 }}>
          Hold QR Code Steady and Clear to Scan
        </h2>
        
        <div style={{margin:2,width: 300,
        height: 300}}>
        <QrReader 
          constraints={{
            facingMode: "environment",
          }}
          key="environment"
          onResult={async (result, error) => {
            console.log(result);
            console.log(process.env.REACT_APP_BACKEND_SERVICE_URL )
            if (!!result) {
              if(isParseableJSON(result.text)){
                let data = JSON.parse(result.text)
                let status=await axios.get(`http://${process.env.REACT_APP_BACKEND_SERVICE_URL }/getStatus/${data.itemid}`)
                console.log(status.data)
                  
                  console.log(data)
                  let res = await axios.get(`http://${process.env.REACT_APP_BACKEND_SERVICE_URL }/getTransaction/${data.hash}`)
                  console.log(res)
                  if (res) {
                    setMessage("Product is Authenticated ✅");
                    let setstatus=await axios.post(`http://${process.env.REACT_APP_BACKEND_SERVICE_URL }/setStatus/${data.itemid}`)
                    console.log(setstatus.status)
                    setAuth(true);
                  }
                // else setMessage("Product is Already Authenticated or Invalid Qr code ✅");

              }
              else alert("Invalid Qr code")
              
            }
            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
          }}
        >
          <div>
            <h1>{message}</h1>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 90 }}>
          <h3>
            Please wait for 15 sec if Authentication messages is not appearing
            on the screen then your product is not Authenticated.
          </h3>
          <br />
          <span>Please reload the page to Scan again.</span>
        </div>
      </div>
    </>
  );
};

export default Authenticate;

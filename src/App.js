import React from "react";
import "./App.css";

// declare must use it is a zoom code with out this getting error
declare var ZoomMtg;

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.2.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function App() {
    //end point to generate a signature every time
    var signatureEndpoint = "https://allodocapi.herokuapp.com/";
    //jwt key from my account
    var apiKey = "DbLlIBBuQnG6W_WG-I_a7Q";
    //need to create a meeting id auto
    var meetingNumber = "8389683980";
    var role = 0;
    ////after meeting redirect link
    var leaveUrl = "http://localhost:3000";
    //joining person name
    var userName = "React";
    var userEmail = "";
    var passWord = "8LTYbG";
    // no need
    var registrantToken = "";

    function getSignature(e) {
        e.preventDefault();
        // calling the signature end point
        fetch(signatureEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                meetingNumber: meetingNumber,
                role: role,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                startMeeting(response.signature);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function startMeeting(signature) {
        document.getElementById("zmmtg-root").style.display = "block";

        ZoomMtg.init({
            leaveUrl: leaveUrl,
            success: (success) => {
                console.log(success);

                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: meetingNumber,
                    userName: userName,
                    apiKey: apiKey,
                    userEmail: userEmail,
                    passWord: passWord,
                    tk: registrantToken,
                    success: (success) => {
                        console.log(success);
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    return (
        <div className="App">
            <main>
                <h1>Zoom Integration With React</h1>

                <button onClick={getSignature}>Join Meeting</button>
            </main>
        </div>
    );
}

export default App;

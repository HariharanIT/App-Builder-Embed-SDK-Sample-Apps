import React, { useEffect, useRef, useState } from 'react';
import './app.css';
import AppBuilderReactSdk from '@appbuilder/react';

function App() {
  const [sdkToken, setSdkToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGlvbl90eXBlIjoxLCJhcHBfaWQiOiJmMDJjN2Q4OTczZjk0NDVhOWJhYTVjOTFhODdmNmRkMSIsInVzZXJfaWQiOiJjLTBmMmY2YzI3LTZmNmQtNGE2Yy1iOGUxLWNmNGQ1MWMzMjY3NCIsInByb2plY3RfaWQiOiJmNzk3YmE3ZDQ2YzFlMzFmNzJiZCIsImNvbXBhbnlfaWQiOjM5NDk2MSwiZXhwIjoxNjcwNTgyNDM3fQ.E2lHWV4N6Ff7JaUFp3kNgI1F3A2V8DYX8NQ8k237H_g',
  );
  const eventUnsubscriptionEvents = useRef([]);
  useEffect(() => {
    try {
      console.log('supriya useeffect APP js');
      AppBuilderReactSdk.initialize({
        token: sdkToken,
      })
        .then((data) => {
          console.log('supriya data: ', data);
        })
        .catch((error) => {
          console.log('supriya ******** error', error);
        });
    } catch (error) {
      console.log('Supriya Initializing sample app error: ', error);
    }
    const myCustomization = AppBuilderReactSdk.createCustomization({
      // components:{
      //     videocall: () => <div>Hi</div>
      //   }
    });

    AppBuilderReactSdk.customize(myCustomization);

    const unsubCreateEvent = AppBuilderReactSdk.on(
      'create',
      (hostMeetingId, attendeeMeetingId, pstnNumber) => {
        console.log('React Host App: Meeting created with', {
          hostMeetingId,
          attendeeMeetingId,
          pstnNumber,
        });
      },
    );
    const unsubReadyToJoinEvent = AppBuilderReactSdk.on(
      'ready-to-join',
      (meetingTitle, deviceList) => {
        console.log('React Host App: precall with', {
          meetingTitle,
          deviceList,
        });
      },
    );
    const unsubJoinEvent = AppBuilderReactSdk.on(
      'join',
      (meetingTitle, deviceList, isHost) => {
        console.log('React Host App: joined with', {
          meetingTitle,
          deviceList,
          isHost,
        });
      },
    );
    const unsubLeaveEvent = AppBuilderReactSdk.on('leave', () => {
      console.log('React Host App: left');
    });

    eventUnsubscriptionEvents.current = [
      unsubCreateEvent,
      unsubReadyToJoinEvent,
      unsubJoinEvent,
      unsubLeaveEvent,
    ];

    return () => {
      unsubCreateEvent();
      unsubReadyToJoinEvent();
      unsubJoinEvent();
      unsubLeaveEvent();
    };
  }, []);

  const joinMeeting = () => {
    console.log(document.getElementById('meetingId').value);
    AppBuilderReactSdk.join(document.getElementById('meetingId').value);
  };

  const unsubscribe = () => {
    eventUnsubscriptionEvents.current.forEach((element) => {
      if (element) {
        console.log('elment', element);
        element();
      }
    });
  };

  return (
    <div className="App">
      <div className="header">
        <span>My React App</span>
        <input id="meetingId" type="text" placeholder="Room id"></input>
        <button onClick={joinMeeting}>Join</button>
        <button onClick={unsubscribe}>Unsubscribe</button>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <AppBuilderReactSdk.View />
      </div>
    </div>
  );
}

export default App;

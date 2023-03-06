import React, { useEffect, useRef, useState } from 'react';
import './app.css';
import AppBuilderReactSdk from '@appbuilder/react';

function App() {
  const [sdkToken, setSdkToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGlvbl90eXBlIjoxLCJhcHBfaWQiOiJmOWM1MDE3NWY4NjY0MDJmOWRkMWEyNDlmYjE2ZDkxNyIsInVzZXJfaWQiOiJjLTJmZDJlNGYzLTI1NDAtNGE0MS1hM2NmLWY2ODMyZTZjNzk1OCIsInByb2plY3RfaWQiOiIxNzVjZjhiYzRjYjY5NDRlZWY1ZSIsImV4cCI6MTY3ODA5Nzc3M30.J3k9slQIUyIATvTewHgnAzJGaD9f0Zi8Kjp6mbJYkxU',
  );
  const eventUnsubscriptionEvents = useRef([]);

  useEffect(() => {
    AppBuilderReactSdk.on('token-not-found', () => {
      console.log('debugging token-not-found triggered');
    });
    AppBuilderReactSdk.on('will-token-expire', () => {
      console.log('debugging will-token-expire triggered');
    });
    AppBuilderReactSdk.on('did-token-expire', () => {
      console.log('debugging did-token-expire triggered');
    });

    try {
      AppBuilderReactSdk.setAppBuilerToken(sdkToken)
        .then((data) => {
          console.log('set token success');
        })
        .catch((error) => {
          console.log('set token failure', error);
        });
    } catch (error) {
      console.log('set token error: ', error);
    }
    // const myCustomization = AppBuilderReactSdk.createCustomization({
    //   // components:{
    //   //     videocall: () => <div>Hi</div>
    //   //   }
    // });
    // AppBuilderReactSdk.customize(myCustomization);
    // const unsubCreateEvent = AppBuilderReactSdk.on(
    //   'create',
    //   (hostMeetingId, attendeeMeetingId, pstnNumber) => {
    //     console.log('React Host App: Meeting created with', {
    //       hostMeetingId,
    //       attendeeMeetingId,
    //       pstnNumber,
    //     });
    //   },
    // );
    // const unsubReadyToJoinEvent = AppBuilderReactSdk.on(
    //   'ready-to-join',
    //   (meetingTitle, deviceList) => {
    //     console.log('React Host App: precall with', {
    //       meetingTitle,
    //       deviceList,
    //     });
    //   },
    // );
    // const unsubJoinEvent = AppBuilderReactSdk.on(
    //   'join',
    //   (meetingTitle, deviceList, isHost) => {
    //     console.log('React Host App: joined with', {
    //       meetingTitle,
    //       deviceList,
    //       isHost,
    //     });
    //   },
    // );
    // const unsubLeaveEvent = AppBuilderReactSdk.on('leave', () => {
    //   console.log('React Host App: left');
    // });
    // eventUnsubscriptionEvents.current = [
    //   unsubCreateEvent,
    //   unsubReadyToJoinEvent,
    //   unsubJoinEvent,
    //   unsubLeaveEvent,
    // ];
    // return () => {
    //   unsubCreateEvent();
    //   unsubReadyToJoinEvent();
    //   unsubJoinEvent();
    //   unsubLeaveEvent();
    // };
  }, []);

  // const joinMeeting = () => {
  //   console.log(document.getElementById('meetingId').value);
  //   AppBuilderReactSdk.join(document.getElementById('meetingId').value);
  // };

  // const unsubscribe = () => {
  //   eventUnsubscriptionEvents.current.forEach((element) => {
  //     if (element) {
  //       console.log('elment', element);
  //       element();
  //     }
  //   });
  // };

  return (
    <div className="App">
      <div className="header">
        <span>My React App</span>
        {/* <input id="meetingId" type="text" placeholder="Room id"></input>
        <button onClick={joinMeeting}>Join</button>
        <button onClick={unsubscribe}>Unsubscribe</button> */}
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <AppBuilderReactSdk.View />
      </div>
    </div>
  );
}

export default App;

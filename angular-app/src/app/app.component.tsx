import { Component } from "@angular/core";
import AppBuilderWebSdk, { React } from "@appbuilder/web";
import DummyComponent, { useAfterEndCallHook } from "./DummyComponent";
import WrapperProvider from "./app.wrapper";
console.log("debugging AppBuilderWebSDK", AppBuilderWebSdk);
@Component({
  selector: "app-root",
  template: `
    <div class="App">
      <div style=" display: flex; flex: 1 ">
        <app-builder> </app-builder>
      </div>
    </div>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular-app";

  ngOnInit() {
    const myCustomization = AppBuilderWebSdk.createCustomization({
      components: {
        videoCall: {
          wrapper: WrapperProvider,
        },
      },
      config: {
        defaultRootFallback: DummyComponent,
      },
      lifecycle: {
        useAfterEndCall: useAfterEndCallHook,
      },
    });
    AppBuilderWebSdk.customize(myCustomization);

    //token
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGlvbl90eXBlIjoxLCJhcHBfaWQiOiI5YWM0YzhmMThkMjU0YTc0OWNkYzkzYTlhMTc0Njc4OSIsInVzZXJfaWQiOiJjLWZlZmFhZWRjLWViM2EtNGRmOS1hZThiLTgwMTA2MzY2YzBlOCIsInByb2plY3RfaWQiOiI2NjRmNzVkZmY4YTU0M2RlNzI1NCIsImV4cCI6MTcxODI2MzM0Nn0.u4zafqTALg3CR4VObNrkUesFf55H365zeZEF07Xig7c";
    AppBuilderWebSdk.login(token)
      .then(() => {
        console.log("debugging login success");
        //host
        AppBuilderWebSdk.joinPrecall(
          "3bfe2c35-dd75-4a9b-a198-6982ac7da96f",
          "",
          false
        );
        // //attendee
        // AppBuilderWebSdk.joinPrecall(
        //   "e100eb1c-b8ca-4d4c-9060-850d591cd1a7",
        //   "",
        //   false
        // );
      })
      .catch((err) => {
        console.log("debugging login failure", err);
      });
  }

  ngOnDestroy() {}
}

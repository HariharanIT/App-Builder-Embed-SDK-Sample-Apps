import { Component } from "@angular/core";
import AppBuilderWebSdk, { React } from "@appbuilder/web";
import DummyComponent, { useAfterEndCallHook } from "./DummyComponent";
import WrapperProvider from "./app.wrapper";
// Prevent dead code elimination on react
React.createElement("div");

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

    setTimeout(() => {
      AppBuilderWebSdk.joinPrecall(
        "510f4f74-a973-41e6-82b7-8b29314f281a",
        "",
        false
      );
    }, 3000 * 2);
  }

  ngOnDestroy() {}
}

import { Component } from "@angular/core";
import AppBuilderWebSdk from "@appbuilder/web";
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
    const myCustomization = AppBuilderWebSdk.createCustomization({});
    AppBuilderWebSdk.customize(myCustomization);
  }

  ngOnDestroy() {}
}

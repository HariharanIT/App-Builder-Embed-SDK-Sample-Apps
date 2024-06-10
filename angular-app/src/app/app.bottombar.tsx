import { React, ToolbarPreset } from "@appbuilder/web";
const CustomBottomBar = () => {
  return (
    <ToolbarPreset
      align="bottom"
      defaultItemsConfig={{ invite: { hide: "yes" } }}
    />
  );
};
export default CustomBottomBar;

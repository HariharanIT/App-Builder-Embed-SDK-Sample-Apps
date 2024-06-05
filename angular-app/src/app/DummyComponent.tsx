import { React, useHistory } from "@appbuilder/web";

export const useAfterEndCallHook = () => {
  const h = useHistory();
  return (isHost: boolean, history: History) => {
    try {
      h.push("create");
    } catch (error) {
      console.log("debugging error", error);
    }
    return Promise.resolve();
  };
};

const DummyComponent = () => {
  return (
    <div
      style={{
        color: "white",
        minHeight: 600,
        alignSelf: "center",
        justifyContent: "center",
        margin: 10,
        alignContent: "center",
      }}
    >
      {"Custom Loading..."}
    </div>
  );
};
export default DummyComponent;

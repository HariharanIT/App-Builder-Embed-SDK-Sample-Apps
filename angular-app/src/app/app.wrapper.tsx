import { React, useContent, useRoomInfo } from "@appbuilder/web";

const { useEffect, useState } = React;

export interface WrapperInterface {
  customKey1?: string;
  customKey2?: string;
}

const WrapperContext = React.createContext<WrapperInterface>({});

interface WrapperProviderProps {
  children: React.ReactNode;
}

export const WrapperProvider = (props: WrapperProviderProps) => {
  const { data } = useRoomInfo();
  const { defaultContent, activeUids } = useContent();

  const [customState, setCustomState] = useState<WrapperInterface>({});

  const [showInfoMsg, setShowInfoMsg] = useState(false);
  useEffect(() => {
    if (!data.isHost && activeUids.length == 1) {
      setShowInfoMsg(true);
    } else {
      setShowInfoMsg(false);
    }
  }, [data, activeUids]);

  return (
    <WrapperContext.Provider value={{ ...customState }}>
      {showInfoMsg ? (
        <div className="waiting-info-msg" style={{ background: "red" }}>
          Your Teacher will be joining shortly
        </div>
      ) : (
        <> </>
      )}
      {props.children}
    </WrapperContext.Provider>
  );
};

export default WrapperProvider;

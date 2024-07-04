import IframeResizer from "iframe-resizer-react";
import React, { useRef, useState } from "react";

import MessageData from "./message-data";

export default () => {
  const ref = useRef(null);
  const [messageData, setMessageData] = useState(undefined);

  const onResized = (data) => setMessageData(data);

  const onMessage = (data) => {
    setMessageData(data);
    ref.current.sendMessage("Hello back from parent page");
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Automagically resizing React iFrame component</h2>
      <p>
        Resize window or click one of the links in the iFrame to watch it
        resize.
      </p>
      <div style={{ margin: "20px 0" }}>
        <IframeResizer
          log
          inPageLinks
          forwardRef={ref}
          onMessage={onMessage}
          onResized={onResized}
          src="/iframe-resizer-react/html/frame.content.html"
          width="100%"
          scrolling="no"
        />
      </div>
      <p id="callback">
        <MessageData data={messageData} />
      </p>
      <div style={{ margin: "8px 0", fontSize: "13px" }}>
        For details on how this works, see{" "}
        <a href="http://davidjbradshaw.github.io/iframe-resizer/">
          http://davidjbradshaw.github.io/iframe-resizer/
        </a>
        .
      </div>
    </div>
  );
};

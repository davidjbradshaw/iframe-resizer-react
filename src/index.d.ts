declare module "iframe-resizer-react" {
  import * as React from "react";

  namespace IframeResizer {
    type IFrameObject = {
      close: () => void;
      moveToAnchor: (anchor: string) => void;
      resize: () => void;
      sendMessage: (message: any, targetOrigin?: string) => void;
      removeListeners: () => void;
    };
    interface IFrameComponent extends HTMLIFrameElement {
      iFrameResizer: IFrameObject;
    }

    type IframeProps = React.DetailedHTMLProps<
      React.IframeHTMLAttributes<HTMLIFrameElement>,
      HTMLIFrameElement
    >;

    type ResizerOptions = {
      log?: boolean;
      autoResize?: boolean;
      bodyBackground?: string | null;
      bodyMargin?: string | number | null;
      bodyPadding?: string | number | null;
      checkOrigin?: boolean | string[];
      inPageLinks?: boolean;
      enablePublicMethods?: boolean;
      heightCalculationMethod?:
        | "bodyOffset"
        | "bodyScroll"
        | "documentElementOffset"
        | "documentElementScroll"
        | "max"
        | "min"
        | "grow"
        | "lowestElement"
        | "taggedElement";
      maxHeight?: number;
      maxWidth?: number;
      minHeight?: number;
      minWidth?: number;
      resizeFrom?: "parent" | "child";
      scrolling?: boolean | "omit";
      sizeHeight?: boolean;
      sizeWidth?: boolean;
      tolerance?: number;
      widthCalculationMethod?:
        | "bodyOffset"
        | "bodyScroll"
        | "documentElementOffset"
        | "documentElementScroll"
        | "max"
        | "min"
        | "scroll"
        | "rightMostElement"
        | "taggedElement";
    };

    type ResizerEvents = {
      onInit?: (iframe: IFrameComponent) => void;
      onMessage?: (ev: { iframe: IFrameComponent; message: any }) => void;
      onResized?: (ev: {
        iframe: IFrameComponent;
        height: number;
        width: number;
        type: string;
      }) => void;
      onScroll?: (ev: { x: number; y: number }) => boolean;
    };

    type IframeResizerProps = Omit<IframeProps, "scrolling"> &
      ResizerOptions &
      ResizerEvents;
  }

  function IframeResizer(
    props: IframeResizer.IframeResizerProps
  ): React.ReactElement;
  export = IframeResizer;
}

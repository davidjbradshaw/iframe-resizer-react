# iframe-resizer-react

[![NPM](https://img.shields.io/npm/v/iframe-resizer-react.svg)](https://www.npmjs.com/package/iframe-resizer-react)

This library is the official React interface for [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer), which enables the automatic resizing of the height and width of both same and cross domain iFrames to fit their contained content. It provides a range of features to address the most common issues with using iFrames, these include:

- Height and width resizing of the iFrame to content size.
- Works with multiple and nested iFrames.
- Domain authentication for cross domain iFrames.
- Provides a range of page size calculation methods to support complex CSS layouts.
- Detects changes to the DOM that can cause the page to resize using [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver).
- Detects events that can cause the page to resize (Window Resize, CSS Animation and Transition, Orientation Change and Mouse events).
- Simplified messaging between iFrame and host page via [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage).
- Fixes in page links in iFrame and supports links between the iFrame and parent page.
- Provides custom sizing and scrolling methods.
- Exposes parent position and viewport size to the iFrame.
- Works with [ViewerJS](http://viewerjs.org/) to support PDF and ODF documents.
- Supports IE 11

## Donate

Iframe-resizer is the result of many 100s of hours of work, if you would like to join others in showing support for the development of this project, then please feel free to buy me a coffee.

<a href="https://www.buymeacoffee.com/davidjbradshaw " target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Install

```bash
npm install --save iframe-resizer-react
```

## Usage

The `<IframeResizer />` component can be passed all`<iframe>` atrributes, along with _[options](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/options.md)_ and _[events](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/events.md)_ from [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer). You can also optionally pass a `forwardRef` to gain access to a few _[methods](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/methods.md)_ that provide a simple interface to communicate with the page in the iframe.

```jsx
<IframeResizer
  {iframe attributes}
  {iframe-resizer options}
  {iframe-resizer events}
/>
```

The page in the iframe then needs ([iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js)) from [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer). _This file is designed to be a guest on someone else's system, so has no dependencies and won't do anything until it's activated by a message from the containing page_.

### Typical setup

The normal configuration is to have the iframe resize when the browser window changes size or the content of the iFrame changes. To set this up you need to configure one of the dimensions of the iFrame to a percentage and tell the library to only update the other dimension. Normally you would set the width to 100% and have the height scale to fit the content.

```jsx
<IframeResizer
  log
  src="http://anotherdomain.com/iframe.html"
  style={{ width: '1px', minWidth: '100%'}}
/>
```

**Note:** Using _min-width_ to set the width of the iFrame, works around an issue in iOS that can prevent the iFrame from sizing correctly.

### Advanced Setup

This is a more advanced configuration, taken from the [example](https://github.com/davidjbradshaw/iframe-resizer-react/tree/master/example) folder, which demostrates the use of _options_, _events_ and _methods_ from the [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer) API. See below for more details.

```jsx
import React, { useRef, useState } from 'react'
import IframeResizer from 'iframe-resizer-react'

import MessageData from './message-data'

export default () => {
  const iframeRef = useRef(null)
  const [messageData, setMessageData] = useState()

  const onResized = data => setMessageData(data)

  const onMessage = data => {
    setMessageData(data)
    iframeRef.current.sendMessage('Hello back from the parent page')
  }

  return (
    <>
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="lowestElement"
        inPageLinks
        log
        onMessage={onMessage}
        onResized={onResized}
        src="http://anotherdomain.com/iframe.html"
        style={{ width: '1px', minWidth: '100%'}}
      />
      <MessageData data={messageData} />
    </>
  )
}
```

## API Documentation

The full [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer) API is supported by the `<IframeResizer/>` compontent, except for the methods and events used to remove an iframe from the page. Instead you should just remove the componet via JSX and it will internally call these methods for you to remove attached handlers.

- **Parent Page API**
  - [Options](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/options.md)
  - [Events](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/events.md) _(**Except** onClose and onClosed)_
  - [Methods](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/methods.md) _(**Except** close() and removeListeners())_
  _These methods are exported directly via `forwardRef`, rather than being attached to the iframe_
- **IFramed Page API**
  - [Options](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/options.md)
  - [Events](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/events.md)
  - [Methods](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/methods.md)
- [Troubleshooting](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/troubleshooting.md)

## Alternatives

This project uses React Hooks internally, so requires React 16.8 or later. If you are using an older version of React or require support for IE8-10 then you should checkout [react-iframe-resizer-super](https://github.com/zeroasterisk/react-iframe-resizer-super#readme), which is based on iframe-resizer v3.

## License

MIT © [davidjbradshaw](https://github.com/davidjbradshaw)

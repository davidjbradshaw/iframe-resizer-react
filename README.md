# iframe-resizer-react

[![NPM](https://img.shields.io/npm/v/iframe-resizer-react.svg)](https://www.npmjs.com/package/iframe-resizer-react)

This library is the offical React interface for [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer).

## Install

```bash
npm install --save iframe-resizer-react
```

## Usage

```jsx
import React from 'react'
import IframeResizer from 'iframe-resizer-react'

const Example = () => {
  <IframeResizer
    {iframe attributes}
    {iframe-resizer options}
    {iframe-resizer events}
  />
```

The page in the iframe then needs ([iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js)) from [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer). _This file is designed to be a guest on someone else's system, so has no dependencies and won't do anything until it's activated by a message from the containing page_.

### Typical setup

The normal configuration is to have the iFrame resize when the browser window changes size or the content of the iFrame changes. To set this up you need to configure one of the dimensions of the iFrame to a percentage and tell the library to only update the other dimension. Normally you would set the width to 100% and have the height scale to fit the content.

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
import IframeResizer from 'iframe-resizer-react'
import React, { useRef, useState } from 'react'

import MessageData from './message-data'

export default () => {
  const iframeRef = useRef(null)
  const [messageData, setMessageData] = useState(undefined)

  const onResized = data => setMessageData(data)

  const onMessage = data => {
    setMessageData(data)
    iframeRef.current.sendMessage('Hello back from the parent page')
  }

  return (
    <div>
      <IframeResizer
        log
        inPageLinks
        forwardRef={iframeRef}
        onMessage={onMessage}
        onResized={onResized}
        src="http://anotherdomain.com/iframe.html"
        style={{ width: '1px', minWidth: '100%'}}
      />
      <MessageData data={messageData} />
    </div>
  )
}
```

## API Documentation

The full [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer) API is supported by the `<IframeResizer/>` compontent, except for the methods and events used to remove an iframe from the page, instead you should just remove the componet via JSX and it will internally call these methods for you to remove attached handlers. The parent page methods are exported via `forwardRef`.

- **Parent Page API**
  - [Options](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/options.md)
  - [Events](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/events.md) _(**Except** onClose and onClosed)_
  - [Methods](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/methods.md) - _(**Except** close() and removeListeners())_
- **IFramed Page API**
  - [Options](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/options.md)
  - [Events](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/events.md)
  - [Methods](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/methods.md)
- [Troubleshooting](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/troubleshooting.md)

## Alternatives

This project uses React Hooks internally, so requires React 18.8 or later. If you are using an older version of React or require support for IE8-10 then you should checkout [react-iframe-resizer-super](https://github.com/zeroasterisk/react-iframe-resizer-super#readme), which is based on iframe-resizer version 3.

## License

MIT © [davidjbradshaw](https://github.com/davidjbradshaw)

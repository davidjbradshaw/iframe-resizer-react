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
    ref={ref}
    src="..."
    style={{ width: '1px', minWidth: '100%'}}
    {iframe tag attributes}
    {iframe-resizer options}
    {iframe-resizer events}
  />
```

**Note:** Using _min-width_ to set the width of the iFrame, works around an issue in iOS that can prevent the iFrame from sizing correctly.

## API Documentation

All IFrame-Resizer parent page _options_ and _events_ can be directly passed as props to the `<IframeResizer/>` compontent. A subset of the methods are exported via `ref`.

- **Parent Page API**
  - [Options](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/options.md)
  - [Events](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/events.md)
  - Methods - _Coming soon_

## License

MIT © [davidjbradshaw](https://github.com/davidjbradshaw)

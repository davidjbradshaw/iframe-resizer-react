import IframeResizer from 'iframe-resizer-react'
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <h2>Automagically resizing React iFrame component</h2>
        <p>
          Resize window or click one of the links in the iFrame to watch it
          resize.
        </p>
        <div style={{ margin: '20px' }}>
          <IframeResizer
            log
            src="http://davidjbradshaw.com/iframe-resizer/example/frame.content.html"
            width="100%"
            scrolling="no"
          />
        </div>
        <p id="callback" />
        <div style={{ margin: '8px 0', fontSize: '13px' }}>
          For details on how this works, see{' '}
          <a href="http://davidjbradshaw.github.io/iframe-resizer/">
            http://davidjbradshaw.github.io/iframe-resizer/
          </a>
          .
        </div>
      </div>
    )
  }
}

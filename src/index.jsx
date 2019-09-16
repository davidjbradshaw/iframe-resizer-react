import iframeResize from 'iframe-resizer/js/iframeResizer'
import PropTypes from 'prop-types'
import React, { useEffect, useImperativeHandle, useRef } from 'react'

const IframeResizer = props => {
  const { title, forwordRef, ...rest } = props
  const {
    autoResize,
    bodyBackground,
    bodyMargin,
    bodyPadding,
    checkOrigin,
    inPageLinks,
    heightCalculationMethod,
    interval,
    log,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    resizeFrom,
    scrolling,
    sizeHeight,
    sizeWidth,
    warningTimeout,
    tolerance,
    widthCalculationMethod,
    onClosed,
    onInit,
    onMessage,
    onResized,
    ...iframeProps
  } = rest

  const iframeRef = useRef(null)
  let api

  useEffect(() => () => api.removeListeners()) // eslint-disable-line unicorn/consistent-function-scoping

  const onLoad = () => {
    if (!api) {
      ;[api] = iframeResize(props, iframeRef.current)
    }
  }

  useImperativeHandle(forwordRef, () => ({
    resize: api && api.resize,
    moveToAnchor: api && api.moveToAnchor,
    sendMessage: api && api.sendMessage,
  }))

  return (
    <iframe title={title} {...iframeProps} ref={iframeRef} onLoad={onLoad} />
  )
}

IframeResizer.defaultProps = {
  id: undefined,
  title: 'iframe',
}

IframeResizer.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
}

export default IframeResizer

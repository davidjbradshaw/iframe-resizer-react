import iframeResize from 'iframe-resizer/js/iframeResizer'
import PropTypes from 'prop-types'
import React, { useEffect, useImperativeHandle, useRef } from 'react'
import warning from 'warning'

import filterIframeAttribs from './filter-iframe-attribs'

const onClose = () => false

const IframeResizer = props => {
  const { title, forwardRef, ...rest } = props
  const iframeProps = filterIframeAttribs(rest)
  const iframeRef = useRef(null)

  const onClosed = () => {
    warning(
      false,
      `[iframeSizerReact][${iframeRef.current.id}] Close event ignored, to remove the iframe update your React component`
    )
  }

  // This hook is only run once, as once iframeResizer is bound, it will
  // deal with changes to the element and does not need recalling
  useEffect(() => {
    const iframe = iframeRef.current

    if (!iframe.iframeResizer)
      iframeResize({ ...rest, onClose, onClosed }, iframe)

    return () => iframe.iframeResizer && iframe.iframeResizer.removeListeners()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useImperativeHandle(forwardRef, () => ({
    resize: () => iframeRef.current.iFrameResizer.resize(),
    moveToAnchor: anchor =>
      iframeRef.current.iFrameResizer.moveToAnchor(anchor),
    sendMessage: (message, targetOrigin) => {
      iframeRef.current.iFrameResizer.sendMessage(message, targetOrigin)
    },
  }))

  return <iframe title={title} {...iframeProps} ref={iframeRef} />
}

IframeResizer.defaultProps = {
  title: 'iframe',
}

IframeResizer.propTypes = {
  title: PropTypes.string,
}

export default IframeResizer

import PropTypes from 'prop-types'
import React from 'react'

const MessageData = (props) => {
  const { data } = props

  return data ? (
    data.message ? (
      <span>
        <b>Frame ID:</b> {data.iframe.id} &nbsp;
        <b>Message:</b> {data.message}
      </span>
    ) : (
      <span>
        <b>Frame ID:</b> {data.iframe.id} &nbsp;
        <b>Height:</b> {data.height} &nbsp;
        <b>Width:</b> {data.width} &nbsp;
        <b>Event type:</b> {data.type}
      </span>
    )
  ) : null
}

MessageData.defaultProps = {
  data: undefined,
}

MessageData.propTypes = {
  data: PropTypes.object,
}

export default MessageData

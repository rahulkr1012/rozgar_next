import React from 'react'

const InterviewContext = React.createContext()

export const InterviewProvider = InterviewContext.Provider
export const InterviewConsumer = InterviewContext.Consumer

export default InterviewContext
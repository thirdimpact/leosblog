import React from 'react'
import Confetti from 'react-confetti'

function Konfetti() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 pointer-events-none transform-gpu">
      <Confetti width={window.innerWidth} height={window.innerheight} />
    </div>
  )
}

function Button(props) {
  return (
    <button
      className="focus:outline-none bg-black text-white px-6 py-3 rounded-full hover:bg-green-500 transition-colors duration-150"
      {...props}
    />
  )
}

export default function Festlig() {
  const [partyTime, setPartyTime] = React.useState(false)
  return (
    <div className="flex items-center justify-center min-h-screen">
      {!partyTime && (
        <Button
          onClick={function () {
            setPartyTime(true)
          }}
        >
          Start festen
        </Button>
      )}
      {partyTime && (
        <>
          <Button
            onClick={function () {
              setPartyTime(false)
            }}
          >
            Dra hjem
          </Button>
          <Konfetti />
        </>
      )}
    </div>
  )
}

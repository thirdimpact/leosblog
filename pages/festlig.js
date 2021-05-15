import React from 'react'
import Confetti from 'react-confetti'

function useDimensions() {
  const [slow, setSlow] = React.useState(true)
  const [size, setSize] = React.useState({
    x: typeof window !== 'undefined' ? window.innerWidth : 0,
    y: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  React.useEffect(
    function () {
      let frame
      function handleResize() {
        if (slow) {
          setSize({
            x: window.innerWidth,
            y: window.innerHeight,
          })
        } else {
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(function () {
            setSize({
              x: window.innerWidth,
              y: window.innerHeight,
            })
          })
        }
      }
      window.addEventListener('resize', handleResize, false)
      return function () {
        window.removeEventListener('resize', handleResize, false)
      }
    },
    [setSize]
  )
  return [size, slow, setSlow]
}

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
  const [{ x, y }, slow, setSlow] = useDimensions()
  console.log({ x, y })
  const [partyTime, setPartyTime] = React.useState(false)
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ width: x + 'px', height: y + 'px' }}
    >
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
      {slow && (
        <Button
          onClick={function () {
            setSlow(false)
          }}
        >
          Gotta go fast!
        </Button>
      )}
      {!slow && (
        <>
          <Button
            onClick={function () {
              setSlow(true)
            }}
          >
            Chili dogs
          </Button>
        </>
      )}
    </div>
  )
}

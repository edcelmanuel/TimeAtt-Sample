import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import "react-calendar-heatmap/dist/styles.css"

import { QueryClient, QueryClientProvider } from "react-query"

import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

import { ToastContainer, toast } from "react-toastify"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }))
  const { width, height } = useWindowSize()

  const [confettiVisible, setConfettiVisible] = useState(false)

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {confettiVisible && (
          <div className="z-[99999]">
            <Confetti
              width={width}
              height={height}
              drawShape={(ctx) => {
                ctx.beginPath()
                for (let i = 0; i < 22; i++) {
                  const angle = 0.35 * i
                  const x = (0.2 + 1.5 * angle) * Math.cos(angle)
                  const y = (0.2 + 1.5 * angle) * Math.sin(angle)
                  ctx.lineTo(x, y)
                }
                ctx.stroke()
                ctx.closePath()
              }}
            />
          </div>
        )}

        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </div>
  )
}

export default MyApp

import React from 'react'
import CatAPI from './CatAPI'
import {QueryClient, QueryClientProvider,
} from 'react-query'


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function CatMain() {
  return (
    <QueryClientProvider client={queryClient}>
    <CatAPI />
    </QueryClientProvider>
  )
}

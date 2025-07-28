import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {StoreProvider} from "./app/providers/store/ui/StoreProvider.tsx";
import {App} from "./app/App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreProvider>
          <App />
      </StoreProvider>
  </StrictMode>,
)

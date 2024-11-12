import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CustomerList from './components/CustomerList.jsx'
import TrainingList from './components/TrainingList.jsx'
import { createHashRouter, RouterProvider  } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [                       
      {
        path: "Customer",
        element: <CustomerList />,
      },
      {
        path: "Training",
        element: <TrainingList />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)






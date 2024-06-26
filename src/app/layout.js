
import '../styles/globals.css';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AppContextProvider from '@/Context/AppContext';
import Provider from '@/components/Provider';
import { Suspense } from 'react';


export const metadata = {
  title: "Order and Get the Food Delivered",
  description: "Order Good From Local Restaurant and Support Community Business"
}

const RootLayout = ({children}) => {

  

  return (
    <html lang="en">
        <body>
          
          <Provider>
            <AppContextProvider>  
              <div className="App">
                <Suspense>
                  <Navbar />              
                  <main className="app-main">
                      {children}
                  </main>
                </Suspense>
                <Footer />         
              </div>
            </AppContextProvider> 
          </Provider>  
          
        </body>
    </html>
  )
}

export default RootLayout

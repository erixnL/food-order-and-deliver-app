
import '../styles/globals.css';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import Provider from '@/components/Provider';


export const metadata = {
  title: "Order and Get the Food Delivered",
  description: "Order Good From Local Restaurant and Support Community Business"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
          
            <Provider>  
              <div className="App flex">
                  <Navbar />
                  <main className="app">
                      {children}
                  </main>
                  <Footer />
              </div>
            </Provider>  
            
        </body>
        
    </html>
  )
}

export default RootLayout

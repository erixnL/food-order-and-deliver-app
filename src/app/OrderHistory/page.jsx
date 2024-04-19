import React, { useContext } from 'react'
import "./OrderHistory.css"
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const OrderHistory = () => {
  const {order_list} = useContext(AppContext);
  const hasOrders = order_list.length > 0;

  return (
    <div className='order-history flex'>
      <div className="back"><Link to="/">&lt; Back to Home Page</Link></div>
      <h2>Your Orders</h2>
      { hasOrders
      ? (  
        <div className="order-list-container flex">
          {order_list.map((item, index)=>{
            return(
              <div className="order-container flex" key={item._id}>
                <div className="description-container flex">
                  <div>{item.restaurantName}</div>
                  <div>{item.dateAndTime}</div>
                  <div>{item.deliveryAddress}</div>
                </div>
                {item.status === "Order completed" 
                ? <div className="button-container flex">
                    <Link href={item._id}>
                      <div className="button-one">View Receipt</div>
                    </Link>
                    <div className="button-one">Reorder</div>
                  </div>
                : <div className="button-container flex">
                    <Link to="/orderstatus"><div className="track-order">Track the progress</div></Link>
                    <div className="confirm-order">Confirm Order Completion</div>
                  </div>    
                }
              </div>
            )
          })

          }
        </div>
      )
      : (  
        <div className="no-order flex">
          <div className='grey-box'></div>
          <div>OPPS! No orders yet!</div>
          <Link href={'/'}><button className='btn'>Start shopping</button></Link>
        </div>
      )
      }
    </div>
  )
}

export default OrderHistory
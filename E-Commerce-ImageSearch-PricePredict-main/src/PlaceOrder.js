import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import CheckoutProduct from './CheckoutProduct';

import {  useHistory } from 'react-router'; 
import { orderListAction_details} from './Reducers/actions/orderActions';

import './PlaceOrder.css' ;

function PlaceOrder() {
    let summ=0;
    let shipping_price=0;
    let tax_price=0;
    let total_price=0;
    let useEId;

    let history = useHistory()

    const dispatch = useDispatch()

    const cartList = useSelector(state => state.cartList)
    const {basketItems}=cartList

    const orderList = useSelector(state => state.orderList)
    const {order,success,error}=orderList

    // console.log("succes value ",success);
    // const redirect=`/`
    // if(success)
    // console.log("SUCCESS VAL:-",success);
    // else
    // console.log("SUCCESS VAL:-",success);

    
    useEffect(() => {
        //when getting request, userinfo becomes true as  userLoginRequest is called.
        //length==0 becomes when 1st time login pg is visited
        //invalid details is received when details don't match
        //if user is logged in  direct to home page
        if( success)
        {
            console.log("B4 CLICK",order);
            history.push(`/placeorder/${order.id}`)
        }
    }, [history,basketItems,order,success])
    
    let orderItems=cartList.basketItems;
    let shippingAddress=cartList.shippingAddr;
    let paymentMethod=cartList.paymentMethod;
    // let userSeller=cartList.
 //    itemPrice=summ
 
   
 console.log( "PlaceOrdDER.JS ",orderItems,
    shippingAddress,
    paymentMethod);
  
    
    const submit_form=()=>
    {
        console.log("PRICE IS ",tax_price, shipping_price, total_price);
        let taxPrice=tax_price;
        let shippingPrice=shipping_price;
        let totalPrice=total_price;

    // if(success)
    // {
    //     console.log("B4 CLICK",order);
    //     // history.push(`/placeorder/${order.id}`)
    // }
        dispatch(orderListAction_details(
            {
               orderItems,
               shippingAddress,
               paymentMethod,
            //    itemPrice:summ,
               taxPrice,
               shippingPrice,
               totalPrice,
            }
        ))


    // if(success)
    //     {
    //         console.log("A4 CLICK",order);
    //         history.push(`/placeorder/${order.id}`)
    //     }
       
        
    }

    return (
        <div className="placeorder">
            
            <Link to="/">
                {/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/> */}
                <img className="logo" src="https://www.logodesign.net/logo/peace-bird-in-water-drop-3572ld.png"/>

            </Link>

            <div className="place_order">
                {/* <form> */}
                <h1 className="heading">Order Summary</h1>
                <br />
                
                {/* {error}
                {loading && <h2>Loading</h2>} */}

                <h2>Shipping address:</h2>
                    {cartList.shippingAddr.address},
                    {cartList.shippingAddr.city} {' '},
                    {cartList.shippingAddr.postalCode},{' '} 
                    {cartList.shippingAddr.country}
                <br/><br/>
                
                <h2>Payment Method:</h2>
                Method : {cartList.paymentMethod}
                <br/><br/>

                <h2>Order Items:</h2>
                {basketItems.length===0?
                   <div>
                     <h2>Your cart is empty</h2>
                     <Link to="/">Go back</Link>
                   </div>
                     :
                  <div>
                      {basketItems.map((item) => (
                        //   <Link to={``}></Link>
                        <div>
                            
                            <img src={item.imageURL} className="placeOrder_img_class"/>  
                            <p className="item_info_placeorder">
                            <Link to={`/product/${item.idname}`} style={{ textDecoration: 'none', color : 'black' }}>
                                {item.name}
                            </Link>  
                            <br />
                            {item.qty} x {item.price} = ₹ {item.qty * item.price}
                            </p>

                      
                        
                         {console.log("Sum",summ+=item.price*item.qty) }
                         {/* {console.log("Upar",summ+=item.price*item.qty) } */}

                        </div>
                      ))}
                  </div>}
                
                <br/>

                {console.log("ship price",shipping_price= summ<500 ? 500:0)}
                {console.log("Tax price",tax_price= summ*0.1)}
                {console.log("Total price",total_price= summ+shipping_price+tax_price)}
                
                  
                  <h2>Payment Details:</h2>
                  Item Cost :- ₹ {summ}<br/>
                  Shipping :- ₹ {shipping_price}<br/>
                  Tax :- ₹ {tax_price}<br/>
                  Total Cost:- ₹ {total_price}<br/><br/>
                
                <br />
                <button className="placeorder_submit" onClick={submit_form} >Place Order</button>
               
                {/* </form> */}
            </div>

        </div>
    )
}

export default PlaceOrder

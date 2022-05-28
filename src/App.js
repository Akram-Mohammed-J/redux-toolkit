import CartContainer from "./components/CartContainer";
import NavBar from "./components/NavBar";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { calculateTotals,getCartItems } from "./redux/features/cart/cartSlice";
import { Modal } from "./components/Modal";

function App() {
  const {cartItems,isLoading} = useSelector((state)=>state.cart)
  const { isOpen } = useSelector((state)=>state.modal)
  const dispatch =useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems,dispatch])
  useEffect(()=>{
    dispatch(getCartItems('AKRAM'))
  },[dispatch])
if(isLoading){
  return(
    <div className='loading'>
    <h1>Loading...</h1>
  </div>
  )
}

  return (
  <>
   {isOpen && <Modal/>}
    <NavBar/>
    <CartContainer/>
  </>
  )
}
export default App;

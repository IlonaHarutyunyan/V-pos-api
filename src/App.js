import './App.css';
import paymentRegisterOrder from './v-pos-call';


function App() {

  const generateOrderNumber =() => {
    var date = new Date();
    var year = date.getFullYear().toString().slice(-2);
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    var second = date.getSeconds().toString();
    var milliseconds = date.getMilliseconds().toString();
    var orderNumber = `${year}${month}${day}${hour}${minute}${second}${milliseconds}`;
    return orderNumber;
  }
  const orderNumber = generateOrderNumber();

  const handleClick = async () => {
    try {
        const returnUrl = await paymentRegisterOrder("10", orderNumber, "test test", "0000000", "test@gmail.com");
        if(returnUrl !== null && returnUrl !== undefined){
          window.location.href = returnUrl; // Redirect the window
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
  return (
    <div className="App">
      <button onClick={() => handleClick()}>
        Call Api
      </button>
    </div>
  );
}

export default App;

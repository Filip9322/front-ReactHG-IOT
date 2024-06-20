
const CheckStateValue = props => {
  
  const {stateValue} = props;
  var color, text;

  if (stateValue == 0){
    color = 'green';
    text = '정상';
  } else {
    color = 'red';
    switch(stateValue){
      case 1: {
        text = '이상';
        break;
      }
      case 88: {
        text = '통신에러';
        break;
      }
      case 98: {
        text = '보고중단'
        break;
      } 
      default: { //  TODO: Check '이상' code: 99 ?
        text = '이상';
        break;
      }
    }
  }

  return (
    <span style={{color: color}}>{text}</span>
  );
}

export { CheckStateValue };
// RabbitMQ
const amqp = require('amqplib/callback_api');

//import * as amqp from 'amqplib'

const RabbitMQServer = () =>{
  // AMQP Connection
  amqp.connect(decodeURI('amqp://http://49.254.109.69:15672'),(error0, connection) => {
    
    if(error0) throw error0; 
    
    //Create Channel
    connection.createChannel((error1, channel) =>{
      if(error1) {throw error1;}
      
      // Declare Queue , not created yet
      const queue   = 'react-app';
      const message = 'Hello RabbitMQ';
  
      channel.assertQueue(queue, { durable: false });
  
      channel.sendToQueue(queue, Buffer.from(message));
  
      console.log(' [x] Sent %s:', message);
    });
  
    // Close Connetion
    setTimeout(()=> {
      connection.close();
      process.exit(0);
    }, 500);
  });
}

export {RabbitMQServer}
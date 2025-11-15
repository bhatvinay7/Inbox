import {assigntagChannel} from 'rabbitmq';

export function receiveMessage(queueName:string){
  try{
    await assigntagChannel.consume(
    queueName,
  async (message) => {
    const message= message.content.toString();
  },
  {noAck: true},
);
  }
  catch(error:any){
    console.log(error.message);
  }

}

export default receiveMessage;


import { errorJSONResponse, formatJSONResponse } from '@libs/api-gateway';
import axios from 'axios';

const fibonacci = async (event) => {

  let inputVal=event.pathParameters.num;
  let resFactorial,facVal,fibVal,responseBody;
  if(inputVal>=1 && inputVal<=150)
  {

      let base_url ='https://' + event['headers']['Host'] + '/' + event['requestContext']['stage'];
      resFactorial=await axios.get(`${base_url}/factorial/${inputVal}`)
      .then(res=>resFactorial=res.data)
      .catch(err=>resFactorial=err.response.data);
    
      //console.log(resFactorial);
    
      facVal=resFactorial.factorial;

        let x=0;
        let y=1;
        let z=0;
        if(inputVal==1)
        {
            z=0;
        }
        else if(inputVal==2)
        {
            z=1;
        }
        else
        {
            for(let i=0;i<inputVal-2;i++)
            {
                z=x+y;
                x=y;
                y=z;
            }
        }
        
      fibVal=z;
      responseBody={"inputval": inputVal,"factorial": facVal,"fibonacci":fibVal};
      return formatJSONResponse(responseBody);
 }
  else{
    fibVal="Error";
    responseBody={"inputval": inputVal,"factorial": "Error","fibonacci":fibVal,"Message":"Value Should Be Less Than 150"};
    return errorJSONResponse(responseBody);
  }

};

export const main = fibonacci;

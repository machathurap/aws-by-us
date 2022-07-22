import { errorJSONResponse, formatJSONResponse } from '@libs/api-gateway';

const factorial = async (event) => {
  
  let inputVal=event.pathParameters.num;
  let responseBody;
  if(inputVal>=1 && inputVal<=100)
  {
    const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
    const FactorialOfVal=factorial(inputVal);
    responseBody={"inputval": inputVal,"factorial": FactorialOfVal};
    return formatJSONResponse(responseBody);
  }
  else
  {
    responseBody={"inputval": inputVal,"factorial": "Error","Message":"Input Value Should Be less than 100"};
    return errorJSONResponse(responseBody);
  }
};

export const main = factorial;

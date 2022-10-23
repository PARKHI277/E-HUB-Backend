const date = function date(eventDate) {
  let date=new Date();
  let year=date.getFullYear()
  let month=date.getMonth()+1;
  let currDate=date.getDate();
  let validDate=eventDate.toString().slice(-2);
  let eventMonth=eventDate.toString().slice(5,7);
  let eventYear=eventDate.toString().slice(0,4);
  console.log("You are in validate date services");
  if (year>eventYear)
  {
    return false;}
  else{
  if(month>eventMonth)
 { 
  return false;}
  else if(month==eventMonth)
  {
    if(currDate>validDate)
  {return false;}
  else
  {
    return true;}}
  else
{
    return true;

}}
  
  }
  
 
module.exports = date;
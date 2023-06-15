import { GET_BY_ID, GET_BY_ZIP } from "../../utils/mutations";
import Template from "./Template.jsx"
import { useState } from "react";
import { useMutation,useQuery } from "@apollo/client";


 export default function DoggyDash (){
  const [zipString, setZipString] = useState("")
  const [breedString, setBreedString] = useState("")
  const [cardSelectedIndex, isCardSelectedIndex]= useState('-1');
  const [dogCardData, setDogCardData] = useState(null)
  const [DogsByZip, {error:errorZip, data:dataZip}] = useMutation(GET_BY_ZIP);

  // const [DogsById, {error:errorId, data:dataId}] = useMutation(GET_BY_ID);
  const handleZipSearch = (event)=>{
    const {name, value}= event.target;
    setZipString(value)
  };
  const handleBreedSearch = (event)=>{
    const {name, value}= event.target;
    setBreedString(value)
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const searchData = {
      zipCode: zipString,
      breed: breedString
    }
    try {
      const {data} = await DogsByZip({
        variables: {...searchData},
      });
      setDogCardData(data)
      console.log(data)
    }catch(e) {
      console.error(e)
    }
  }



  return (
   <form action="submit">
    <h2> SEARCH ME</h2>
    <label htmlFor="dog-search"></label>
    <input type="text" onChange={(handleZipSearch)} value = {zipString} />
    <label htmlFor="breed"></label>
    <input type="text" onChange={handleBreedSearch} value = {breedString} />
    <button type = "submit" onClick={handleSearchSubmit}></button>
   </form>
  )
}
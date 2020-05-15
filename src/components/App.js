/*eslint-disable no-unused-vars */

import React,{useState,useEffect} from 'react'
import moment from 'moment'
import ListForm from './ListForm'
import ListItem from './ListItem'
//TODO create app component create singleItem component wire them and done

const App = () => {

 const [list,setList] = useState([])

 useEffect(() => {
   try{
    const listData = localStorage.getItem('todoList')
    const data = JSON.parse(listData)
    
    if(data) {
      setList(data)
    }
   }catch(e) {}
 },[])

 useEffect(() => {
   const json = JSON.stringify(list)
   localStorage.setItem('todoList',json)
 },[list])
 
 const onFormSubmit = (e) => {
   e.preventDefault()
   setList(list.concat(e.target.search.value.trim()))
   e.target.search.value = ''
 }
 
 const remove = (todo) => {
   const newList = list.filter((i) => i!== todo)
   setList(newList)
 }

 const removeAll = () => {
   setList([])
 }
 return (
   <div className="main">
      <h2 className="remove-all" onClick={removeAll}>&#x0233D;</h2>
      <h2 className="current-day">{moment().format('l')}</h2>
      <ListForm className="list-form" onSubmit={onFormSubmit} />
      {list.length === 0 && <p className="red-alert">Please add a Todo...</p>}
      {list.map((soloItem) => (<ListItem className="list-item" key={soloItem} todo={soloItem} remove={remove} />))}
   </div>
 )

}

export default App
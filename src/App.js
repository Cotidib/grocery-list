import List from './List';
import Alert from './Alert';
import React, { useState, useEffect } from 'react';

const getLocalStorate = () => {
  let list = localStorage.getItem('list');
  if(list) //exists
  {
    return JSON.parse(localStorage.getItem('list'));
  }
  else {
    return [];
  }
}

function App() {
  const [alert, setAlert] = useState({show:false,msg:'',type:''});
  const [editMode, setEditMode] = useState(false);
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState(getLocalStorate());
  const [editItemId, setEditItemId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(itemName === '') { //same as !productName
      //alert
      showAlert(true,'please enter value','danger');
    }
    else if(itemName && editMode) { //same as productName !== '' && editMode == true
      //edit (substitute)
      let newEditedList = list.map((item)=>{
        if(item.id === editItemId){
          return {...item,title:itemName}
        }
        return item
      })
      setList(newEditedList);
      setEditItemId(null);
      setItemName('');
      setEditMode(false);
      showAlert(true,'item edited','success');
    }
    else {
      //alert
      showAlert(true,'item added','success');
      //add
      let newItem = {id: new Date().getTime().toString(),title:itemName}
      setList([...list,newItem]);
      setItemName('');
    }
  }

  const showAlert = (show = false , msg = '' , type = '') => {
    setAlert({show:show, msg:msg, type:type});
  } 

  const clearList = () => {
    showAlert(true,'empty list','danger');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'item removed', 'danger');
    let newList = list.filter((item)=> item.id !== id);
    setList(newList);
  }

  const editItem = (id) => {
    let getItem = list.find((item)=>item.id === id);
    setEditMode(true);
    setEditItemId(id);
    setItemName(getItem.title);
  }

  //local storage:
  useEffect( () => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <div>
          <h3>grocery bud</h3>
          <div className='line'/>
        </div>
        <div className='form-control'>
          <input type='text' value={itemName} onChange={(e)=>setItemName(e.target.value)} placeholder='e.g. cookies'/>
          <button className='btn-submit' type='submit'>{editMode? 'edit':'add'}</button>
        </div>
      </form>
      {
        list.length > 0 && (
        <div className='content-container'>
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button className='btn-clear' onClick={clearList}>clear</button>
        </div>
        )
      }
      
    </main>
  );
}

export default App;

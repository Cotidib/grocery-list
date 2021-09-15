import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

function List({items, removeItem, editItem}) {
    return (
        <section className='item-list'>
            {
                items.map((item)=>{
                    return <article className='item' key={item.id}>
                        <p>{item.title}</p>
                        <div className='btn-container'>
                            <button onClick={()=> editItem(item.id)} className='btn edit'><FaPencilAlt/></button>
                            <button onClick={() => removeItem(item.id)} className='btn trash'><FaTrash/></button>
                        </div>
                    </article>
                })
            }
        </section>
    )
}

export default List

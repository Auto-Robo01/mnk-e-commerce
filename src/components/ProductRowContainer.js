import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProductRow from './ProductRow';
import './ProductRowContainer.css';

const ProductRowContainer = ({rows, handleOnDragEnd, addData}) => {
    console.log('here are the rows', rows)



  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable-rows">
        {(provided) => (
          <div className="product-row-container" {...provided.droppableProps} ref={provided.innerRef}>
            {rows.map(({ id, content, variants }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ProductRow dragHandleProps={provided.dragHandleProps} index={index} content={content} id = {id} addData = {addData} variants = {variants}/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProductRowContainer;

import React, { useState } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'


const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  //console.log(colorToEdit);
  const [newColor, setNewColor] = useState(initialColor);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const newColors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return res.data;
          }
          return color;
        });
        updateColors(newColors);
      })
      .catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/colors/`, newColor)
      .then(res => {
        updateColors(res.data);
      })
      .catch(error => console.log(error));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        const newColors = colors.filter(c => c.id !== color.id);
        updateColors(newColors);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='colors-wrap'>
      <p>Colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color}>
            <span>
              <span className='delete' onClick={() => deleteColor(color)}>
                x
              </span>{' '}
              <span onClick={() => editColor(color)}>{color.color}</span>
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <hr/>
      {editing && (
        <form className="colorsEdt" onSubmit={saveEdit}>
          <legend>Edit Color</legend>
          <label>
            Color Name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button onClick={saveEdit} type='submit'>
              Save
            </button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
      {!editing && (
        <form className="colorsEdt" onSubmit={addColor}>
          <legend>Add New Color</legend>
          <label>
            Color Name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className='button-row'>
            <button onClick={addColor} type='submit'>
              Add
            </button>
          </div>
        </form>
      )}
      <div className='spacer' />
      
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;

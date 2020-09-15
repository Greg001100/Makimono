import { baseUrl } from '../config';

export const createNote = (owner_id, notebook_id, title, content) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/note/new`, {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner_id,
          notebook_id,
          title,
          content,
          shortcut: false
        }),
      });

      if (response.ok) {
        return response.json();
      } else {
        return response.json();
      }
}

export const updateNote = (note_id, title, notebook_id, content, shortcut) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/note/update`, {
        method: "put",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note_id,
          title,
          notebook_id,
          content,
          shortcut,
        }),
      });

      if (response.ok) {
        return response.json();
      } else {
        return response.json();
      }
}

export const getNote = (noteId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/note/${noteId}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const note = await response.json();
      return note;
    }
  };

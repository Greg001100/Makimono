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

export const updateNote = (note_id, title, notebook_id, content) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/note/update`, {
        method: "put",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note_id,
          title,
          notebook_id,
          content,
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

export const getList = (notebookId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/${notebookId}/notes`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const list = await response.json();
      return list;
    }
  };

  export const newNotebook = (user_id, title) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/notebook/new`, {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          title,
          shortcut: false
        }),
      });

      if (response.ok) {
        return response.json();
      } else {
        return response.json();
      }
}

  export const getNotebooks = (userId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/${userId}/notebooks`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const list = await response.json();
      return list;
    }
  };

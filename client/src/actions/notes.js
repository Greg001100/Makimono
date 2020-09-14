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

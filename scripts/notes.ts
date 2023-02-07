export type Note = {
  id: string;
  title: string;
  body: string;
  color: string;
};

export function createNewNote(newTitle: string, newBody: string, newColor: string) {
  const newNote: Note = {
    id: createNoteId(),
    title: newTitle,
    body: newBody,
    color: newColor,
  };
  return newNote;
}

export function createNoteId(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return (
    "note-" +
    date.getDate() +
    "-" +
    month +
    "-" +
    date.getFullYear() +
    "-" +
    date.getHours() +
    "-" +
    date.getMinutes() +
    "-" +
    date.getSeconds() +
    "-" +
    date.getMilliseconds()
  );
}

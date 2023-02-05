export function calculateDaysLeft(dueDate: Date): number {
  const today = new Date();
  const daysLeft = Math.floor(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysLeft + 1;
}

export function stringToDate(dateString: string): Date {
  const dateArray = dateString.split("-");
  const day = Number(dateArray[3].split("T")[0]);
  const month = Number(dateArray[1]) - 1;
  const year = Number(dateArray[0]);
  const date: Date = new Date(year, month, day);
  return date;
}

export function dateToString(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function timeToString(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (minutes < 10) return `${hours}:0${minutes}`;
  return `${hours}:${minutes}`;
}

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  timeRelevant: boolean;
  relevance: number;
};

export function createTaskId(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return (
    "task-" +
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

export function createNewTask(
  newTitle: string,
  newDescription: string,
  newDueDate: Date,
  timeRelevant: boolean,
  newRelevance: number
) {
  const newTask: Task = {
    id: createTaskId(),
    title: newTitle,
    description: newDescription,
    dueDate: newDueDate,
    timeRelevant: timeRelevant,
    relevance: newRelevance,
  };
  return newTask;
}

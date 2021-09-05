import axios from "axios";

export const api = axios.create({
  baseURL: "https://nestjs-task-organizer.herokuapp.com",
});

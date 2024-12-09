import { API_URL } from "@env"
import { axiosInst } from "../api/axiosSetUp"

export const getEventById = async (eventId: string) => {
  try {
    const event = await axiosInst.get(`${API_URL}/events/${eventId}`);
    return event.data;
  }
  catch (e) {
    alert("На жаль, не можемо отримати дані про цю подію");
  }
}
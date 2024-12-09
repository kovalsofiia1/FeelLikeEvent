import { axiosInst } from "../api/axiosSetUp"

export const getEventById = async (eventId: string) => {
  try {
    const event = await axiosInst.get(`/events/${eventId}`);
    return event.data;
  }
  catch (e) {
    alert("На жаль, не можемо отримати дані про цю подію");
  }
}

export const saveEvent = async (eventId: string, isSaved: boolean) => {
  try {
    if (isSaved) {
      await axiosInst.delete(`/bookmark/${eventId}`);
    }
    else {
      await axiosInst.post(`/bookmark/${eventId}`, {});
    }

    return !isSaved;

  } catch (error) {
    if (isSaved) {
      alert("Помилка при спробі видалити подію зі збережених!");
    }
    else {
      alert("Помилка при спробі зберегти подію!");
    }

  }
}

export const bookEvent = async (eventId: string, isBooked: boolean) => {
  try {
    if (isBooked) {
      await axiosInst.delete(`/event/${eventId}/book`);
    }
    else {
      await axiosInst.post(`/event/${eventId}/book`, {});
    }

  } catch (error) {
    if (isBooked) {
      alert("Помилка при спробі видалити пронювання даної події!");
    }
    else {
      alert("Помилка при спробі забронювати подію!");
    }

  }
}

export const likeEvent = async (eventId: string, isLiked: boolean) => {
  try {
    if (isLiked) {
      await axiosInst.delete(`/like/${eventId}`);
    }
    else {
      await axiosInst.post(`/like/${eventId}`, {});
    }

  } catch (error) {
    if (isLiked) {
      alert("Помилка при спробі забрати лайк з даної події!");
    }
    else {
      alert("Помилка при спробі вподобати подію!");
    }

  }
}

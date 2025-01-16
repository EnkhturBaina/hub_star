import { api } from '../api.service';

const newFeedback = (payload: any) => {
  return api.post('/feedback', payload);
};
export const FeedbackService = {
  newFeedback,
};

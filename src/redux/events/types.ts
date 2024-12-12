export type EventStatus = "CREATED" | "VERIFIED" | "DECLINED";

export type AudienceType =
  | 'KIDS'
  | 'TEENS'
  | 'ADULTS'
  | 'SENIORS'
  | 'PROFESSIONALS'
  | 'STUDENTS'
  | 'FAMILIES'
  | 'CORPORATES'
  | 'COMMUNITY'
  | 'GENERAL';

export type EventType =
  | 'CONCERT'
  | 'LECTURE'
  | 'WEBINAR'
  | 'WORKSHOP'
  | 'SEMINAR'
  | 'MEETUP'
  | 'EXHIBITION'
  | 'CONFERENCE'
  | 'FESTIVAL'
  | 'PARTY'
  | 'GALA'
  | 'SPORTS'
  | 'CHARITY';

export interface Event {
  _id: string;
  name: string; // Name of the event
  description: string; // Description of the event
  startDate: string; // ISO date string for the start date
  endDate: string; // ISO date string for the end date
  location?: {
    country: string;
    city: string;
    address: string;
    place: string
  } | string; // Location of the event
  images?: string[]; // Optional array of image URLs
  totalSeats: number; // Total number of available seats
  availableSeats: number;
  price: number; // Price of the event
  customFields?: Record<string, any>; // Optional flexible custom fields
  tags?: string[]; // Optional array of ObjectId strings
  isSaved?: boolean;
  isLiked?: boolean;
  booking?: {
    bookingId: string;
    tickets: number;
  } | null;
  eventStatus: EventStatus;
  isOnline?: string;
  eventType?: EventType;
  targetAudience: AudienceType;
  createdBy: {
    _id: string;
    name: string;
    avatarURL?: string;
  }
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarURL?: string;
}

export interface EventComment {
  _id: string;
  userId: User;
  eventId: string;
  text: string;
  date: string;
}

export interface Tag {
  _id: string;
  name: string;
}
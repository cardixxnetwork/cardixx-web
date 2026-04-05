/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AcceptContactRequestResponse = {
  __typename?: 'AcceptContactRequestResponse';
  chatRoom: ChatRoom;
  contactRequest: ContactRequest;
};

export type AddTagToWalletCardInput = {
  /** Label of the tag */
  label: Scalars['String']['input'];
  /** ID of the wallet card to add the tag to */
  walletCardId: Scalars['String']['input'];
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type AdminAuthResponse = {
  __typename?: 'AdminAuthResponse';
  admin: Admin;
  token: Scalars['String']['output'];
};

export type AdminLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Type of analytics event */
export type AnalyticsEventType =
  | 'ANALYTICS_CLICKED'
  | 'ANALYTICS_VIEWED'
  | 'CARD_CREATED'
  | 'CARD_CREATION_STARTED'
  | 'CARD_DESIGN_TAB_VIEWED'
  | 'CARD_DISPLAY_TAB_VIEWED'
  | 'CARD_INFO_TAB_VIEWED'
  | 'CARD_LINK_CLICKED'
  | 'CARD_SAVED_TO_WALLET'
  | 'CARD_SHARE_SCREEN_VIEWED'
  | 'CARD_TEMPLATE_SELECTED'
  | 'CARD_UPDATED'
  | 'CARD_VIEWED'
  | 'CHECK_IN_COMPLETED'
  | 'CHECK_IN_CTA_CLICKED'
  | 'CHECK_IN_UPDATED'
  | 'CONVERSATION_OPENED'
  | 'CREATE_NEW_CARD_CLICKED'
  | 'DASHBOARD_VIEWED'
  | 'EDIT_CARD_CLICKED'
  | 'EXCHANGE_DETECTED'
  | 'EXTERNAL_CARD_VIEWED'
  | 'LOGIN'
  | 'MESSAGE_SENT'
  | 'NATIVE_SHARE_OPENED'
  | 'NETWORKING_SCREEN_VIEWED'
  | 'NETWORKING_TAB_CLICKED'
  | 'PURCHASE'
  | 'SHARE_CARD_COMPLETED'
  | 'SIGN_IN_ATTEMPTED'
  | 'SIGN_IN_SCREEN_VIEWED'
  | 'SIGN_UP'
  | 'WALLET_CARD_OPENED'
  | 'WALLET_SCREEN_VIEWED'
  | 'WALLET_TAB_CLICKED';

/** Time period for analytics data */
export type AnalyticsPeriod =
  | 'LAST_6_MONTHS'
  | 'THIS_MONTH'
  | 'THIS_WEEK';

/** Summary analytics metrics with change percentages */
export type AnalyticsSummary = {
  __typename?: 'AnalyticsSummary';
  /** Number of card exchanges */
  exchanges: Scalars['Int']['output'];
  /** Change percentage for exchanges */
  exchangesChange: Scalars['Float']['output'];
  /** Total link clicks on cards */
  linkClicks: Scalars['Int']['output'];
  /** Change percentage for link clicks */
  linkClicksChange: Scalars['Float']['output'];
  /** New connections made */
  newConnections: Scalars['Int']['output'];
  /** Change percentage for new connections */
  newConnectionsChange: Scalars['Float']['output'];
  /** Views from shared links */
  shareViews: Scalars['Int']['output'];
  /** Change percentage for share views */
  shareViewsChange: Scalars['Float']['output'];
  /** Total card views */
  totalViews: Scalars['Int']['output'];
  /** Change percentage compared to previous period */
  totalViewsChange: Scalars['Float']['output'];
  /** Unique viewers count */
  uniqueViewers: Scalars['Int']['output'];
  /** Change percentage for unique viewers */
  uniqueViewersChange: Scalars['Float']['output'];
};

export type AppleAuthInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  identityToken: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  providerId: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  isNewUser: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type Card = {
  __typename?: 'Card';
  /** Company description */
  about?: Maybe<Scalars['String']['output']>;
  appleMusic?: Maybe<Scalars['String']['output']>;
  /** Pre-rendered back face image URL */
  backImageUrl?: Maybe<Scalars['String']['output']>;
  behance?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  bookings?: Maybe<Scalars['String']['output']>;
  calendly?: Maybe<Scalars['String']['output']>;
  companyAddress?: Maybe<Scalars['String']['output']>;
  companyEmail?: Maybe<Scalars['String']['output']>;
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyPhone?: Maybe<Scalars['String']['output']>;
  companySize?: Maybe<Scalars['String']['output']>;
  companyWebsite?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Custom style values from Design tab */
  customStyles: Scalars['JSON']['output'];
  department?: Maybe<Scalars['String']['output']>;
  discord?: Maybe<Scalars['String']['output']>;
  /** Display settings for field visibility */
  displaySettings: Scalars['JSON']['output'];
  dribbble?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  /** Array of uploaded files: [{name, url, size, type}] */
  fileUpload?: Maybe<Scalars['JSON']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  /** Pre-rendered front face image URL */
  frontImageUrl?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  /** Professional tagline/headline */
  headline?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  /** Whether the card is private */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  line?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  /** Optimistic locking version number */
  lockVersion: Scalars['Float']['output'];
  maidenName?: Maybe<Scalars['String']['output']>;
  meet?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  /** User-editable card name */
  name: Scalars['String']['output'];
  patreon?: Maybe<Scalars['String']['output']>;
  personalWebsite?: Maybe<Scalars['String']['output']>;
  pinterest?: Maybe<Scalars['String']['output']>;
  /** Nickname */
  preferredName?: Maybe<Scalars['String']['output']>;
  /** Dr., Mr., Ms., etc. */
  prefix?: Maybe<Scalars['String']['output']>;
  profilePhoto?: Maybe<Scalars['String']['output']>;
  pronouns?: Maybe<Scalars['String']['output']>;
  signal?: Maybe<Scalars['String']['output']>;
  snapchat?: Maybe<Scalars['String']['output']>;
  soundcloud?: Maybe<Scalars['String']['output']>;
  specialties?: Maybe<Scalars['String']['output']>;
  spotify?: Maybe<Scalars['String']['output']>;
  /** Jr., III, PhD, etc. */
  suffix?: Maybe<Scalars['String']['output']>;
  teams?: Maybe<Scalars['String']['output']>;
  telegram?: Maybe<Scalars['String']['output']>;
  template?: Maybe<CardTemplate>;
  /** If set, this is a company card (display company info from template) */
  templateId?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<CardTheme>;
  /** Theme ID for visual styling (null for scanned cards) */
  themeId?: Maybe<Scalars['String']['output']>;
  threads?: Maybe<Scalars['String']['output']>;
  tiktok?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  /** Comma-separated video URLs */
  videoLink?: Maybe<Scalars['String']['output']>;
  webex?: Maybe<Scalars['String']['output']>;
  wechat?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
  x?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
  zoom?: Maybe<Scalars['String']['output']>;
};

/** Complete analytics data for a user or card */
export type CardAnalytics = {
  __typename?: 'CardAnalytics';
  /** Link clicks breakdown by type */
  linkClicksByType: Array<LinkClicksByType>;
  /** Monthly view trends */
  monthlyViews: Array<MonthlyViewData>;
  /** Summary metrics */
  summary: AnalyticsSummary;
  /** Viewer industry distribution */
  viewerIndustryDistribution: Array<IndustryDistribution>;
  /** Viewer engagement insights */
  viewerInsights: ViewerInsights;
  /** Views breakdown by location */
  viewsByLocation: Array<LocationData>;
};

/** Lightweight card image status for polling */
export type CardImageStatus = {
  __typename?: 'CardImageStatus';
  backImageUrl?: Maybe<Scalars['String']['output']>;
  frontImageUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type CardTemplate = {
  __typename?: 'CardTemplate';
  companyAddress?: Maybe<Scalars['String']['output']>;
  companyEmail?: Maybe<Scalars['String']['output']>;
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyPhone?: Maybe<Scalars['String']['output']>;
  companyWebsite?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  departmentAssignments?: Maybe<Array<DepartmentCardTemplate>>;
  id: Scalars['ID']['output'];
  orgId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CardTheme = {
  __typename?: 'CardTheme';
  author?: Maybe<Scalars['String']['output']>;
  /** Back side HTML template with placeholders */
  backHtml?: Maybe<Scalars['String']['output']>;
  /** Pre-rendered back face preview image URL */
  backPreviewUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Default display settings for new cards: { fieldName: { side, required, display } } */
  defaultDisplaySettings: Scalars['JSON']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Display name (e.g., "Classic Green") */
  displayName: Scalars['String']['output'];
  /** Front side HTML template with placeholders */
  frontHtml: Scalars['String']['output'];
  /** Pre-rendered front face preview image URL */
  frontPreviewUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Whether this is the default theme for new cards */
  isDefault: Scalars['Boolean']['output'];
  /** Whether this theme requires a premium subscription */
  isPremium: Scalars['Boolean']['output'];
  /** Optimistic locking version number */
  lockVersion: Scalars['Float']['output'];
  /** Unique identifier slug (e.g., "classic-green") */
  name: Scalars['String']['output'];
  /** Style schema defining customizable design options */
  styleSchema: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['String']['output'];
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  archivedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  members?: Maybe<Array<ChatRoomMember>>;
  name?: Maybe<Scalars['String']['output']>;
  type: ChatRoomType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChatRoomMember = {
  __typename?: 'ChatRoomMember';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isMuted: Scalars['Boolean']['output'];
  lastReadAt?: Maybe<Scalars['DateTime']['output']>;
  roomId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

/** Type of chat room */
export type ChatRoomType =
  | 'DIRECT'
  | 'GROUP';

export type CheckIn = {
  __typename?: 'CheckIn';
  /** Optional bio for this check-in */
  bio?: Maybe<Scalars['String']['output']>;
  card: Card;
  /** Card/profile used for this check-in */
  cardId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** Duration in minutes */
  duration: Scalars['Int']['output'];
  /** When the check-in expires */
  expiresAt: Scalars['DateTime']['output'];
  hub?: Maybe<Hub>;
  /** Hub ID (null if checked-in at custom location) */
  hubId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** What the user is looking for */
  intents: Array<NetworkingIntent>;
  /** Whether the check-in is currently active */
  isActive: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

/** A user currently checked in at a hub */
export type CheckedInUser = {
  __typename?: 'CheckedInUser';
  bio?: Maybe<Scalars['String']['output']>;
  /** The card/profile the user is using for networking */
  card: Card;
  checkIn: CheckIn;
  /** Human-readable time since check-in (e.g., "5 min ago") */
  checkedInAgo: Scalars['String']['output'];
  /** Status of contact request with this user (null if no request) */
  contactStatus?: Maybe<ContactStatus>;
  /** Distance from the querying user's hub in kilometers */
  distance?: Maybe<Scalars['Float']['output']>;
  /** What the user is looking for */
  intents: Array<NetworkingIntent>;
};

export type CompanyDetailsInput = {
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  /** Company logo to upload (optional) */
  companyLogoUpload?: InputMaybe<ImageUploadInput>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyPhone?: InputMaybe<Scalars['String']['input']>;
  companyWebsite?: InputMaybe<Scalars['String']['input']>;
};

export type CompleteOnboardingInput = {
  companyDetails?: InputMaybe<CompanyDetailsInput>;
  personalDetails: PersonalDetailsInput;
};

export type ContactRequest = {
  __typename?: 'ContactRequest';
  createdAt: Scalars['DateTime']['output'];
  /** Distance from the receiver in km */
  distance?: Maybe<Scalars['Float']['output']>;
  fromUser: User;
  /** The sender's bio from their active check-in */
  fromUserBio?: Maybe<Scalars['String']['output']>;
  /** The sender's card/profile from their active check-in */
  fromUserCard?: Maybe<Card>;
  fromUserId: Scalars['String']['output'];
  /** The sender's networking intents from their active check-in */
  fromUserIntents?: Maybe<Array<NetworkingIntent>>;
  id: Scalars['ID']['output'];
  status?: Maybe<Scalars['String']['output']>;
  /** Time since the request was sent, e.g. "35 mins ago" */
  timeAgo?: Maybe<Scalars['String']['output']>;
  toUser: User;
  toUserId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Status of a contact request */
export type ContactStatus =
  | 'ACCEPTED'
  | 'PENDING'
  | 'REJECTED';

/** A conversation (chat room) with another user */
export type Conversation = {
  __typename?: 'Conversation';
  /** When the conversation was archived */
  archivedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The most recent message in this conversation */
  lastMessage?: Maybe<Message>;
  /** The other user in this conversation (for DIRECT rooms) */
  otherUser: User;
  /** The most recent card the other user checked in with */
  otherUserCard?: Maybe<Card>;
  /** Chat room ID */
  roomId: Scalars['ID']['output'];
  type: ChatRoomType;
  /** Number of unread messages */
  unreadCount: Scalars['Int']['output'];
};

export type CreateCardInput = {
  /** Company description */
  about?: InputMaybe<Scalars['String']['input']>;
  appleMusic?: InputMaybe<Scalars['String']['input']>;
  /** GCS URL for back card image (scanned cards only - for themed cards, this is generated by CardImageService) */
  backImageUrl?: InputMaybe<Scalars['String']['input']>;
  behance?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  bookings?: InputMaybe<Scalars['String']['input']>;
  calendly?: InputMaybe<Scalars['String']['input']>;
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  companyEmail?: InputMaybe<Scalars['String']['input']>;
  companyLogo?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyPhone?: InputMaybe<Scalars['String']['input']>;
  companySize?: InputMaybe<Scalars['String']['input']>;
  companyWebsite?: InputMaybe<Scalars['String']['input']>;
  /** Custom style values from Design tab */
  customStyles?: InputMaybe<Scalars['JSON']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  discord?: InputMaybe<Scalars['String']['input']>;
  /** Display settings for field visibility */
  displaySettings?: InputMaybe<Scalars['JSON']['input']>;
  dribbble?: InputMaybe<Scalars['String']['input']>;
  facebook?: InputMaybe<Scalars['String']['input']>;
  /** Array of uploaded files: [{name, url, size, type}] */
  fileUpload?: InputMaybe<Scalars['JSON']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** GCS URL for front card image (scanned cards only - for themed cards, this is generated by CardImageService) */
  frontImageUrl?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  /** Professional tagline/headline */
  headline?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  /** Whether the card is private */
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  line?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  maidenName?: InputMaybe<Scalars['String']['input']>;
  meet?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  /** User-editable card name */
  name: Scalars['String']['input'];
  patreon?: InputMaybe<Scalars['String']['input']>;
  personalWebsite?: InputMaybe<Scalars['String']['input']>;
  pinterest?: InputMaybe<Scalars['String']['input']>;
  /** Nickname */
  preferredName?: InputMaybe<Scalars['String']['input']>;
  /** Dr., Mr., Ms., etc. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  profilePhoto?: InputMaybe<Scalars['String']['input']>;
  pronouns?: InputMaybe<Scalars['String']['input']>;
  signal?: InputMaybe<Scalars['String']['input']>;
  snapchat?: InputMaybe<Scalars['String']['input']>;
  soundcloud?: InputMaybe<Scalars['String']['input']>;
  specialties?: InputMaybe<Scalars['String']['input']>;
  spotify?: InputMaybe<Scalars['String']['input']>;
  /** Jr., III, PhD, etc. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  teams?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  /** Theme ID - defaults to default theme if not provided */
  themeId?: InputMaybe<Scalars['String']['input']>;
  threads?: InputMaybe<Scalars['String']['input']>;
  tiktok?: InputMaybe<Scalars['String']['input']>;
  /** Comma-separated video URLs */
  videoLink?: InputMaybe<Scalars['String']['input']>;
  webex?: InputMaybe<Scalars['String']['input']>;
  wechat?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
  zoom?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCheckInInput = {
  /** Address of the device location. Overridden by hub address when hubId is provided. */
  address: Scalars['String']['input'];
  /** Optional bio for this check-in */
  bio?: InputMaybe<Scalars['String']['input']>;
  /** ID of the card/profile to use for networking */
  cardId: Scalars['String']['input'];
  /** Duration in minutes (e.g., 30, 60, 120, 240) */
  duration: Scalars['Int']['input'];
  /** ID of the hub to check into (optional - can check-in at custom location instead) */
  hubId?: InputMaybe<Scalars['String']['input']>;
  /** What you are looking for */
  intents: Array<NetworkingIntent>;
  /** Latitude of the device. Overridden by hub latitude when hubId is provided. */
  latitude: Scalars['Float']['input'];
  /** Longitude of the device. Overridden by hub longitude when hubId is provided. */
  longitude: Scalars['Float']['input'];
};

export type CreateHubApplicationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  /** Google Places API ID */
  googlePlaceId: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  phoneNumber: Scalars['String']['input'];
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  venueName: Scalars['String']['input'];
  /** Venue signage photo URL (uploaded to GCS) */
  venueSignagePhoto: Scalars['String']['input'];
  venueType?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateHubInput = {
  /** Full address of the place */
  address: Scalars['String']['input'];
  /** Hub description */
  description: Scalars['String']['input'];
  /** Google Places API ID for deduplication */
  googlePlaceId: Scalars['String']['input'];
  /** Hub image URL */
  image: Scalars['String']['input'];
  /** Latitude coordinate */
  latitude: Scalars['Float']['input'];
  /** Longitude coordinate */
  longitude: Scalars['Float']['input'];
  /** Name of the place */
  name: Scalars['String']['input'];
  /** Place type from Google Places API (e.g. "Business Cafe") */
  primaryType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNoteInput = {
  /** Content of the note */
  content: Scalars['String']['input'];
  /** ID of the wallet card to add the note to */
  walletCardId: Scalars['String']['input'];
};

export type CreateThemeInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  backHtml?: InputMaybe<Scalars['String']['input']>;
  /** Default display settings: { fieldName: { side, required, display } } */
  defaultDisplaySettings?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Display name (e.g., "Classic Green") */
  displayName: Scalars['String']['input'];
  /** Front side HTML template with placeholders */
  frontHtml: Scalars['String']['input'];
  isActive?: Scalars['Boolean']['input'];
  isDefault?: Scalars['Boolean']['input'];
  isPremium?: Scalars['Boolean']['input'];
  /** Unique identifier slug (e.g., "classic-green") */
  name: Scalars['String']['input'];
  /** Style schema defining customizable design options */
  styleSchema: Scalars['JSON']['input'];
  version?: Scalars['String']['input'];
};

export type Department = {
  __typename?: 'Department';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  org?: Maybe<Organization>;
  orgId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DepartmentCardTemplate = {
  __typename?: 'DepartmentCardTemplate';
  cardTemplateId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  departmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type DepartmentMember = {
  __typename?: 'DepartmentMember';
  createdAt: Scalars['DateTime']['output'];
  department?: Maybe<Department>;
  departmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  userId: Scalars['String']['output'];
};

export type Device = {
  __typename?: 'Device';
  appVersion?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deviceId: Scalars['String']['output'];
  deviceName?: Maybe<Scalars['String']['output']>;
  expoPushToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastActiveAt: Scalars['DateTime']['output'];
  nativePushToken?: Maybe<Scalars['String']['output']>;
  platform: Platform;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

/** Application error codes for type-safe error handling */
export type ErrorCode =
  | 'ACTIVE_CHECKIN_EXISTS'
  | 'AUTHENTICATION_REQUIRED'
  | 'CARD_ALREADY_IN_WALLET'
  | 'CARD_LOCKED'
  | 'CARD_NOT_FOUND'
  | 'CARD_PERMISSION_DENIED'
  | 'CHAT_NOT_CONNECTED'
  | 'CHAT_NOT_MEMBER'
  | 'CHAT_ROOM_NOT_FOUND'
  | 'CHAT_SELF'
  | 'CHECKIN_NOT_FOUND'
  | 'COMPANY_CARD_READONLY'
  | 'CONFIG_MISSING'
  | 'CONFLICT'
  | 'CONTACT_REQUEST_ALREADY_RESPONDED'
  | 'CONTACT_REQUEST_ALREADY_SENT'
  | 'CONTACT_REQUEST_NOT_FOUND'
  | 'CONTACT_REQUEST_NOT_RECIPIENT'
  | 'CONTACT_REQUEST_SELF'
  | 'DEPARTMENT_NOT_FOUND'
  | 'EMAIL_ALREADY_EXISTS'
  | 'EMAIL_REQUIRED'
  | 'EXTERNAL_SERVICE_ERROR'
  | 'FILE_TOO_LARGE'
  | 'FORBIDDEN'
  | 'HUB_NOT_FOUND'
  | 'INSUFFICIENT_PLAN'
  | 'INSUFFICIENT_ROLE'
  | 'INTERNAL_ERROR'
  | 'INVALID_APPLE_TOKEN'
  | 'INVALID_CREDENTIALS'
  | 'INVALID_DATA_URL'
  | 'INVALID_GOOGLE_TOKEN'
  | 'INVALID_IMAGE_TYPE'
  | 'INVALID_INPUT'
  | 'INVALID_TOKEN'
  | 'INVALID_VERIFICATION_CODE'
  | 'LAST_CARD_DELETE'
  | 'NOT_DEPT_MEMBER'
  | 'NOT_FOUND'
  | 'NOT_ORG_MEMBER'
  | 'NO_DEFAULT_THEME'
  | 'OAUTH_NOT_CONFIGURED'
  | 'ORGANIZATION_NOT_FOUND'
  | 'ORGANIZATION_REQUIRED'
  | 'OWN_CARD'
  | 'PDF_GENERATION_FAILED'
  | 'PROVIDER_MISMATCH'
  | 'SERVICE_UNAVAILABLE'
  | 'STORAGE_NOT_CONFIGURED'
  | 'THEME_IN_USE'
  | 'THEME_NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'UPLOAD_FAILED'
  | 'USER_NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'VERIFICATION_CODE_EXPIRED'
  | 'WALLET_CARD_NOT_FOUND';

export type GenerateCardPdfInput = {
  /** The card ID to generate PDF for */
  cardId: Scalars['ID']['input'];
  /** Number of cards to print per page (defaults to max for paper size) */
  cardsPerPage?: InputMaybe<Scalars['Int']['input']>;
  /** Whether to print double-sided */
  doubleSided?: InputMaybe<Scalars['Boolean']['input']>;
  /** Paper size for the PDF */
  paperSize?: InputMaybe<PaperSize>;
  /** Which side(s) of the card to print */
  printSide?: InputMaybe<PrintSide>;
};

export type GenerateCardPdfOutput = {
  __typename?: 'GenerateCardPdfOutput';
  /** Suggested filename for the PDF */
  filename: Scalars['String']['output'];
  /** Base64-encoded PDF content */
  pdfBase64: Scalars['String']['output'];
};

export type GoogleAuthInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  idToken: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  providerId: Scalars['String']['input'];
};

export type Hub = {
  __typename?: 'Hub';
  /** Number of currently active check-ins at this hub */
  activeCheckInsCount?: Maybe<Scalars['Int']['output']>;
  address: Scalars['String']['output'];
  /** Number of check-ins at this hub over the last 24 hours */
  checkInsLast24Hours?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Hub description */
  description: Scalars['String']['output'];
  /** Distance from the search location in meters */
  distance?: Maybe<Scalars['Float']['output']>;
  /** Google Places API ID for deduplication */
  googlePlaceId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Hub image URL */
  image: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  /** Place type from Google Places API (e.g. "Business Cafe") */
  primaryType?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type HubApplication = {
  __typename?: 'HubApplication';
  address?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  /** Google Places API ID */
  googlePlaceId: Scalars['String']['output'];
  hubId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  phoneNumber: Scalars['String']['output'];
  rejectionReason?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  status: HubApplicationStatus;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  venueName: Scalars['String']['output'];
  /** Venue signage photo URL */
  venueSignagePhoto: Scalars['String']['output'];
  venueType?: Maybe<Scalars['String']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

/** Status of a hub application */
export type HubApplicationStatus =
  | 'APPROVED'
  | 'PENDING'
  | 'REJECTED';

export type ImageUploadInput = {
  /** Base64 encoded image data */
  base64: Scalars['String']['input'];
  /** File name with extension */
  filename: Scalars['String']['input'];
  /** MIME type (e.g., image/jpeg) */
  mimeType: Scalars['String']['input'];
};

/** Industry distribution of viewers */
export type IndustryDistribution = {
  __typename?: 'IndustryDistribution';
  /** Industry name */
  industry: Scalars['String']['output'];
  /** Percentage of viewers in this industry */
  percentage: Scalars['Float']['output'];
};

/** Link clicks by type breakdown */
export type LinkClicksByType = {
  __typename?: 'LinkClicksByType';
  /** Number of clicks for this link type */
  count: Scalars['Int']['output'];
  /** Link type (LinkedIn, Website, Instagram, etc.) */
  type: Scalars['String']['output'];
};

/** Views by location data */
export type LocationData = {
  __typename?: 'LocationData';
  /** Number of views from this location */
  count: Scalars['Int']['output'];
  /** Location name (city, region, country) */
  location: Scalars['String']['output'];
};

export type Member = {
  __typename?: 'Member';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  org?: Maybe<Organization>;
  orgId: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** When the message was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** Whether this message was deleted (computed from deletedAt !== null) */
  isDeleted: Scalars['Boolean']['output'];
  /** Whether this message was edited (computed from createdAt !== updatedAt) */
  isEdited: Scalars['Boolean']['output'];
  /** Whether this message was sent by the current user */
  isOwn: Scalars['Boolean']['output'];
  roomId: Scalars['String']['output'];
  sender?: Maybe<User>;
  senderId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Monthly view data point for charts */
export type MonthlyViewData = {
  __typename?: 'MonthlyViewData';
  /** Card name for multi-card charts */
  cardName: Scalars['String']['output'];
  /** Date string (e.g., "Mar 01") */
  date: Scalars['String']['output'];
  /** Number of views on this date */
  views: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept a contact request and create a chat room */
  acceptContactRequest: AcceptContactRequestResponse;
  /** Add a tag to a wallet card */
  addTagToWalletCard: WalletCardTag;
  /** Admin login */
  adminLogin: AdminAuthResponse;
  /** Authenticate with Apple (native mobile flow) */
  appleAuth: AuthResponse;
  /** Archive a chat room */
  archiveChat: ChatRoom;
  /** Complete user onboarding by updating profile and creating first card */
  completeOnboarding: OnboardingResult;
  /** Create a new card for the currently authenticated user */
  createCard: Card;
  /** Create a new card theme */
  createCardTheme: CardTheme;
  /** Check in to a networking hub */
  createCheckIn: CheckIn;
  /** Create a new hub */
  createHub: Hub;
  /** Create a new hub application */
  createHubApplication: HubApplication;
  /** Create a new note for a wallet card */
  createNote: Note;
  /** Delete a card (owner only) */
  deleteCard: Scalars['Boolean']['output'];
  /** Delete a card theme */
  deleteCardTheme: CardTheme;
  /** Delete a note */
  deleteNote: Scalars['Boolean']['output'];
  /** Deny a contact request */
  denyContactRequest: ContactRequest;
  /** End the current check-in */
  endCheckIn: CheckIn;
  /** Extend the current check-in */
  extendCheckIn: CheckIn;
  /** Generate a PDF for a card (owner only) */
  generateCardPdf: GenerateCardPdfOutput;
  /** Get or create a direct chat room with another user */
  getOrCreateDirectChat: ChatRoom;
  /** Authenticate with Google (native mobile flow) */
  googleAuth: AuthResponse;
  /** Mark all messages in a room as read */
  markRoomAsRead: Scalars['Boolean']['output'];
  registerDevice: Device;
  /** Remove a card from the current user wallet */
  removeFromWallet: Scalars['Boolean']['output'];
  /** Remove a tag from a wallet card */
  removeTagFromWalletCard: Scalars['Boolean']['output'];
  /** Save a card to the current user wallet */
  saveToWallet: WalletCard;
  /** Scan a business card image and extract contact information using AI */
  scanBusinessCard: ScannedCardData;
  /** Send verification code to email */
  sendCode: Scalars['String']['output'];
  /** Send a contact request to another user */
  sendContactRequest: ContactRequest;
  /** Send a message to a chat room */
  sendMessage: Message;
  /** Track a single analytics event */
  trackEvent: Scalars['Boolean']['output'];
  /** Track multiple analytics events in batch */
  trackEvents: Scalars['Boolean']['output'];
  unregisterDevice: Scalars['Boolean']['output'];
  /** Update an existing card (owner only) */
  updateCard: Card;
  /** Update an existing card theme */
  updateCardTheme: CardTheme;
  /** Update the current check-in */
  updateCheckIn: CheckIn;
  /** Update an existing note */
  updateNote: Note;
  /** Update the currently authenticated user profile */
  updateProfile: User;
  /** Upload an image and get back the GCS URL */
  uploadImage: UploadImageOutput;
  /** Verify code and login/register user */
  verifyCode: AuthResponse;
};


export type MutationAcceptContactRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationAddTagToWalletCardArgs = {
  input: AddTagToWalletCardInput;
};


export type MutationAdminLoginArgs = {
  input: AdminLoginInput;
};


export type MutationAppleAuthArgs = {
  input: AppleAuthInput;
};


export type MutationArchiveChatArgs = {
  roomId: Scalars['String']['input'];
};


export type MutationCompleteOnboardingArgs = {
  input: CompleteOnboardingInput;
};


export type MutationCreateCardArgs = {
  input: CreateCardInput;
};


export type MutationCreateCardThemeArgs = {
  input: CreateThemeInput;
};


export type MutationCreateCheckInArgs = {
  input: CreateCheckInInput;
};


export type MutationCreateHubArgs = {
  input: CreateHubInput;
};


export type MutationCreateHubApplicationArgs = {
  input: CreateHubApplicationInput;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationDeleteCardArgs = {
  cardId: Scalars['String']['input'];
};


export type MutationDeleteCardThemeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String']['input'];
};


export type MutationDenyContactRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationExtendCheckInArgs = {
  additionalMinutes: Scalars['Int']['input'];
};


export type MutationGenerateCardPdfArgs = {
  input: GenerateCardPdfInput;
};


export type MutationGetOrCreateDirectChatArgs = {
  otherUserId: Scalars['String']['input'];
};


export type MutationGoogleAuthArgs = {
  input: GoogleAuthInput;
};


export type MutationMarkRoomAsReadArgs = {
  roomId: Scalars['String']['input'];
};


export type MutationRegisterDeviceArgs = {
  input: RegisterDeviceInput;
};


export type MutationRemoveFromWalletArgs = {
  walletCardId: Scalars['String']['input'];
};


export type MutationRemoveTagFromWalletCardArgs = {
  tagId: Scalars['String']['input'];
};


export type MutationSaveToWalletArgs = {
  input: SaveToWalletInput;
};


export type MutationScanBusinessCardArgs = {
  input: ScanBusinessCardInput;
};


export type MutationSendCodeArgs = {
  input: SendCodeInput;
};


export type MutationSendContactRequestArgs = {
  toUserId: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationTrackEventArgs = {
  input: TrackEventInput;
};


export type MutationTrackEventsArgs = {
  inputs: Array<TrackEventInput>;
};


export type MutationUnregisterDeviceArgs = {
  deviceId: Scalars['String']['input'];
};


export type MutationUpdateCardArgs = {
  input: UpdateCardInput;
};


export type MutationUpdateCardThemeArgs = {
  input: UpdateThemeInput;
};


export type MutationUpdateCheckInArgs = {
  input: UpdateCheckInInput;
};


export type MutationUpdateNoteArgs = {
  input: UpdateNoteInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUploadImageArgs = {
  input: UploadImageInput;
};


export type MutationVerifyCodeArgs = {
  input: VerifyCodeInput;
};

/** What the user is looking for while networking */
export type NetworkingIntent =
  /** Looking for clients */
  | 'CLIENTS'
  /** Looking for a co-founder */
  | 'COFOUNDER'
  /** General Networking */
  | 'GENERAL'
  /** Hiring/Recruiting */
  | 'HIRING'
  /** Looking to Invest */
  | 'INVESTING'
  /** Open to job offers */
  | 'JOBS'
  /** Mentoring */
  | 'MENTORING'
  /** Pitching an idea */
  | 'PITCHING';

export type Note = {
  __typename?: 'Note';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  walletCardId: Scalars['String']['output'];
};

export type OnboardingResult = {
  __typename?: 'OnboardingResult';
  card: Card;
  user: User;
};

export type OnboardingStatus = {
  __typename?: 'OnboardingStatus';
  companyAddress?: Maybe<Scalars['String']['output']>;
  companyEmail?: Maybe<Scalars['String']['output']>;
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyPhone?: Maybe<Scalars['String']['output']>;
  companyWebsite?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  onboardingCompleted: Scalars['Boolean']['output'];
  picture?: Maybe<Scalars['String']['output']>;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxSeats: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  plan: PlanTier;
  updatedAt: Scalars['DateTime']['output'];
};

/** Paper size for PDF generation */
export type PaperSize =
  | 'A4'
  | 'LETTER';

export type PersonalDetailsInput = {
  companyEmail: Scalars['String']['input'];
  /** Existing profile photo URL (from OAuth) */
  existingProfilePhotoUrl?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  jobTitle: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  /** Profile photo to upload (optional) */
  profilePhotoUpload?: InputMaybe<ImageUploadInput>;
};

export type PlaceAutocompleteResult = {
  __typename?: 'PlaceAutocompleteResult';
  description: Scalars['String']['output'];
  mainText: Scalars['String']['output'];
  placeId: Scalars['String']['output'];
  secondaryText: Scalars['String']['output'];
};

export type PlaceDetails = {
  __typename?: 'PlaceDetails';
  address: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  editorialSummary?: Maybe<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  placeId: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  primaryType?: Maybe<Scalars['String']['output']>;
  types?: Maybe<Array<Scalars['String']['output']>>;
};

/** Organization plan tier */
export type PlanTier =
  | 'FREE'
  | 'HUB'
  | 'PLUS'
  | 'TEAM';

export type Platform =
  | 'ANDROID'
  | 'IOS'
  | 'WEB';

/** Which side(s) of the card to print */
export type PrintSide =
  | 'BACK'
  | 'BOTH'
  | 'FRONT';

export type Query = {
  __typename?: 'Query';
  /** Get current admin profile */
  adminMe: Admin;
  /** Get all card themes (including inactive) */
  allCardThemes: Array<CardTheme>;
  /** Get a card by ID (public for sharing) */
  card?: Maybe<Card>;
  /** Get image generation status for multiple cards (for polling) */
  cardImageStatus: Array<CardImageStatus>;
  /** Get a card theme by ID */
  cardTheme?: Maybe<CardTheme>;
  /** Get all active card themes */
  cardThemes: Array<CardTheme>;
  /** Get a chat room by ID */
  chatRoom: ChatRoom;
  /** Get users checked in at the same hub as the current user */
  checkedInUsers: Array<CheckedInUser>;
  /** Get the default card theme */
  defaultCardTheme?: Maybe<CardTheme>;
  /** Get all available error codes for client-side error handling */
  errorCodes: Array<ErrorCode>;
  /** Simple hello query */
  hello: Scalars['String']['output'];
  /** Search for hubs near a location */
  hubs: Array<Hub>;
  /** Get the timestamp of the last contact (message) with another user. Returns null if no chat exists. */
  lastContactWithUser?: Maybe<Scalars['DateTime']['output']>;
  /** Get the currently authenticated user profile */
  me: User;
  /** Get the current user's active check-in */
  myActiveCheckIn?: Maybe<CheckIn>;
  /** Get analytics data for the current user */
  myAnalytics: CardAnalytics;
  /** Get industry distribution for ViewersIndustrialDistributionCard chart */
  myAnalyticsIndustry: Array<IndustryDistribution>;
  /** Get viewer insights for ViewersInsightsCard chart */
  myAnalyticsInsights: ViewerInsights;
  /** Get link clicks by type for LinkClicksByTypeCard chart */
  myAnalyticsLinkClicks: Array<LinkClicksByType>;
  /** Get location data for ViewsByLocationCard chart */
  myAnalyticsLocation: Array<LocationData>;
  /** Get monthly view data for MonthlyViewSection chart */
  myAnalyticsMonthlyViews: Array<MonthlyViewData>;
  /** Get summary metrics for MetricsSection chart */
  myAnalyticsSummary: AnalyticsSummary;
  /** Get all cards for the currently authenticated user */
  myCards: Array<Card>;
  /** Get contact requests (received or sent) */
  myContactRequests: Array<ContactRequest>;
  /** Get list of chat conversations */
  myConversations: Array<Conversation>;
  /** Get all department memberships for the currently authenticated user */
  myDepartments: Array<DepartmentMember>;
  myDevices: Array<Device>;
  /** Get all hub applications for the current user */
  myHubApplications: Array<HubApplication>;
  /** Get all organization memberships for the currently authenticated user */
  myMemberships: Array<Member>;
  /** Get pending hub application for the current user */
  myPendingHubApplication?: Maybe<HubApplication>;
  /** Get all cards saved to the current user wallet */
  myWallet: Array<WalletCard>;
  /** Get check-ins nearby (across all hubs within radius) */
  nearbyCheckedIns: Array<CheckedInUser>;
  /** Get all notes for a wallet card */
  notesForWalletCard: Array<Note>;
  /** Get current user onboarding status and prefill data */
  onboardingStatus: OnboardingStatus;
  /** Search for places using autocomplete */
  placeAutocomplete: Array<PlaceAutocompleteResult>;
  /** Get details for a specific place by placeId */
  placeDetails?: Maybe<PlaceDetails>;
  /** Get a public card by ID (only returns cards with isPrivate === false) */
  publicCard?: Maybe<Card>;
  /** Get messages in a chat room */
  roomMessages: Array<Message>;
  /** Get all tags for a wallet card */
  tagsForWalletCard: Array<WalletCardTag>;
};


export type QueryCardArgs = {
  id: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCardImageStatusArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryCardThemeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChatRoomArgs = {
  roomId: Scalars['String']['input'];
};


export type QueryCheckedInUsersArgs = {
  intents?: InputMaybe<Array<NetworkingIntent>>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHubsArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLastContactWithUserArgs = {
  otherUserId: Scalars['String']['input'];
};


export type QueryMyAnalyticsArgs = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  period: AnalyticsPeriod;
};


export type QueryMyAnalyticsIndustryArgs = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  period: AnalyticsPeriod;
};


export type QueryMyAnalyticsInsightsArgs = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  period: AnalyticsPeriod;
};


export type QueryMyAnalyticsLinkClicksArgs = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  period: AnalyticsPeriod;
};


export type QueryMyAnalyticsLocationArgs = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  period: AnalyticsPeriod;
};


export type QueryMyAnalyticsMonthlyViewsArgs = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  period: AnalyticsPeriod;
};


export type QueryMyAnalyticsSummaryArgs = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  period: AnalyticsPeriod;
};


export type QueryMyContactRequestsArgs = {
  type?: Scalars['String']['input'];
};


export type QueryNearbyCheckedInsArgs = {
  intents?: InputMaybe<Array<NetworkingIntent>>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  radius?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNotesForWalletCardArgs = {
  walletCardId: Scalars['String']['input'];
};


export type QueryPlaceAutocompleteArgs = {
  query: Scalars['String']['input'];
  types?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPlaceDetailsArgs = {
  placeId: Scalars['String']['input'];
};


export type QueryPublicCardArgs = {
  id: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRoomMessagesArgs = {
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  roomId: Scalars['String']['input'];
};


export type QueryTagsForWalletCardArgs = {
  walletCardId: Scalars['String']['input'];
};

export type RegisterDeviceInput = {
  appVersion?: InputMaybe<Scalars['String']['input']>;
  deviceId: Scalars['String']['input'];
  deviceName?: InputMaybe<Scalars['String']['input']>;
  expoPushToken?: InputMaybe<Scalars['String']['input']>;
  nativePushToken?: InputMaybe<Scalars['String']['input']>;
  platform: Platform;
};

/** User role in an organization */
export type Role =
  | 'ADMIN'
  | 'MEMBER'
  | 'OWNER';

/** The method used to save the card to wallet */
export type SaveMethod =
  | 'NFC'
  | 'QR';

export type SaveToWalletInput = {
  /** ID of the card to save */
  cardId: Scalars['String']['input'];
  /** If true, backend should use IP-based geolocation (no GPS permission) */
  isIpBasedLocation?: InputMaybe<Scalars['Boolean']['input']>;
  /** GPS latitude of the user when saving */
  latitude?: InputMaybe<Scalars['Float']['input']>;
  /** GPS longitude of the user when saving */
  longitude?: InputMaybe<Scalars['Float']['input']>;
  /** Method used to save: qr or nfc */
  method: SaveMethod;
};

export type ScanBusinessCardInput = {
  /** GCS URL of the scanned back face image (optional) */
  backImageUrl?: InputMaybe<Scalars['String']['input']>;
  /** GCS URL of the scanned front face image */
  frontImageUrl: Scalars['String']['input'];
};

export type ScannedCardData = {
  __typename?: 'ScannedCardData';
  /** Company description */
  about?: Maybe<Scalars['String']['output']>;
  appleMusic?: Maybe<Scalars['String']['output']>;
  behance?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  bookings?: Maybe<Scalars['String']['output']>;
  calendly?: Maybe<Scalars['String']['output']>;
  companyAddress?: Maybe<Scalars['String']['output']>;
  companyEmail?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyPhone?: Maybe<Scalars['String']['output']>;
  companySize?: Maybe<Scalars['String']['output']>;
  companyWebsite?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  discord?: Maybe<Scalars['String']['output']>;
  dribbble?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  /** Professional tagline */
  headline?: Maybe<Scalars['String']['output']>;
  industry?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  line?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  maidenName?: Maybe<Scalars['String']['output']>;
  meet?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  patreon?: Maybe<Scalars['String']['output']>;
  personalWebsite?: Maybe<Scalars['String']['output']>;
  pinterest?: Maybe<Scalars['String']['output']>;
  /** Nickname */
  preferredName?: Maybe<Scalars['String']['output']>;
  /** Dr., Mr., Ms., etc. */
  prefix?: Maybe<Scalars['String']['output']>;
  pronouns?: Maybe<Scalars['String']['output']>;
  signal?: Maybe<Scalars['String']['output']>;
  snapchat?: Maybe<Scalars['String']['output']>;
  soundcloud?: Maybe<Scalars['String']['output']>;
  specialties?: Maybe<Scalars['String']['output']>;
  spotify?: Maybe<Scalars['String']['output']>;
  /** Jr., III, PhD, etc. */
  suffix?: Maybe<Scalars['String']['output']>;
  teams?: Maybe<Scalars['String']['output']>;
  telegram?: Maybe<Scalars['String']['output']>;
  threads?: Maybe<Scalars['String']['output']>;
  tiktok?: Maybe<Scalars['String']['output']>;
  webex?: Maybe<Scalars['String']['output']>;
  wechat?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
  x?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
  zoom?: Maybe<Scalars['String']['output']>;
};

export type SendCodeInput = {
  email: Scalars['String']['input'];
};

export type SendMessageInput = {
  /** Message content */
  content: Scalars['String']['input'];
  /** Chat room ID to send the message to */
  roomId: Scalars['String']['input'];
};

/** Input for tracking a single analytics event */
export type TrackEventInput = {
  /** Related card ID */
  cardId?: InputMaybe<Scalars['String']['input']>;
  /** Card owner ID (for view/click events) */
  cardOwnerId?: InputMaybe<Scalars['String']['input']>;
  /** Additional event properties */
  properties?: InputMaybe<Scalars['JSON']['input']>;
  /** Type of event to track */
  type: AnalyticsEventType;
};

export type UpdateCardInput = {
  /** Company description */
  about?: InputMaybe<Scalars['String']['input']>;
  appleMusic?: InputMaybe<Scalars['String']['input']>;
  behance?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  bookings?: InputMaybe<Scalars['String']['input']>;
  calendly?: InputMaybe<Scalars['String']['input']>;
  /** ID of the card to update */
  cardId: Scalars['String']['input'];
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  companyEmail?: InputMaybe<Scalars['String']['input']>;
  companyLogo?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyPhone?: InputMaybe<Scalars['String']['input']>;
  companySize?: InputMaybe<Scalars['String']['input']>;
  companyWebsite?: InputMaybe<Scalars['String']['input']>;
  /** Custom style values from Design tab */
  customStyles?: InputMaybe<Scalars['JSON']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  discord?: InputMaybe<Scalars['String']['input']>;
  /** Display settings for field visibility */
  displaySettings?: InputMaybe<Scalars['JSON']['input']>;
  dribbble?: InputMaybe<Scalars['String']['input']>;
  facebook?: InputMaybe<Scalars['String']['input']>;
  /** Array of uploaded files: [{name, url, size, type}] */
  fileUpload?: InputMaybe<Scalars['JSON']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  /** Professional tagline/headline */
  headline?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  /** Whether the card is private */
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  line?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  /** Expected version for optimistic locking */
  lockVersion?: InputMaybe<Scalars['Float']['input']>;
  maidenName?: InputMaybe<Scalars['String']['input']>;
  meet?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  /** User-editable card name */
  name?: InputMaybe<Scalars['String']['input']>;
  patreon?: InputMaybe<Scalars['String']['input']>;
  personalWebsite?: InputMaybe<Scalars['String']['input']>;
  pinterest?: InputMaybe<Scalars['String']['input']>;
  /** Nickname */
  preferredName?: InputMaybe<Scalars['String']['input']>;
  /** Dr., Mr., Ms., etc. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  profilePhoto?: InputMaybe<Scalars['String']['input']>;
  pronouns?: InputMaybe<Scalars['String']['input']>;
  signal?: InputMaybe<Scalars['String']['input']>;
  snapchat?: InputMaybe<Scalars['String']['input']>;
  soundcloud?: InputMaybe<Scalars['String']['input']>;
  specialties?: InputMaybe<Scalars['String']['input']>;
  spotify?: InputMaybe<Scalars['String']['input']>;
  /** Jr., III, PhD, etc. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  teams?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  /** Theme ID for visual styling */
  themeId?: InputMaybe<Scalars['String']['input']>;
  threads?: InputMaybe<Scalars['String']['input']>;
  tiktok?: InputMaybe<Scalars['String']['input']>;
  /** Comma-separated video URLs */
  videoLink?: InputMaybe<Scalars['String']['input']>;
  webex?: InputMaybe<Scalars['String']['input']>;
  wechat?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
  zoom?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCheckInInput = {
  /** Optional bio for this check-in */
  bio?: InputMaybe<Scalars['String']['input']>;
  /** ID of the card/profile to use for networking */
  cardId?: InputMaybe<Scalars['String']['input']>;
  /** Duration in minutes (e.g., 30, 60, 120, 240) */
  duration?: InputMaybe<Scalars['Int']['input']>;
  /** ID of the hub to check into (optional - can check-in at custom location instead) */
  hubId?: InputMaybe<Scalars['String']['input']>;
  /** What you are looking for */
  intents?: InputMaybe<Array<NetworkingIntent>>;
};

export type UpdateNoteInput = {
  /** New content of the note */
  content: Scalars['String']['input'];
  /** ID of the note to update */
  noteId: Scalars['String']['input'];
};

export type UpdateProfileInput = {
  companyAddress?: InputMaybe<Scalars['String']['input']>;
  companyEmail?: InputMaybe<Scalars['String']['input']>;
  /** Company logo to upload (optional) */
  companyLogoUpload?: InputMaybe<ImageUploadInput>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyPhone?: InputMaybe<Scalars['String']['input']>;
  companyWebsite?: InputMaybe<Scalars['String']['input']>;
  /** Existing company logo URL to keep */
  existingCompanyLogoUrl?: InputMaybe<Scalars['String']['input']>;
  /** Existing profile photo URL to keep */
  existingProfilePhotoUrl?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Profile photo to upload (optional) */
  profilePhotoUpload?: InputMaybe<ImageUploadInput>;
};

export type UpdateThemeInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  backHtml?: InputMaybe<Scalars['String']['input']>;
  /** Default display settings: { fieldName: { side, required, display } } */
  defaultDisplaySettings?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Display name (e.g., "Classic Green") */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Front side HTML template with placeholders */
  frontHtml?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  isPremium?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier slug (e.g., "classic-green") */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Style schema defining customizable design options */
  styleSchema?: InputMaybe<Scalars['JSON']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type UploadImageInput = {
  /** Base64 encoded image data (without data URL prefix) */
  base64: Scalars['String']['input'];
  /** Original filename */
  filename: Scalars['String']['input'];
  /** MIME type (e.g., image/jpeg) */
  mimeType: Scalars['String']['input'];
};

export type UploadImageOutput = {
  __typename?: 'UploadImageOutput';
  /** GCS URL of the uploaded image */
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  companyAddress?: Maybe<Scalars['String']['output']>;
  companyEmail?: Maybe<Scalars['String']['output']>;
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyPhone?: Maybe<Scalars['String']['output']>;
  companyWebsite?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  onboardingCompleted: Scalars['Boolean']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  providers: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type VerifyCodeInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

/** Viewer engagement insights */
export type ViewerInsights = {
  __typename?: 'ViewerInsights';
  /** Engagement rate percentage */
  engagementRate: Scalars['Float']['output'];
  /** Follow-up rate percentage */
  followUpRate: Scalars['Float']['output'];
};

export type WalletCard = {
  __typename?: 'WalletCard';
  /** Address where the card was saved */
  address?: Maybe<Scalars['String']['output']>;
  card: Card;
  cardId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** Set when the card was exchanged during Check-in AND other conditions... */
  exchangedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Hub where the card was saved (if applicable) */
  hub?: Maybe<Hub>;
  /** Hub ID if saved during hub check-in */
  hubId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** True if location was derived from IP address */
  isIpBasedLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Latitude where the card was saved */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** Longitude where the card was saved */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** Set when the card was saved via QR scan */
  savedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['String']['output'];
};

export type WalletCardTag = {
  __typename?: 'WalletCardTag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  walletCardId: Scalars['String']['output'];
};

export type CardCoreFragment = { __typename?: 'Card', id: string, userId: string, firstName?: string | null, lastName?: string | null, jobTitle?: string | null, profilePhoto?: string | null };

export type CardCompanyDetailsFragment = { __typename?: 'Card', companyName?: string | null, companyEmail?: string | null, companyPhone?: string | null, companyWebsite?: string | null, companyAddress?: string | null, companyLogo?: string | null, about?: string | null, industry?: string | null, specialties?: string | null, location?: string | null, companySize?: string | null };

export type CardFullFragment = { __typename?: 'Card', templateId?: string | null, themeId?: string | null, name: string, isPrivate?: boolean | null, middleName?: string | null, prefix?: string | null, suffix?: string | null, preferredName?: string | null, pronouns?: string | null, maidenName?: string | null, bio?: string | null, department?: string | null, headline?: string | null, personalWebsite?: string | null, discord?: string | null, wechat?: string | null, line?: string | null, signal?: string | null, linkedin?: string | null, instagram?: string | null, x?: string | null, facebook?: string | null, tiktok?: string | null, youtube?: string | null, github?: string | null, dribbble?: string | null, behance?: string | null, snapchat?: string | null, pinterest?: string | null, whatsapp?: string | null, telegram?: string | null, threads?: string | null, patreon?: string | null, spotify?: string | null, soundcloud?: string | null, appleMusic?: string | null, teams?: string | null, meet?: string | null, zoom?: string | null, webex?: string | null, calendly?: string | null, bookings?: string | null, videoLink?: string | null, fileUpload?: any | null, displaySettings: any, customStyles: any, frontImageUrl?: string | null, backImageUrl?: string | null, createdAt: any, updatedAt: any, id: string, userId: string, firstName?: string | null, lastName?: string | null, jobTitle?: string | null, profilePhoto?: string | null, companyName?: string | null, companyEmail?: string | null, companyPhone?: string | null, companyWebsite?: string | null, companyAddress?: string | null, companyLogo?: string | null, about?: string | null, industry?: string | null, specialties?: string | null, location?: string | null, companySize?: string | null, theme?: { __typename?: 'CardTheme', author?: string | null, version: string, frontHtml: string, backHtml?: string | null, styleSchema: any, defaultDisplaySettings: any, isActive: boolean, frontPreviewUrl?: string | null, backPreviewUrl?: string | null, createdAt: any, updatedAt: any, id: string, name: string, displayName: string, description?: string | null, isDefault: boolean, isPremium: boolean } | null };

export type CardThemeCoreFragment = { __typename?: 'CardTheme', id: string, name: string, displayName: string, description?: string | null, isDefault: boolean, isPremium: boolean, frontPreviewUrl?: string | null };

export type CardThemeFullFragment = { __typename?: 'CardTheme', author?: string | null, version: string, frontHtml: string, backHtml?: string | null, styleSchema: any, defaultDisplaySettings: any, isActive: boolean, frontPreviewUrl?: string | null, backPreviewUrl?: string | null, createdAt: any, updatedAt: any, id: string, name: string, displayName: string, description?: string | null, isDefault: boolean, isPremium: boolean };

export type PublicCardQueryVariables = Exact<{
  id: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
}>;


export type PublicCardQuery = { __typename?: 'Query', publicCard?: { __typename?: 'Card', templateId?: string | null, themeId?: string | null, name: string, isPrivate?: boolean | null, middleName?: string | null, prefix?: string | null, suffix?: string | null, preferredName?: string | null, pronouns?: string | null, maidenName?: string | null, bio?: string | null, department?: string | null, headline?: string | null, personalWebsite?: string | null, discord?: string | null, wechat?: string | null, line?: string | null, signal?: string | null, linkedin?: string | null, instagram?: string | null, x?: string | null, facebook?: string | null, tiktok?: string | null, youtube?: string | null, github?: string | null, dribbble?: string | null, behance?: string | null, snapchat?: string | null, pinterest?: string | null, whatsapp?: string | null, telegram?: string | null, threads?: string | null, patreon?: string | null, spotify?: string | null, soundcloud?: string | null, appleMusic?: string | null, teams?: string | null, meet?: string | null, zoom?: string | null, webex?: string | null, calendly?: string | null, bookings?: string | null, videoLink?: string | null, fileUpload?: any | null, displaySettings: any, customStyles: any, frontImageUrl?: string | null, backImageUrl?: string | null, createdAt: any, updatedAt: any, id: string, userId: string, firstName?: string | null, lastName?: string | null, jobTitle?: string | null, profilePhoto?: string | null, companyName?: string | null, companyEmail?: string | null, companyPhone?: string | null, companyWebsite?: string | null, companyAddress?: string | null, companyLogo?: string | null, about?: string | null, industry?: string | null, specialties?: string | null, location?: string | null, companySize?: string | null, theme?: { __typename?: 'CardTheme', author?: string | null, version: string, frontHtml: string, backHtml?: string | null, styleSchema: any, defaultDisplaySettings: any, isActive: boolean, frontPreviewUrl?: string | null, backPreviewUrl?: string | null, createdAt: any, updatedAt: any, id: string, name: string, displayName: string, description?: string | null, isDefault: boolean, isPremium: boolean } | null } | null };

export const CardCoreFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}}]} as unknown as DocumentNode<CardCoreFragment, unknown>;
export const CardCompanyDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCompanyDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"companyEmail"}},{"kind":"Field","name":{"kind":"Name","value":"companyPhone"}},{"kind":"Field","name":{"kind":"Name","value":"companyWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"}},{"kind":"Field","name":{"kind":"Name","value":"companyLogo"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"specialties"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"companySize"}}]}}]} as unknown as DocumentNode<CardCompanyDetailsFragment, unknown>;
export const CardThemeCoreFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardThemeCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"isPremium"}},{"kind":"Field","name":{"kind":"Name","value":"frontPreviewUrl"}}]}}]} as unknown as DocumentNode<CardThemeCoreFragment, unknown>;
export const CardThemeFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardThemeFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardThemeCore"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"frontHtml"}},{"kind":"Field","name":{"kind":"Name","value":"backHtml"}},{"kind":"Field","name":{"kind":"Name","value":"styleSchema"}},{"kind":"Field","name":{"kind":"Name","value":"defaultDisplaySettings"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"frontPreviewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"backPreviewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardThemeCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"isPremium"}},{"kind":"Field","name":{"kind":"Name","value":"frontPreviewUrl"}}]}}]} as unknown as DocumentNode<CardThemeFullFragment, unknown>;
export const CardFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCompanyDetails"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"themeId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"preferredName"}},{"kind":"Field","name":{"kind":"Name","value":"pronouns"}},{"kind":"Field","name":{"kind":"Name","value":"maidenName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"headline"}},{"kind":"Field","name":{"kind":"Name","value":"personalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"wechat"}},{"kind":"Field","name":{"kind":"Name","value":"line"}},{"kind":"Field","name":{"kind":"Name","value":"signal"}},{"kind":"Field","name":{"kind":"Name","value":"linkedin"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"tiktok"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"dribbble"}},{"kind":"Field","name":{"kind":"Name","value":"behance"}},{"kind":"Field","name":{"kind":"Name","value":"snapchat"}},{"kind":"Field","name":{"kind":"Name","value":"pinterest"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"threads"}},{"kind":"Field","name":{"kind":"Name","value":"patreon"}},{"kind":"Field","name":{"kind":"Name","value":"spotify"}},{"kind":"Field","name":{"kind":"Name","value":"soundcloud"}},{"kind":"Field","name":{"kind":"Name","value":"appleMusic"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}},{"kind":"Field","name":{"kind":"Name","value":"meet"}},{"kind":"Field","name":{"kind":"Name","value":"zoom"}},{"kind":"Field","name":{"kind":"Name","value":"webex"}},{"kind":"Field","name":{"kind":"Name","value":"calendly"}},{"kind":"Field","name":{"kind":"Name","value":"bookings"}},{"kind":"Field","name":{"kind":"Name","value":"videoLink"}},{"kind":"Field","name":{"kind":"Name","value":"fileUpload"}},{"kind":"Field","name":{"kind":"Name","value":"displaySettings"}},{"kind":"Field","name":{"kind":"Name","value":"customStyles"}},{"kind":"Field","name":{"kind":"Name","value":"frontImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"backImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardThemeFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardThemeCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"isPremium"}},{"kind":"Field","name":{"kind":"Name","value":"frontPreviewUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCompanyDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"companyEmail"}},{"kind":"Field","name":{"kind":"Name","value":"companyPhone"}},{"kind":"Field","name":{"kind":"Name","value":"companyWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"}},{"kind":"Field","name":{"kind":"Name","value":"companyLogo"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"specialties"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"companySize"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardThemeFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardThemeCore"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"frontHtml"}},{"kind":"Field","name":{"kind":"Name","value":"backHtml"}},{"kind":"Field","name":{"kind":"Name","value":"styleSchema"}},{"kind":"Field","name":{"kind":"Name","value":"defaultDisplaySettings"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"frontPreviewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"backPreviewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CardFullFragment, unknown>;
export const PublicCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCompanyDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"companyEmail"}},{"kind":"Field","name":{"kind":"Name","value":"companyPhone"}},{"kind":"Field","name":{"kind":"Name","value":"companyWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"companyAddress"}},{"kind":"Field","name":{"kind":"Name","value":"companyLogo"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"specialties"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"companySize"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardThemeCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"isPremium"}},{"kind":"Field","name":{"kind":"Name","value":"frontPreviewUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardThemeFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardThemeCore"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"frontHtml"}},{"kind":"Field","name":{"kind":"Name","value":"backHtml"}},{"kind":"Field","name":{"kind":"Name","value":"styleSchema"}},{"kind":"Field","name":{"kind":"Name","value":"defaultDisplaySettings"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"frontPreviewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"backPreviewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCompanyDetails"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"themeId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"preferredName"}},{"kind":"Field","name":{"kind":"Name","value":"pronouns"}},{"kind":"Field","name":{"kind":"Name","value":"maidenName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"headline"}},{"kind":"Field","name":{"kind":"Name","value":"personalWebsite"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"wechat"}},{"kind":"Field","name":{"kind":"Name","value":"line"}},{"kind":"Field","name":{"kind":"Name","value":"signal"}},{"kind":"Field","name":{"kind":"Name","value":"linkedin"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"tiktok"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"dribbble"}},{"kind":"Field","name":{"kind":"Name","value":"behance"}},{"kind":"Field","name":{"kind":"Name","value":"snapchat"}},{"kind":"Field","name":{"kind":"Name","value":"pinterest"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"threads"}},{"kind":"Field","name":{"kind":"Name","value":"patreon"}},{"kind":"Field","name":{"kind":"Name","value":"spotify"}},{"kind":"Field","name":{"kind":"Name","value":"soundcloud"}},{"kind":"Field","name":{"kind":"Name","value":"appleMusic"}},{"kind":"Field","name":{"kind":"Name","value":"teams"}},{"kind":"Field","name":{"kind":"Name","value":"meet"}},{"kind":"Field","name":{"kind":"Name","value":"zoom"}},{"kind":"Field","name":{"kind":"Name","value":"webex"}},{"kind":"Field","name":{"kind":"Name","value":"calendly"}},{"kind":"Field","name":{"kind":"Name","value":"bookings"}},{"kind":"Field","name":{"kind":"Name","value":"videoLink"}},{"kind":"Field","name":{"kind":"Name","value":"fileUpload"}},{"kind":"Field","name":{"kind":"Name","value":"displaySettings"}},{"kind":"Field","name":{"kind":"Name","value":"customStyles"}},{"kind":"Field","name":{"kind":"Name","value":"frontImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"backImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardThemeFull"}}]}}]}}]} as unknown as DocumentNode<PublicCardQuery, PublicCardQueryVariables>;
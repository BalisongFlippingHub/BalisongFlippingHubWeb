export interface Profile {
  /*All Profiles Data*/
  id: string | null;
  email: string | null;
  accountCreationDate: Date | null;
  lastLogin: Date | null;
  role: string | null;

  /*Profile Data specific for Users*/
  facebookLink?: string | null;
  instagramLink?: string | null;
  twitterLink?: string | null;
  youtubeLink?: string | null;
  redditLink?: string | null;
  discordLink?: string | null;
  personalEmailLink?: string | null;
  personalWebsiteLink?: string | null;

  profileImg?: string | null;
  bannerImg?: string | null;
  displayName?: string | null;
  identifierCode?: string | null;

  collectionId?: string | null;
}

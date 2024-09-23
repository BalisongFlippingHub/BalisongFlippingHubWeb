export interface Collection {
  id: string;
  userId: string;
  bannerImg: string | null;

  ownedKnives: Array<CollectionKnifeDTO> | null;
}

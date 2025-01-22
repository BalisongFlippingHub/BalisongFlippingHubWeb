import { CollectionKnife } from "./CollectionKnife";

export interface Collection {
  id: string;
  userId: string;
  bannerImg: string | null;

  collectedKnives: Array<CollectionKnife> | null;
}

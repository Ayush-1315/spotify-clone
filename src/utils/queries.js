import { gql } from "@apollo/client";

export const PLAYLIST = gql`
  query Query($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;

export const SEARCH = gql`
  query ExampleQuery($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      title
      photo
      url
      duration
      artist
    }
  }
`;

export const PLAYLISTS = gql`
query Query {
  getPlaylists {
    id
    title
  }
}
`;
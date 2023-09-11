import {useState, useEffect} from 'react';
import useAuth from './useAuth'
import SpotifyWebApi from "spotify-web-api-node"
import { Container, Form } from 'react-bootstrap'

const spotifyApi = new SpotifyWebApi({
    clientID: "d41293552cb84b3d8839d461cf491f65"
})
let isSearch = false;
export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() =>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
    
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
          )
        })
    
        return () => (cancel = true)
      }, [search, accessToken])
    return(
        <Container> 
            <Form> 
                <Form.Group>
                    <Form.Control type="search" placeholder="Search Here" 
                       value = {search} 
                        onChange={ e => setSearch(e.target.value)} />
                </Form.Group >
            </Form>
        </Container>
    ) 
}
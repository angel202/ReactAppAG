import {useState, useEffect} from 'react';
import useAuth from './useAuth'
import SpotifyWebApi from "spotify-web-api-node"
import { Container, Form } from 'react-bootstrap'

const spotifyApi = new SpotifyWebApi({
    clientID: "d41293552cb84b3d8839d461cf491f65"
})

export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    
    useEffect(() =>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    
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
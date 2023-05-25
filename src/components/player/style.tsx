import { styled } from "styled-components";

const PlayerContainer = styled.div`
    overflow: hidden;
    position: relative;
    
    & > .videoPlayer {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export { PlayerContainer }
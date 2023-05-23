import { styled } from "styled-components";

const PlayerContainer = styled.div`
    overflow: hidden;
    position: relative;
    
    & > .videoPlayer {
        width: 100%;
        height: 100%;
        object-fit: cover;

        &[name="youtube"]{
            width: 500px;
            height: 281.25px;

            &.ytp-chrome-top, &.ytp-show-cards-title{
                display: none;
            }
        }
    }
`

export { PlayerContainer }
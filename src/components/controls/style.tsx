import { styled } from "styled-components";

const ControlWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    
    & > div{
        display: none;
    }
    
    &[role="Paused"]{
        & > div{
            display: block;
        }
    }

    &:hover{
        & > div{
            display: block;
        }
    }
`

const ControlBackground = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #00000025;
`

const PlayPauseButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 3.5rem;
`

const ProgressBar = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(0deg, #2b2b2b, transparent);
    
    & > div{
        position: relative;
        width: 90%;
        margin: auto;
    }
    
    &:hover{
        .progressPath{ 
            &:hover{
                .hoveredDragedTime{
                    display: block;
                }
            }
        }
    }

    .progressPath, .progress{
        position: absolute;
        display: block;
        padding: 0.1rem 0;
        border-radius: 0.5rem;
        cursor: pointer;
    }
    
    .progressPath {
        width: 100%;
        background-color: #cfcfcf;
        
        &:hover{
            padding: .21rem 0;
            
            .progress{
                padding: .21rem 0;
            }

            .hoveredDragedTime{
                display: block;
            }

            .pointer{
                display: block;
            }
        }
    }

    .progress{
        background-color: red;
        position: absolute;
        top: 0;
    }

    .pointer{
        position: absolute;
        top: 50%;
        padding: 0.37rem;
        border-radius: 50%;
        border: none;
        outline: none;
        transform: translate(50%, -50%);
        display: none;
        right: 0;
        cursor: pointer;
    }

    .progressTime{
        display: flex;
        color: #d0d0d0;
        align-items: center;
        justify-content: flex-start;
        font-size: .835rem;

        & > span{
            margin: 0 .35rem;
        }
    }
    
    .hoveredDragedTime{
        color: white;
        position: absolute;
        background: #585858;
        padding: 0.15rem 0.5rem;
        font-size: .835rem;
        border-radius: 0.15rem;
        bottom: 0;
        transform: translate(-50%, -70%);
        display: none;

        & > p{
            margin: 0;
        }
    }
`

const BottomControlWrapper = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5.5rem auto 2.5rem 2.5rem 2.5rem;

    .fullScreenbuton{
        background-color: transparent;
        display: flex;
        padding: 0.25rem;
        font-size: 1.3rem;
        color: white;
        border: none;
        cursor: pointer;
        justify-self: flex-end;
    }
`

const ForwardBackwardButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    color: white;
    border-radius: 50%;
    font-size: 1.7rem;;
    border: none;
    cursor: pointer;
    width: 3rem;
    height: 3rem;

    &[name="back"]{
        left: 10%;
    }
    
    &[name="forward"]{
        right: 10%;
    }

    &:hover{
        background-color: #ffffff50;
    }
`

const PlayBackButton = styled.select`
    background-color: transparent;
    appearance: none;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
`

const VolumeButtonWrapper = styled.div`
    display: flex;
    justify-self: flex-start;
    
    &:hover{
        & label {
            width: 5rem;
        }
        
        & input{
            visibility: visible;
        }
    }
    
    & button{
        background-color: transparent;
        border: none;
        outline: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        display: flex;
    }

    & label{
        position: relative;
        width: 0;
        transition: .15s ease-in-out;
        
        & > .customRange{
            position: absolute;
            height: .25rem;
            width: 100%;
            background-color: white;
            border-radius: .25rem;
            overflow: hidden;
            top: 50%;
            transform: translateY(-50%);
            
            & > .volumeRange{
                height: 100%;
                background-color: red;
            }
        }
    }
    
    & input{
        left: 0;
        position: absolute;
        cursor: pointer;
        height: 0.25rem;
        width: 100%;
        visibility: hidden;
        transform: translateY(-50%);
        top: 50%;
        appearance: none;
        background-color: transparent;
        margin: 0;
        z-index: 10;

        &::-webkit-slider-thumb{
            appearance: none;
            width: .9rem;
            height: .9rem;
            background: #841a1a;
            border: 1px solid white;
            cursor: pointer;
            border-radius: 50%;
        }
    }
`

const PipToggleButton = styled.button`
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.3rem;
    color: white;
    cursor: pointer;
`

export {
    ControlWrapper,
    ControlBackground,
    PlayPauseButton,
    ProgressBar,
    BottomControlWrapper,
    ForwardBackwardButton,
    PlayBackButton,
    VolumeButtonWrapper,
    PipToggleButton
}
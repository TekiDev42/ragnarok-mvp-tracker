import {PropsWithChildren, CSSProperties} from "react";

export const DropsIcons = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
        </svg>
    )
}

export const BookmarkIcon = ({checked}: PropsWithChildren & {checked: boolean}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className={`size-6 ${checked ? "fill-yellow-500" : "fill-none"}`}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/>
        </svg>
    )
}

export const HeadstoneIcon = () => {
    return (
        <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2"
               transform="matrix(1.165 0 0 1.165 -5.868 -5.359)">
                <path d="m52.11 48.61-.67 7.39-3.86-3.7 2.54 3.7h4.38l2.79-6.1-3.91 6.1z"/>
                <path d="m19.77 48.62.67 7.39 3.87-3.69-2.55 3.69h-4.38l-2.79-6.1 3.92 6.1z"/>
            </g>
            <path
                d="m55.21 59.88h-38.42a1.164 1.164 0 0 1 -1.165-1.165v-27.39a20.38 20.38 0 0 1 40.75 0v27.39a1.165 1.165 0 0 1 -1.165 1.165z"
                fill="#9b9b9a"/>
            <path
                d="m36 10.95a20.37 20.37 0 0 0 -3.935.3893 20.4 20.4 0 0 1 16.44 19.99v28.55h6.706a1.165 1.165 0 0 0 1.165-1.165v-27.39a20.4 20.4 0 0 0 -20.38-20.38z"
                fill="#3f3f3f"/>
            <path
                d="m56.31 61.04h-3.787a1.167 1.167 0 0 1 -.9591-.5028l-2.971-4.301a1.165 1.165 0 0 1 1.763-1.505l2.759 2.635.5642-6.2a1.165 1.165 0 0 1 1.115-1.058 1.142 1.142 0 0 1 1.193.968l.9647 5.641 2.936-4.574a1.165 1.165 0 0 1 2.04 1.114l-3.254 7.103a1.165 1.165 0 0 1 -1.059.6802h-1.305z"
                fill="#5c9e31"/>
            <path
                d="m15.69 61.05h-1.305a1.165 1.165 0 0 1 -1.059-.6803l-3.253-7.103a1.165 1.165 0 0 1 2.04-1.114l2.936 4.576.9648-5.644a1.165 1.165 0 0 1 2.308.09098l.5643 6.2 2.758-2.634a1.165 1.165 0 0 1 1.763 1.504l-2.971 4.301a1.167 1.167 0 0 1 -.959.5028h-1.524a.036.036 0 0 0 -.01596 0z"
                fill="#5c9e31"/>
            <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33">
                <path d="m16.79 47.51v-16.19a19.21 19.21 0 0 1 19.21-19.21 19.21 19.21 0 0 1 19.21 19.21v16.19"/>
                <path d="m25.99 30.35h20.02"/>
                <path d="m25.99 35.57h20.02"/>
                <path d="m30.75 44.39h10.5"/>
            </g>
        </svg>
    )
}

export const StatsIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
    )
}

export const GraveIcon = ({style}: PropsWithChildren & {style: CSSProperties}) => {
    return (
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="black" strokeWidth="1"  strokeLinecap="round"  strokeLinejoin="round" style={style}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 21v-2a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v2h-14z" />
            <path d="M10 16v-5h-4v-4h4v-4h4v4h4v4h-4v5" />
        </svg>
    )
}

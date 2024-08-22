import { useRouteError } from "react-router-dom";

export default function ErrorHandler(){
    const error = useRouteError();
    console.error(error);

    return (
    <>
        <p>An error has occured.</p>
        <p>{error.statusText || error.message}</p>
    </>
    );
}
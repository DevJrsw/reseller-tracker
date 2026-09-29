import AuthForm from "../AuthForm";import {login} from "../actions";
export default function P({searchParams}:{searchParams:{error?:string}}){return <AuthForm mode="login" action={login} error={searchParams.error}/>}

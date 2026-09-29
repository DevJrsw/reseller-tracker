import AuthForm from "../AuthForm";import {signup} from "../actions";
export default function P({searchParams}:{searchParams:{error?:string}}){return <AuthForm mode="signup" action={signup} error={searchParams.error}/>}

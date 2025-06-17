import { useState } from 'preact/hooks';

export default function LogIn () {
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        if(password === '1234'){
            document.cookie = 'session=true;path=/;'
            globalThis.location.href ='/chars'
        }
    }

    return(
        <div class='loginContainer'>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <input type='text' placeholder='Username' required/>
                <input type='password' placeholder='Password' value={password} 
                    onInput={(e)=>{setPassword(e.currentTarget.value)}} 
                    onKeyDown={(e)=>{if(e.key==='Enter'){handleSubmit(e)}}} required/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
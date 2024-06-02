export const LoginPage = () => {
    
    return (
        <form className="m-auto p-2 flex flex-col items-center bg-slate-50 rounded">
            <h3>Login</h3>
            <div className="flex flex-col">
                <label htmlFor="emailInput">Email</label>
                <input type="email" placeholder="example@email.com" id="emailInput" className="p-1 rounded"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="passwordInput">Password</label>
                <input type="password" id="passwordInput" className="p-1 rounded"/>
            </div>
            <div>
                <input type="checkbox" className="mr-2"/>
                <label>Remember Me</label>
            </div>
            <button type="submit" className="hover:cursor-pointer p-2 bg-slate-500 rounded hover:bg-slate-300">Login</button>
        </form>
    )
}
import { Link, useNavigate } from 'react-router-dom';
const MainPage = () =>{
	//Объявление логина и логического выражений авторизации как пропов
	const user = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate()

	//Ф-ия по нажатию кнопки на выход или авторизацию
		const onButtonClick = async()=>{
			if(user) {
				const response = await fetch('http://localhost/logout', {
					method: "GET",
					headers: {
						'Authorization': 'Bearer ' + user.token
					}
				});
				const data = await response.json();
				if(data.body.success){
					localStorage.removeItem('user')
					navigate('/login')
				}else{
					window.alert('Login failed')
				}
			}else {
				navigate('/login')
			}
		}
	return(
		<div className='container'>
			<h1>Welcome!</h1>
			<div className="inputContainer">
				<input
				className='logButton'
				type='button'
				onClick={onButtonClick}
				value={user ? 'Log out': 'Log in'}/>
			</div>
			{user ? '': <div className="inputContainer">
				<Link to='registration'>Or register</Link>
			</div>}
			{user ? <p>Your email address is {user.email} and your token is {user.token}</p> : ''}
		</div>
	)
}
export default MainPage
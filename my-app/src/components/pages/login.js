import React, {useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
	//Объявление логина, пароля и их сообщений ошибок как состояний
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	
	const navigate = useNavigate()

	//Авторизация путём запроса к REST API и сохранением в локальное хранилище информации о пользователе
	const login = () => {
		fetch('http://localhost/authorization', {
			method: 'POST',
			body: JSON.stringify({email, password}),
		})
			.then((r) => r.json())
			.then((r) => {
				if(r.body.success){
					localStorage.setItem('user', JSON.stringify({"email":email,"token":r.body.token}))
					navigate('/disk')
				}else{
					window.alert(r.body.message)
				}
			})
	}
	//Валидация по нажатию кнопки и запуск ф-ии авторизации
	const onButtonClick = () => {
		const inputEmail = document.getElementById('email')
		const inputPassword = document.getElementById('password')
		setEmailError('')
		setPasswordError('')

		if('' === email){
			inputEmail.classList.add('errorInput')
			setEmailError('Please enter your email')
			return
		}
		if('' === password){
			inputPassword.classList.add('errorInput')
			setPasswordError('Please enter your password')
			return
		}
		if(password.length < 7){
			inputPassword.classList.add('errorInput')
			setPasswordError('The password must be 8 characters or longer')
			return
		}
		inputEmail.classList.remove('errorInput')
		inputPassword.classList.remove('errorInput')
		login()
	}
	

	return(
		<div className='container'>
			<h1>Login</h1>
			<div className="inputContainer">
				<div className="input">
					<input
						id='email'
						value={email}
						placeholder='Enter email'
						onChange={(ev) => setEmail(ev.target.value)}
					/>
					<label className='errorLabel'>{emailError}</label>
				</div>
				<div className="input">
					<input
						id='password'
						value={password}
						placeholder='Enter password'
						onChange={(ev) => setPassword(ev.target.value)}
					/>
					<label className='errorLabel'>{passwordError}</label>
				</div>
				<input type='button' onClick={onButtonClick} value='Log in'/>
				<p>Your first time? <Link className='link' to="/registration">Register</Link></p>
			</div>
		</div>
	)
}
export default Login
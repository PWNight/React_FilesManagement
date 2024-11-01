import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = (props) => {
	//Объявление логина, пароля и их сообщений ошибок как состояний
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('')
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	
	const navigate = useNavigate()

	//Регистрация путём запроса к REST API и сохранением в локальное хранилище информации о пользователе
	//TODO: переписать body и обновить условия
	const registration = () => {
		fetch('http://localhost/registration', {
			method: 'POST',
			body: JSON.stringify({email, password, firstName, lastName})
		})
			.then((r) => r.json())
			.then((r) => {
				if(r.body.success){
					setToken(r.body.token)
					props.setToken(r.body.token)
					localStorage.setItem('user', JSON.stringify({"email":email,"token":token}))
					navigate('/disk')
				}else{
					if(Array.isArray(r.body.message)){
						for(var i in r.body.message){
							alert(r.body.message[i])
						};
					}else{
						alert(r.body.message)
					}
				}
			})
	}
	//Валидация по нажатию кнопки и запуск ф-ии регистрации
	const onButtonClick = () => {
		setEmailError('')
		setFirstNameError('')
		setLastNameError('')
		setPasswordError('')

		if('' === email){
			setEmailError('Please enter your email')
			return
		}
		if('' === firstName){
			setFirstNameError('Please enter your first name')
			return
		}
		if('' === lastName){
			setLastNameError('Please enter your last name')
			return
		}
		if('' === password){
			setPasswordError('Please enter your password')
			return
		}
		if(password.length < 7){
			setPasswordError('The password must be 8 characters or longer')
			return
		}
		registration()
	}
	

	return(
		<div className='container'>
			<h1>Registration</h1>
			<div className="inputContainer">
				<div className="input">
					<input
						value={email}
						placeholder='Enter email'
						onChange={(ev) => setEmail(ev.target.value)}
					/>
					<label className='errorLabel'>{emailError}</label>
				</div>
				<div className="input">
					<input
						value={firstName}
						placeholder='First name'
						onChange={(ev) => setFirstName(ev.target.value)}
					/>
					<label className='errorLabel'>{firstNameError}</label>
				</div>
				<div className="input">
					<input
						value={lastName}
						placeholder='Last name'
						onChange={(ev) => setLastName(ev.target.value)}
					/>
					<label className='errorLabel'>{lastNameError}</label>
				</div>
				<div className="input">
					<input
						value={password}
						placeholder='Enter password'
						onChange={(ev) => setPassword(ev.target.value)}
					/>
					<label className='errorLabel'>{passwordError}</label>
				</div>
				<input type='button' onClick={onButtonClick} value='Register'/>
				<p>Not for the first time? <Link className='link' to="/login">Log in</Link></p>

			</div>
		</div>
	)
}
export default Registration
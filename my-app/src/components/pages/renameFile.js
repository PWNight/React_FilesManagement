import React, { useEffect,useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Rename = () => {
	const navigate = useNavigate()
    const location = useLocation()
	const user = JSON.parse(localStorage.getItem('user'));
	const [name,setName] = useState('')
    const [nameError,setNameError] = useState('')
	const {file} = location.state || {}
	useEffect(() =>{
		if(!user){
			navigate('/login')
		}else if(location.state === null){
			navigate('/disk')
		}
	}, [navigate,user,location]);

	//Валидация по нажатию кнопки и запуск ф-ии авторизации
	const onButtonClick = () => {
		const inputName = document.getElementById('name')
		setNameError('')

		if('' === name){
			inputName.classList.add('errorInput')
			setNameError('Please enter new name')
			return
		}
		inputName.classList.remove('errorInput')
		rename()
	}

	//Переименование имени
	const rename = async() => {
		const response = await fetch(`http://localhost/files/${file['file_id']}`, {
			method: 'PATCH',
			headers: {
				'Authorization': 'Bearer ' + user.token
			},
			body: JSON.stringify({name}),
		});
		const data = await response.json();
		if(data.body.success){
			navigate('/disk')
		}else{
			alert(data.body.message)
		}
	}

	if(file){
		return(
			<div className='container'>
				<Link className='link return' to="/disk">Return to disk</Link>
				<h1>Rename file {file['name']}</h1>
				<div className="inputContainer">
					<div className="input">
						<input
							id='name'
							value={name}
							placeholder='Enter new name'
							onChange={(ev) => setName(ev.target.value)}
						/>
						<label className='errorLabel'>{nameError}</label>
					</div>
					<input type='button' onClick={onButtonClick} value='Rename'/>
				</div>
			</div>
		)
	}
}
export default Rename

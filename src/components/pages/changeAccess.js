import React, { useEffect,useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Access = () => {
	const navigate = useNavigate()
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem('user'));
    const {file} = location.state || {}
    const [accesses, setAccesses] = useState(file?.['accesses'] || [])
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState('')
	useEffect(() =>{
		if(!user){
			navigate('/login')
		}else if(location.state === null){
			navigate('/disk')
		}
	}, [navigate,user,location]);

	//Валидация по нажатию кнопки и запуск ф-ии авторизации
	const onButtonClick = () => {
		const inputEmail = document.getElementById('email')
		setEmailError('')

		if('' === email){
			inputEmail.classList.add('errorInput')
			setEmailError('Please enter email')
			return
		}
		inputEmail.classList.remove('errorInput')
		addAccess()
	}

	const addAccess = async() => {
		const response = await fetch(`http://localhost/files/${file['file_id']}/access`, {
			method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
			body: JSON.stringify({email}),
		});
		const data = await response.json();
		if(response.ok){
            setAccesses(data.body)
		}else{
            alert(data.body.message)
		}
	}
    const deleteAccess = async(e) => {
		const container = e.target.parentNode.parentNode
        const email = container.id
		const response = await fetch(`http://localhost/files/${file['file_id']}/access`, {
			method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
			body: JSON.stringify({email}),
		});
		const data = await response.json();
		if(data.body.success === false){
            alert(data.body.message)
		}else{
            setAccesses(data.body)
		}
	}
    return(
        <div className='container'>
            <Link className='link return' to="/disk">Return to disk</Link>
            <h1>Add/remove access for file {file['name']}</h1>
            <div className='users'>
                {accesses.map(user => (
                    <div className='user' id={user['email']} key={user['email']}>
                        <div className='user_info'>
                            <p id={user['email']}>{user['fullname']}</p>
                            <p id={user['email']}>{user['email']}</p>
                        </div>
                        {user.type === 'co-author' && <div className='file_btns'>
                            <button id='diskBTN' onClick={deleteAccess}>Удалить доступ</button>
                        </div>}
                    </div>
                ))}
            </div>
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
                <input type='button' onClick={onButtonClick} value='Add user'/>
            </div>
        </div>
    )
}
export default Access

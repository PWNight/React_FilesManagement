import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Shared = () => {
	const [disk, setDisk] = useState([]);
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'));
	useEffect(() =>{
		if(!user){
			navigate('/login')
		}else{
			async function fetchDisk(){
				const response = await fetch('http://localhost/shared', {
					method: "GET",
					headers: {
						'Authorization': 'Bearer ' + user.token
					}
				});
				const data = await response.json();
				setDisk(data);
			}
			fetchDisk();
		}
	}, [navigate,user]);
	const downloadFile = async(e)=>{
		const container = e.target.parentNode.parentNode
		const name = document.querySelector(`p[id='${container.id}']`).textContent
		await fetch(`http://localhost/files/${container.id}`, {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + user.token
			}
		})
		.then(responce => responce.blob())
		.then(blob => {
			const url = window.URL.createObjectURL(new Blob([blob]))
			const link = document.createElement('a')
			link.href = url
			link.download = name
			link.click();
		})
	}
	if(disk.body){
		return(
			<div className='container'>
				<h1>Файлы с которыми вам поделились</h1>
				<div className='files'>
                    {disk.body.length === 0 && <p style={{textAlign: "center"}}>Пока что здесь пусто, как только вам дадут доступ к файлу, он сразу же появится здесь</p>}
					{disk.body.map(element => (
						<div className='file' id={element['file_id']} key={element['file_id']}>
							<p id={element['file_id']}>{element['name']}</p>
							<div className='file_btns'>
								<button id='diskBTN' onClick={downloadFile}>Скачать</button>
							</div>
						</div>
					))}
				</div> 
			</div>
		)	
	}
}
export default Shared

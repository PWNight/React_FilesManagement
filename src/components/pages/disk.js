import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Disk = () => {
	const [disk, setDisk] = useState([]);
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'));
	useEffect(() =>{
		if(!user){
			navigate('/login')
		}else{
			async function fetchDisk(){
				const response = await fetch('http://localhost/files/disk', {
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
	const deleteFile = async(e)=>{
		const container = e.target.parentNode.parentNode
		const response = await fetch(`http://localhost/files/${container.id}`, {
			method: "DELETE",
			headers: {
				'Authorization': 'Bearer ' + user.token
			}
		});
		const data = await response.json();
		if(data.body.success){
			window.alert(data.body.message)
		}else{
			window.alert(data.body.message)
		}
	}
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
			//link.remove()
		})
	}
	if(disk.body){
		return(
			<div className='container'>
				<Link className='link return' to="/uploadFile">Upload new file</Link>
				<h1>Файлы</h1>
				<div className='files'>
					{disk.body.length === 0 && <p style={{textAlign: "center"}}>Пока что здесь пусто, исправьте это и <Link className='link with-border' to="/uploadFile">загрузите</Link> свой первый файл</p>}
					{disk.body.map(element => (
						<div className='file' id={element['file_id']} key={element['file_id']}>
							<p id={element['file_id']}>{element['name']}</p>
							<div className='file_btns'>
								<Link id='diskBTN' to="/renameFile" state={{file: element}}>Изменить название</Link>
								<Link id='diskBTN' to="/changeAccess" state={{file: element}}>Изменить права доступа</Link>
								<button id='diskBTN' onClick={deleteFile}>Удалить файл</button>
								<button id='diskBTN' onClick={downloadFile}>Скачать</button>
							</div>
						</div>
					))}
				</div> 
			</div>
		)	
	}
}
export default Disk

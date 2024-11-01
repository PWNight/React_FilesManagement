import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Upload = () => {
	const navigate = useNavigate()
	const [files, setFiles] = useState([])
	const [status, setStatus] = useState('')
	const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        navigate('/login')
        return
    }

	const handleFileChange = (e) => {
		if(e.target.files){
			setStatus("initiated");
			setFiles(e.target.files);
		}
	}

	const handleUpload = async () => {
		if (files) {
			[...files].forEach((file) => {
				const formData = new FormData();
				formData.append("files", file);
				setStatus("uploading");

				fetch(`http://localhost/files`, {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + user.token
					},
					body: formData
				})
					.then((r) => r.json())
					.then((r) => {
						if(r.body.success){
							setStatus('success')
						}else{
							for(var fileName in r.body.message){
								alert(r.body.message[fileName])
							};
							setStatus('fail')
						}
					})
			});
		}
	};
	const Result = ({ status }) => {
		if (status === 'initiated'){
		return <p>⏳ Initiated successfully!</p>;
		} else if (status === "success") {
		return <p>✅ Uploaded successfully!</p>;
		} else if (status === "fail") {
		return <p>❌ Upload failed!</p>;
		} else if (status === "uploading") {
		return <p>⏳ Uploading started...</p>;
		} else {
		return null;
		}
	};
	return (
	<>
		<div className="container">
			<Link className='link return' to="/disk">Return to disk</Link>
			<label htmlFor="file" className="sr-only">
				Choose files
			</label>
			<input id="file" type="file" multiple onChange={handleFileChange} />
			{files.length > 0 && 
				<div className = 'uploadFiles'>
					{[...files].map((file, index) => (
						<section className = 'uploadFile' key={file.name}>
						<h3>File number {index + 1} details:</h3>
						<ul>
							<li>Name: {file.name}</li>
							<li>Type: {file.type}</li>
							<li>Size: {file.size} bytes</li>
						</ul>
						<Result status={status} />
						</section>
					))}
				</div>
			}

			{files.length > 0 && (
			<button onClick={handleUpload} className="submit">
				Upload {files.length > 1 ? "files" : "a file"}
			</button>
			)}
		</div>
	</>
	);
}
export default Upload

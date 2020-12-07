import React, {Fragment, useState} from 'react'
import axios from 'axios'
const FileUpload = () => {

    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})

    const onChange= e =>{
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }
    const onProductSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file)
        try {
            const res = await axios.post('/uploads/productUpload', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            const {fileName, filePath} = res.data
            setUploadedFile({fileName, filePath})
        } catch (err) {
            if(err){
                if(err.response.status === 500){
                    console.log('these was a problem with the server')
                }else{
                    console.log(err.response.data.msg)
                }
            }
        }
    }
    const onOrderSubmit = async x =>{
        x.preventDefault();
        const formData = new FormData()
        formData.append('file', file)
        console.log(file)
        try {
            const res = await axios.post('/uploads/orderUpload', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            const {fileName, filePath} = res.data
            setUploadedFile({fileName, filePath})
        } catch (err) {
            if(err){
                if(err.response.status === 500){
                    console.log('these was a problem with the server')
                }else{
                    console.log(err.response.data.msg)
                }
            }
        }
    }
    return (
        <Fragment>
            <div>
            <form onSubmit={onProductSubmit}>
                <div>
                    <h3>Upload Products</h3>
                    <input type="file" id="productFile"
                    onChange={onChange}></input>
                    <label className='custom-file-label'>{filename}</label>
                </div>
                <input type='submit'
                value='Upload'
                className='btn btn-primary'>
                </input>
            </form>
            </div>
           <div>
           <form onSubmit={onOrderSubmit}>
                <div>
                <h3>Upload Orders</h3>
                    <input type="file" id="orderFile"
                    onChange={onChange}></input>
                    <label className='custom-file-label'>{filename}</label>
                </div>
                <input type='submit'
                value='Upload'
                className='btn btn-primary'>
                </input>
            </form>
           </div>
        
           
        </Fragment>
        
    )
}

export default FileUpload
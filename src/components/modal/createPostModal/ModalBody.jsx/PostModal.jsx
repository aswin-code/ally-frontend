
import './PostModal.scss'
import Modal from 'react-modal'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import { useContext, useState } from 'react';
import { ModalContext } from '../../../../context/CreatePostContext';
import Header from '../ModalHeader.jsx/Header';

import useMutation from '../../../../hooks/useMutation';
import { toast } from 'react-toastify'
import { SpinnerContext } from '../../../../context/spinnerContext';
import ClipLoader from "react-spinners/ClipLoader";
import { ActionContext } from '../../../../context/ActionContext';

Modal.setAppElement('#root')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: 'auto',
        borderRadius: '10px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0'
    },
};


const PostModal = () => {
    const axiosMutation = useMutation()
    const { isOpen, setIsOpen } = useContext(ModalContext)
    const { Loading, setLoading } = useContext(SpinnerContext)
    const { setAction } = useContext(ActionContext)
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [preview, setPreview] = useState(null)

    const handleChange = async (e) => {
        const validFileType = ['image/jpg', 'image/jpeg', 'image/png']
        const file = e.target.files[0];
        if (!validFileType.find(type => type === file.type)) {
            return toast.error('Invalid file format')
        }
        const reader = new FileReader()
        reader.addEventListener('load', () => setPreview(reader.result))
        reader.readAsDataURL(file)
        console.log(preview)
        setImage(file)

    }

    const handleUpload = async () => {
        try {
            const form = new FormData()
            toast.info('please wait post uploading')
            setIsOpen(false)
            form.append('image', image)
            form.append('caption', caption)
            await axiosMutation.post(`/post`, form).then((res) => {
                toast.dismiss()
                toast.success("post added successfully")
                setAction(prev => prev + 1)
            })


        } catch (error) {
            console.log(error.message)

        }
    }

    return (
        <div className="modal">
            <Modal onRequestClose={() => setIsOpen(false)} isOpen={isOpen} style={customStyles} id='main'>
                <div className="modal">
                    <div className="head">
                        <Header imageSelected={image} />
                        <hr />
                    </div>
                    <div className="body" style={{ minHeight: '400px', width: 'auto' }}>

                        {preview ? <div className="preview">
                            <img src={preview} alt='preview' style={{ maxHeight: '400px' }} />
                            <div className="text-wrapper">
                                <input type='text' placeholder='caption' name='caption' value={caption} onChange={(e) => setCaption(e.target.value)} />
                                <button type='submit' onClick={handleUpload}>Post</button>
                            </div>


                        </div> : <><div className="icons">
                            <div className="container">
                                <InsertPhotoOutlinedIcon className='photo' />
                                <OndemandVideoRoundedIcon className='video' />
                            </div>

                        </div>
                            <div className="content">
                                <span>Drag photos and videos here</span>
                            </div>
                            <label htmlFor="image">
                                Select from computer
                                <input type="file" name="image" id="image" onChange={handleChange} />
                            </label></>
                        }

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default PostModal
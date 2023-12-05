import { useState, useRef} from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";


const EditBlogForm = ({ current }) => {
    const navigate = useNavigate();
    //we have to create state for each of the property
    const user = useAuthContext()
    const [title, setTitle] = useState(current.title)
    const [body, setBody] = useState(current.body)    
    const [error, setError] = useState(null)    
        //for file upload
    const [file, setFile] = useState(null);

      const handleFileChange = (e) => {
          const selectedFile = e.target.files[0];
          console.log("hello")
          console.log(selectedFile)
    setFile(selectedFile);
  };

const editorRef = useRef(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')  
            return 
        }
        
        
       const formData = new FormData()
        formData.append('title', title)
        formData.append('body', editorRef.current.getContent())
        formData.append('file', file);
        //console.log(user)
        const response = await fetch('/api/blogs/' + current._id , {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        } 
        if (response.ok) {
            setTitle('')
            setBody('')
            setError(null)
            navigate("/")
        }
    }

    return (
        <>
                    <div id="intro" class="p-5 text-center bg-light">
                    <p class="mb-3">Update blog</p>
                        </div>
        <form onSubmit={handleSubmit} className="create">
            <label>Title</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
            />
            <Editor
                    apiKey='nb87cvkruxycxaq7n05qnv3k9j2hjp4im87172hxvz0881yd'
                    initialValue={body}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                        height: 300,
                        width:800,
                        menubar: false,
                        max_chars: 100
                }}
                />
                 <div className="form-group">
                    <label  htmlFor="fileInput" className="form-label">Upload File</label>
                    <input onChange={handleFileChange} className="form-control" id="fileInput" type="file" name="fileinput" />
                </div>
            <button>Post</button>
            </form>
            </>
    )
}

export default EditBlogForm

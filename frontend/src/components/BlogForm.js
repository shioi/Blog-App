import { useState, useRef} from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useAuthContext } from '../hooks/useAuthContext'


const BlogForm = () => {
    //we have to create state for each of the property
    const user = useAuthContext()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')    
    const [error, setError] = useState(null)    

const editorRef = useRef(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')  
            return 
        }
        
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            
            }
        const blog = { title, body: editorRef.current.getContent() }
        //console.log(user)
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
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
            console.log("new blog added")
        }
    }

    return (
        <>
                    <div id="intro" class="p-5 text-center bg-light">
                    <p class="mb-3">Share your wonderful words with the world</p>
                        </div>
        <form onSubmit={handleSubmit} className="create">
            <label>Title</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
            />
            <Editor
                    apiKey='nb87cvkruxycxaq7n05qnv3k9j2hjp4im87172hxvz0881yd'
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                        height: 300,
                        width:800,
                        menubar: false,
                        max_chars: 100
                }}
            />
            <button>Post</button>
            </form>
            </>
    )
}

export default BlogForm

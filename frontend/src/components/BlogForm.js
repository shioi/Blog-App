import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAuthContext } from '../hooks/useAuthContext';

const BlogForm = () => {
    const user = useAuthContext();

    // State variables
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const editorRef = useRef(null);
    //for file upload
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {    
        e.preventDefault();

        // Check if the user is logged in
        if (!user) {
            setError('You must be logged in');
            return;
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('body', editorRef.current.getContent())
        formData.append('file', file);
        try {
            // POST request to create a new blog
            const response = await fetch('https://fp-blog.onrender.com/api/blogs', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${user.user.token}`
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                // Clear form inputs and reset error state on successful submission
                setTitle('');
                setError(null);
                console.log("New blog added");
                window.location.reload()
            }
        } catch (error) {
            // Handle fetch or other runtime errors
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div id="intro" className="blog-form-wrapper p-3">
            <div className="blog-form-container">
                <form onSubmit={handleSubmit} className="create">
                    <div className="form-group">
                        <input
                            type="text"
                            id="title"
                            placeholder="title"
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Editor
                            apiKey='nb87cvkruxycxaq7n05qnv3k9j2hjp4im87172hxvz0881yd'
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            init={{
                                   resize: 'both',
                        height: 300,
                        max_width: 800,
                        min_width:150,
                        menubar: false,
                        max_chars: 100
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <input onChange={handleFileChange} className="form-control" id="fileInput" type="file" name="fileinput" />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="btn-submit" style={{ color: 'black', display: 'block', margin: '0 auto' }}>Post</button>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;

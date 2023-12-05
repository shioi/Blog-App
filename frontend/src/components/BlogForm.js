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
          console.log("hello")
          console.log(selectedFile)
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
            const response = await fetch('/api/blogs', {
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
            }
        } catch (error) {
            // Handle fetch or other runtime errors
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div id="intro" className="blog-form-container p-3">
            <h2 className="form-title">Write Blog</h2>
            <form onSubmit={handleSubmit} className="create">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <Editor
                        apiKey='nb87cvkruxycxaq7n05qnv3k9j2hjp4im87172hxvz0881yd'
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                            height: 300,
                            width: 800,
                            menubar: false,
                            max_chars: 100
                        }}
                    />
                </div>
                <div className="form-group">
                    <label  htmlFor="fileInput" className="form-label">Upload File</label>
                    <input onChange={handleFileChange} className="form-control" id="fileInput" type="file" name="fileinput" />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="btn-submit">Post</button>
            </form>
        </div>
    );
};

export default BlogForm;

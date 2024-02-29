import React, { useState } from 'react';
import axios from 'axios';
import WebcamCapture from '@/components/WebcamComponent';


interface PostState {
  title: string;
  content: string;
  image: File | null;
}

const App: React.FC = () => {
  const [state, setState] = useState<PostState>({
    title: '',
    content: '',
    image: null,
  });

  const [image, setImage] = useState<File>();

  const handleCapturedImage = (data: string) => {
    console.log('Received data from child:', data);
    setImage(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setState({
        ...state,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    const form_data = new FormData();
    if (state.image) {
      form_data.append('image', state.image, state.image.name);
    }
    form_data.append('title', state.title);
    form_data.append('content', state.content);
    console.log(form_data);
    const url = 'http://192.168.16.101:8000/register/';
    try {
      const res = await axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={state.title}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Content"
            id="content"
            value={state.content}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
        </p>

        <WebcamCapture onCapturedImage={handleCapturedImage} />

        <div className='m-1 z-0'>
          <img src={image}></img>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default App;

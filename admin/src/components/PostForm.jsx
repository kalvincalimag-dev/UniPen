import React, { useEffect, useState } from 'react';
import { ImSpinner11, ImEye, ImFilePicture, ImFilesEmpty, ImSpinner3 } from 'react-icons/im';
import { uploadImage } from '../api/post';
import { useNotification } from '../context/NotificationProvider';
import MarkdownHint from './MarkdownHint';
import DeviceView from './DeviceView';


export const defaultPost = {
  title: '',
  thumbnail: '',
  featured: false, 
  content: '',
  tags: '',
  meta: ''
}

export default function PostForm({initialPost, busy, postBtnTitle, resetAfterSubmit, onSubmit}) {

  const [postInfo, setPostInfo] = useState({...defaultPost});
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState('');
  const [imageUrlToCopy, setImageUrlToCopy] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [displayMarkdownHint, setDisplayMarkdownHint] = useState(false);
  const [showDeviceView, setShowDeviceView] = useState(false);

  const {updateNotification} = useNotification();

  useEffect(() => {
    if(initialPost){
        setPostInfo({...initialPost})
        setSelectedThumbnailURL(initialPost?.thumbnail);
    }
    return () => {
        if(resetAfterSubmit) resetForm();
    };
  }, [initialPost, resetAfterSubmit])

  const handleChange = ({target}) => {
    const {value, name, checked} = target;

    if (name === 'thumbnail') {
      const file = target.files[0];
      if (!file.type?.includes('image')) { 
        return updateNotification("error", 'This is not an image!');
      }
      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbnailURL(URL.createObjectURL(file));
    }
    if (name === 'featured') {   
      localStorage.setItem('articlePost', JSON.stringify({...postInfo, featured: checked})) 
      return setPostInfo({ ...postInfo, [name]: checked });
    }
    if (name === 'tags') {    
      const newTags = tags.split(", ");
      if(newTags.length > 4) 
      updateNotification("warning","Only First Four Tags Will be Selected")
    }
    if (name === 'meta' && meta.length >= 149) {    
      setPostInfo({ ...postInfo, meta: value.substring(0, 149)});
    } 
    const newPost = { ...postInfo, [name]: value }

    setPostInfo({...newPost});

    localStorage.setItem('articlePost', JSON.stringify(newPost));
  };


  const handleImageUpload = async({target}) => {

    if(imageUploading) return;

    const file = target.files[0];
    if (!file.type?.includes('image')) { 
      return updateNotification("error", 'This is not an image!');
    } 
    
    setImageUploading(true)
    const formData = new FormData();
    formData.append('image', file);
    
    const {error, image} = await uploadImage(formData);
    setImageUploading(false)
    if(error) return updateNotification('error', error);
    setImageUrlToCopy(image);
  };

  const handleOnCopy = () => {
    const textToCopy = `![Add image description](${imageUrlToCopy})`
    navigator.clipboard.writeText(textToCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const{title, content, tags, meta} = postInfo;
    if(!title.trim()) return updateNotification('error', 'Title is missing');
    if(!content.trim()) return updateNotification('error', 'Content is missing');
    if(!tags.trim()) return updateNotification('error', 'Tags is missing');
    if(!meta.trim()) return updateNotification('error', 'Meta Description is missing');

    const slug = title.toLowerCase().replace(/[^a-z zA-Z ]/g, ' ').split(" ").filter(item => item.trim()).join("-");

    const newTags = tags.split(",").map((item) => item.trim()).splice(0, 4);

    const formData = new FormData();
    const finalPost = {...postInfo, tags: JSON.stringify(newTags), slug };
    for(let key in finalPost){
        formData.append(key, finalPost[key])
    }

    onSubmit(formData)

  }

  const resetForm = () => {
    setPostInfo({...defaultPost})
    localStorage.removeItem('articlePost')
  }

  const{title, content, featured, tags, meta} = postInfo;

  return (
    <>
        <form  onSubmit={handleSubmit} className='p-2 flex '> 
        <div className='w-9/12 h-screen space-y-3 flex flex-col '>

            {/* Title & Submit */}
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-md" style={{ marginLeft: '-5px' }}>
              <h1 className="text-xl font-semibold text-gray-800">Post New Article</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={resetForm}
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-green-900 text-green-900 hover:bg-green hover:text-[#EEEEEE] transition duration-300 hover:shadow-xl"
                >
                  <ImSpinner11 />
                  <span>Reset</span>
                </button>
                <button
                  onClick={() => setShowDeviceView(true)}
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-green-900 text-green-900 hover:bg-green hover:text-[#EEEEEE] transition duration-300 hover:shadow-xl"
                >
                  <ImEye />
                  <span>View</span>
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-green transition duration-300 ring-1 hover:ring-green-900 ring-green-900 text-[#EEEEEE] hover:bg-transparent hover:text-gray-600 hover:shadow-xl"
                >
                  {busy ? <ImSpinner3 className="animate-spin mx-auto text-xl" /> : "Post Article"}
                </button>
              </div>
            </div>


            {/* Featured Check Box */}
            <div className='flex'>
            <input name='featured' value={featured} onChange={handleChange} id='featured' type='checkbox' hidden />
            <label className=' select-none flex items-center space-x-2 text-black cursor-pointer group' htmlFor='featured'>
                <div className='w-4 h-4 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:bg-green group-hover:border-green'>
                {featured &&  ( <div className='w-2 h-2 rounded-full bg-gray-700 group-hover:bg-green' /> )}
                </div>
                <span className='group-hover:text-green-900 trasnition'>Featured?</span>
            </label>
            </div>

            {/* Title Input*/}
            <input value={title} onFocus={() => setDisplayMarkdownHint(false)} name='title' onChange={handleChange} type='text' className='text-sm outline-none focus:ring-[green] rounded-lg p-3 w-full shadow-md hover:shadow-xl' style={{marginLeft: '-2px', marginTop: 'px'}} placeholder='Post Title'/>

            {/* Image Input*/}
            <div className='flex items-center space-x-2'>
            <div>
                <input onChange={handleImageUpload} id='image-input' type='file' hidden />
                <label htmlFor='image-input' type='file' className='flex items-center justify-center border w-38 space-x-2 px-3 border-green-900 ring-green-900 bg-transparent rounded-lg h-10 text-green-900 hover:bg-green hover:text-[#EEEEEE] shadow-md hover:shadow-xl transition cursor-pointer'>
                    {!imageUploading ? ( <ImFilePicture /> ) : ( <ImSpinner3 className='animate-spin'/>)} <span>Place Image</span>
                </label>
            </div>

            {imageUrlToCopy && ( <div className='flex-1 flex justify-between bg-gray-400 rounded overflow-hidden'>
                <input value={imageUrlToCopy} type="text" className='bg-transparent px-2 text-white w-full' disabled />
                <button onClick={handleOnCopy} type='button' className='text-xs flex flex-col items-center justify-center p-1 bg-gray-700 text-[#EEEEEE] self-stretch'> <ImFilesEmpty/> <span> Copy </span> </button>
            </div>)}
            </div>  

            <textarea onChange={handleChange} value={content} onFocus={() => setDisplayMarkdownHint(true)} name='content' className='text-sm resize-none outline-none focus:ring-[green] rounded-lg p-3 w-full flex-1 tracking-wide shadow-md hover:shadow-xl' placeholder='Enter your article content here and format it using the provided text formatting guide.' ></textarea>

            {/* Tags Input*/}
            <div>
            <label className='text-black text-md ml-1' htmlFor="tags"> Tags </label>
            <input onChange={handleChange} value={tags} name='tags' id='tags' type='text' className='text-sm mt-1 outline-none focus:ring-[green] rounded-lg p-3 w-full  shadow-md hover:shadow-xl' style={{marginLeft: '-2px'}} placeholder='Post Tags'/>
            </div>

            {/* Meta Description Input*/}
            <div>
            <label className='text-black text-md ml-1' htmlFor="meta"> Character Limit {meta?.length} / 150 </label>
            <textarea onChange={handleChange} value={meta} name='meta' id='meta' className='text-sm mt-1 resize-none outline-none focus:ring-1 rounded-lg p-2 w-full flex-1 font-montserrat tracking-wide shadow-md hover:shadow-xl' placeholder='Write a concise meta description...'></textarea>
            </div>

        </div>

        <div className="w-1/4 px-2 relative">
          <div className="relative w-60 h-52">
            <input
              onChange={handleChange}
              name="thumbnail"
              id="thumbnail"
              type="file"
              className="hidden"
            />
            <label
              className="cursor-pointer block w-full h-full"
              htmlFor="thumbnail"
            >
              {selectedThumbnailURL ? (
                <img
                  src={selectedThumbnailURL}
                  className="w-full h-full object-cover shadow-lg rounded-lg"
                  alt="Thumbnail"
                />
              ) : (
                <div className="py-8 border border-dashed border-gray-500 text-gray-700 flex flex-col justify-center items-center rounded-lg shadow-sm hover:shadow-xl">
                  <span className="text-xl font-semibold">Attach Thumbnail</span>
                  <span className="text-sm">Recommended Size</span>
                  <span className="text-sm">1280 x 720</span>
                  <span className="text-sm"> <br/> </span>
                </div>
              )}
            </label>
          </div>

          {/* Markdown Rules */}
          <div className="absolute top-1/2 -translate-y-1/2 w-60">
            {displayMarkdownHint && <MarkdownHint />}
          </div>
        </div>

        </form>
        <DeviceView title={title} content={content} thumbnail={selectedThumbnailURL} visible={showDeviceView} onClose={() => setShowDeviceView(false)}/>
    </>

  );
}


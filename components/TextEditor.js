import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import axios from '../axios'
import { EditorState } from "draft-js";
import { useRouter } from "next/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { TOKEN } from "../constants/AccessToken";
import { useState, useEffect } from "react";

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    { ssr: false }
  );

function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const router = useRouter();
    const {id} = router.query;

    useEffect(async() => {
        if(!id) {
            return;
          }
        try{
            const access_token = localStorage.getItem(TOKEN)
            const response = await axios.get(`/document/${id}`, {headers:{
                'auth-token': access_token
              }})
              setEditorState( EditorState.createWithContent(convertFromRaw(JSON.parse(response?.data.content_draft))))
        }catch(err){
            console.log(err)
        }

    }, [id])

    const onEditorStateChange =  async (editorState) => {
        setEditorState(editorState)

            try{
                const access_token = localStorage.getItem(TOKEN)
                const rawText = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
                
                const response =await axios.patch(`/document/${id}`, {content: JSON.parse(rawText).blocks[0].text, content_draft: rawText}, {headers:{
                    'auth-token': access_token
                  }})
            }catch(err){
                console.log(err)
            }
        
    }
    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-16">
      <Editor
      editorState={editorState}
      onEditorStateChange = {onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 px-20 py-24 bg-white shadow-lg max-w-5xl mx-auto mb-12 border min-h-screen"
      />
    </div>
    )
}

export default TextEditor

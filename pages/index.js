import React, {useEffect, useState} from 'react'
import { useRouter } from "next/router"; 
import axios from '../axios'

import Head from 'next/head'
import Header from '../components/Header'
import Login from './login'
import {TOKEN} from '../constants/AccessToken'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import DocumentRow from '../components/DocumentRow';


export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [documents, setDocuments] = useState([])


  useEffect(async() => {
    const access_token = window.localStorage.getItem(TOKEN)
    
    if(access_token !== null && access_token  !== undefined){
      setIsLoggedIn(true)
      const access_token = window.localStorage.getItem(TOKEN)
    const response = await axios.get('/document', {headers:{
      'auth-token': access_token
    }})
    console.log(response)
    setDocuments(response.data)
    }
    
   
  }, [isLoggedIn])


  
  
  if(!isLoggedIn) return <Login setIsLoggedIn={setIsLoggedIn}/>

  const createDocument = async(e) => {
    e.preventDefault()

    try{
      const access_token = window.localStorage.getItem(TOKEN)
      const response = await axios.post('/document',{title: input},{headers:{
        'auth-token': access_token
      }})
      router.push(`/doc/${response.data._id}`)
    }catch(err){
      console.log(err)
    }
  }

  const modal = (
    <Modal active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline-none"
          placeholder="Enter title of the story"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" ripple="light" onClick = {createDocument}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  const handleDelete = async (id) => {
    
    console.log(id, 'id')
    try{
      const access_token = window.localStorage.getItem(TOKEN)
      const response = await axios.delete(`/document/${id}`, {headers:{
        'auth-token': access_token
      }})
      setDocuments(documents.filter(document => {
        return document.id != id
      }))
      location.reload()
    }catch(err){
      console.log(err)
    }
  }
  
  
  return (
    <div>
      <Head>
        <title>Text Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      <Header/>
      {modal}
      <section className=" py-10 px-10 w-screen">
        <div className="max-w-3xl mx-auto flex flex-col items-center py-4">
         
          <div>
            
            <Button
               color="blue"
               buttonType="filled"
               size="regular"
               rounded={false}
               block={false}
               iconOnly={false}
               ripple="light"
               onClick={() => setShowModal(true)}
            >
              Write a New Story
            </Button>
          </div>
        </div>
      </section>
       <section className="bg-white px:10 md:px-0">
        <div className="max-w-3xl mx-auto pt-8 text-gray-700">
          <div className="flex items-center justify-between pb-5 pr-5">
            <h2 className="font-medium flex-grow px-5">My Documents</h2>
            <p className="mr-4"> Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
      <div className="max-w-3xl mx-auto text-gray-700">
      {documents.map((docs) => (
        <DocumentRow
        key={docs._id}
        id={docs._id}
        date={docs.date}
        title={docs.title}
        onDelete={handleDelete}/>
      ))}
      </div>
      </section>
      

    
    </div>
  )
}

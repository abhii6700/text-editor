import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import React , {useState, useEffect} from 'react'
import TextEditor from "../../components/TextEditor";
import Head from "next/head";
import { TOKEN } from "../../constants/AccessToken";
import axios from "../../axios";

function Doc() {
    const router = useRouter()
    const {id} = router.query

    const [document, setDocument] = useState([])

    useEffect(async() => {
        if(!id) {
            return;
          }
        try{
            const access_token = localStorage.getItem(TOKEN)
            const response = await axios.get(`/document/${id}`, {headers:{
                'auth-token': access_token
              }})
              setDocument(response.data)
        }catch(err){
            console.log(err)
        }
    }, [id])
    return (
        <div>
      <Head>
        <title>{document.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between items-center mr-6 p-3 pb-1">
        <Link href="/">
          <a>
            <Icon name="description" size="5xl" color="blue" />
          </a>
        </Link>

        <div className="flex-grow px-2">
          <h2 className='text-lg font-medium'>{document.title}</h2>
          <div className="flex items-center gap-3 text-sm space-x-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className=" md:inline-flex h-10"
          rounded={true}
          block={false}
          iconOnly={true}
          ripple="light"
        >
          <Icon name="people" size="md" />
        </Button>
      </header>

      <TextEditor />
    </div>
    )
}

export default Doc
